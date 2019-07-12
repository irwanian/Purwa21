import React from 'react'
import Numeral from 'numeral'
import Errorpage from './errorpage'
import Axios from 'axios';
import {apiURL} from './../support/apiURL'
import {connect} from 'react-redux'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import {addCart} from './../redux/action/'


class Reservation extends React.Component{
    state = {
        openModal : false,
        booked : [],
        chosenSeat : [],
        lanjutBelanja : false,
        menujuCart : false,
        data : []
    }

    componentDidMount (){
        Axios.get(apiURL + '/movies/' + this.props.location.state.id)
        .then((res)=>{
            this.setState({booked : res.data.booked, data : res.data})
        })
        .catch((err)=>{

        })
    }

    onBuyTicket = () => {
        var cart = this.props.cart
        if(this.state.chosenSeat.length !== 0){
            var booked = this.props.location.state.booked
            var arr = [...booked, ...this.state.chosenSeat]    
            Axios.patch(apiURL + '/movies/' + this.props.location.state.id, {
                booked : arr
            }) 
            .then((res)=>{
               var obj = {
                    title : this.props.location.state.title,
                    qty : this.state.chosenSeat.length,
                    total : this.state.chosenSeat.length * 35000
                }
                cart.push(obj)
                Axios.patch(apiURL + '/users/' + this.props.id, {
                    cart : cart
                })
                .then((res)=>{
                    this.setState({booked : [...this.state.booked, ...this.state.chosenSeat], chosenSeat : [], openModal : true})
                })
            })
            .catch((err)=> {

            })
        }
    }

    onLanjutBelanja = () => {
        this.setState({lanjutBelanja : true})
    }

    onLihatCart = () => {
        this.setState({menujuCart : true})
    }

    onChooseSeat = (arr) => {
        var chosen = this.state.chosenSeat
        chosen.push(arr)
        this.setState({chosenSeat : chosen})
        this.props.addCart()
    }

    cancelSeat = (arr) => {
        var chosen = this.state.chosenSeat
        var hasil = chosen.filter((val)=>{
            return val.join('') !== arr.join('')
        })
        this.setState({chosenSeat: hasil})
    }

    renderSeat = () => {
        var seat = this.props.location.state.seat
        var arr = []
        for(var i = 0 ; i< seat/20 ; i++){
            arr.push([])
            for(var j = 0 ; j < seat/(seat/20); j++){
                arr[i].push(1) 
            }
        }
       

        for(var x = 0 ; x < this.state.booked.length; x++){
            arr[this.state.booked[x][0]][this.state.booked[x][1]] = 2
        }
        for(var y = 0 ; y< this.state.chosenSeat.length; y++){
            arr[this.state.chosenSeat[y][0]][this.state.chosenSeat[y][1]] = 3
        }
        
        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        var jsx = arr.map((val,index) => {
            
            return(
                <tr style={{textAlign: 'auto'}}>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return(
                                    <input type='button' 
                                    style={{width : '46px', height : '46px' }} disabled 
                                    value={alpha[index]  + ( i+1)} 
                                    className='mr-2 mt-2 btn btn-danger'  />
                                ) 
                            }if(val1 === 3){
                                return(
                                    <input type='button' 
                                    style={{width : '46px', height : '46px' }}
                                    value={alpha[index]  + ( i+1)} className='mr-2 mt-2 btn bg-success'
                                    onClick={() => this.cancelSeat([index, i])}  />              
                                )
                            }
                            return(
                                <input type='button' style={{width : '46px', height : '46px'}} 
                                onClick={() => this.onChooseSeat([index, i])} 
                                value={alpha[index]  + ( i+1)} 
                                className='btn btn-outline-success mr-2 mt-2'  />
                            )
                        }
                        )
                    }
                </tr>
            )
        })
        return jsx

    }
    render() {
        if(this.props.location.state === undefined){
           return(
                <Errorpage />
           )
        }
        if(this.state.menujuCart === true){
            return(
                <Redirect  to='/cart' />
            )
        }

        if(this.state.lanjutBelanja === true){
            return(
                <Redirect to='/' />
            )
        }

        return(
            <div className='container mt-5 mb-5'>
                <h1 style={{marginBottom : '50px', fontWeight : '700'}}>{this.props.location.state.title}</h1>
                <h5>{this.state.chosenSeat.length === 0 ? null : 'Rp. ' + Numeral(this.state.chosenSeat.length * 35000).format(0,0) } </h5>
                <table className='bg-dark'>
                    <thead>
                  {this.renderSeat()}
                    </thead>
                    <tbody  style={{color : 'white', marginTop: '20px'}}>
                        <td className='justify-content-center d-flex' style={{marginTop: '120px',
                         paddingBottom : '50px', border: '1px solid white', fontSize : '24px'}}>
                            Layar
                        </td>
                    </tbody>
                </table>
                    <div className='mt-2'>
                <input type='button' onClick={this.onBuyTicket} className='btn btn-success' value='Add to Cart' />
                <Modal isOpen ={this.state.openModal} >
                    <ModalHeader>

                    </ModalHeader>
                    <ModalBody>
                        <p style={{textAlign : 'center',fontWeight: '600', fontSize: '20px' ,marginBottom : '30px'}}> lanjut Belanja?  </p>
                        <input type='button' style={{float: 'right'}} onClick={this.onLanjutBelanja} className='btn btn-primary ml-2' value='Lanjut Belanja' /> 
                        <input type='button' style={{float: 'right'}} onClick={this.onLihatCart} className='btn btn-success' value='Check Cart' />
                    </ModalBody>
                </Modal>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return{
        id : state.user.id,
        cart : state.user.cart,
        addCart : state.add.count
    }
}

export default connect(mapStateToProps,{addCart})(Reservation)