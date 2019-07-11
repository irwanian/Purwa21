import React from 'react'
import {Table} from 'reactstrap'
import Axios from 'axios';
import { apiURL } from '../support/apiURL';
import {connect} from 'react-redux'
import {Modal, ModalBody, Alert} from 'reactstrap'
import {} from 'numeral'


class Cart extends React.Component{
    
    state = {
        cart : [],
        modalConfirm : false
    }
    
    componentDidMount(){
        Axios.get(apiURL + '/users/' + this.props.id)
        .then((res)=>{
            this.setState({cart : res.data.cart})
        })
        .catch((err)=>{

        })
    }

    renderCart = () => {
        var jsx= this.state.cart.map((val)=>{
            return(
                <tr>
                    <td>{val.title}</td>
                    <td>{val.qty}</td>
                    <td>{val.total}</td>
                </tr>
            )
        })    
       return jsx;        
    }

    onCheckOut = () => {
        this.setState({modalConfirm : true, cart : []})
    }
    closeModal = () =>{
        this.setState({modalConfirm : false})
    }
    
    render(){
        

        return(
            <div className='container mt-lg-5'>
                <h1>My Cart</h1>
                
                 <Table bordered className='mt-lg-5' style={{backgroundColor: 'fafafa'}}>
                    <thead>
                    <tr>
                        <th>Movies</th>
                        <th>Tiket</th>
                        <th>Total Harga</th> 
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCart()}
                    </tbody>
                </Table>  

      <input type='button' onClick={this.onCheckOut} className='btn btn-success' value='Checkout' />          
           
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
        cart : state.user.cart
    }
}

export default connect(mapStateToProps)(Cart)