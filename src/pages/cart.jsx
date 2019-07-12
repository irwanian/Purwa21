import React from 'react'
import {Table} from 'reactstrap'
import Axios from 'axios';
import { apiURL } from '../support/apiURL';
import {connect} from 'react-redux'
import {Modal, ModalBody} from 'reactstrap'
import numeral from 'numeral'
import {Redirect} from 'react-router-dom'


class Cart extends React.Component{
    
    state = {
        cart : [],
        modalConfirm : false,
        toHome : false,
    }
    
    componentDidMount(){
        Axios.get(apiURL + '/users/' + this.props.id)
        .then((res)=>{;
            
            this.setState({cart : res.data.cart})       
        })
        .catch((err)=>{

        })
    }

    renderCart = () => {
        var jsx= this.state.cart.map((val, i)=>{
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{val.title}</td>
                    <td>{val.qty}</td>
                    <td>{'Rp. ' + numeral(val.total).format(0,0)}</td>
                </tr>
            )
        })    
       return jsx;        
    }

    onCheckOut = () => {
        var keranjang = this.props.cart
        var transaction = keranjang
        var transaksi = this.props.transaction
        transaksi.push(transaction)
        
        Axios.patch(apiURL + '/users/' + this.props.id, {cart : keranjang})
        .then((res)=>{

            this.setState({modalConfirm : true})
            this.setState({cart : []})
            // Axios.patch(apiURL + '/users/' + this.props.id, {transaction : transaksi.pop(), cart : []})
            // .then((res)=>{
                
            // })
            // .catch((err)=>{
                
            // })
        })
        .catch((err)=>{

        })
    }
    closeModal = () =>{
        this.setState({modalConfirm : false})
    }
    LanjutBelanja = () =>{
        this.setState({toHome : true})
    }
    
    totalPrice = () => {
        var total = 0
        this.state.cart.map((val) =>{
            total += val.total
        })
        return total
    }

    totalTiket = () => {
        var tiket= 0
        this.state.cart.map((val)=> {
            tiket += val.qty
        })
        return tiket + ' Tiket'
    }

    render(){
        if(this.state.toHome === true){
            return(
                <Redirect to='/' />
            )
        }

        return(
            <div className='container mt-lg-5'>
                    <h1>My Cart</h1>
                        
                        {this.props.cart.length > 0 ?
                        <Table bordered className='mt-lg-5' style={{backgroundColor: 'fafafa'}}>
                            <thead>
                            <tr>
                                <td>No.</td>
                                <td>Movies</td>
                                <td>Tiket</td>
                                <td>Total Harga</td> 
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderCart()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='2'>Total</td>
                                    <td>{this.totalTiket()}</td>
                                    <td>{'Rp. ' + numeral(this.totalPrice()).format(0,0)}</td>
                                </tr>
                            </tfoot>
                        </Table>  

                    : <div className='justify-content-center'>
                        <h4 className='mb-3' style={{color : 'grey'}}>Ooopppss. . . Keranjang Belanja Anda Masih Kosong</h4>
                        <img className='d-flex justify-content-center' src='https://2.bp.blogspot.com/-9SmWPFlbgrw/WGU6RP2A3-I/AAAAAAAACNk/jxixUlqiL8cPtZ7YvIMtMnkM18MmLq7mQCLcB/s1600/keep-calm-and-lets-shop-9.png' style={{height: '400px' }} alt="let's shop" />
                    </div> }

                    {this.props.cart.length > 0 ?       
                        <input type='button' onClick={this.onCheckOut} className='btn btn-success' value='Checkout' />
                    : <input type='button' className='btn btn-primary mt-4' value='Cari Film' onClick={this.LanjutBelanja } /> }
                    <Modal isOpen={this.state.modalConfirm} toggle={this.closeModal}>
                        <ModalBody style={{textAlign : 'center'}}>
                            <p style={{fontSize : '22px', fontWeight : 'bold'}}>Terimakasih telah berbelanja. . . </p>
                            <img style={{height : '200px'}} src='https://static1.squarespace.com/static/57a7d5881b631b6aa47e1579/58c14b046b8f5b630c923fb1/59105385414fb521f05433cd/1546560704257/THANKYOU.gif?format=500w' />
                        </ModalBody>
                    </Modal>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        id : state.user.id,
        cart : state.user.cart,
        transaction :state.user.transaction
    }
}

export default connect(mapStateToProps)(Cart)