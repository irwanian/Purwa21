import React from 'react'
import {Table} from 'reactstrap'
import Axios from 'axios'
import { apiURL } from '../support/apiURL';
import {connect} from 'react-redux'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'

class History extends React.Component{
    state = {
        transaction : [],
        openModal : false
    }


    detailTransaksi = () =>{
        var jsx= this.state.transaction.map((val, i)=>{
            return (
                <tr>
                    <td>{i+1}</td>
                    <td>{val.title}</td>
                    <td>{val.qty}</td>
                    <td>{val.total}</td>
                </tr>
            )
        })
        return jsx
    }

    componentDidMount(){
        Axios.get(apiURL + '/users/' + this.props.id)
        .then((res)=>{
            this.setState({transaction : res.data.cart})
        })
        .catch((err)=>{

        })
        Axios.patch(apiURL + '/users/' + this.props.id, {transaction : this.props.cart})
        .then((res)=>{
            Axios.patch(apiURL + '/users/' + this.props.id, {cart : []})
            .then((res)=>{

            })
            .catch((err)=>{

            })
        })
        .catch((err)=>{

        })
    }

    closeModal = () =>{
        this.setState({openModal : false})
    }

    openingModal = () =>{
        this.setState({openModal : true})
    }

    getCurrentDate=(separator='-')=>{

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
        }

    renderHistory = () =>{
        var jsx= this.state.transaction.map((val, i)=>{
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{this.getCurrentDate()}</td>
                    <td>{val.qty}</td>
                    <td>{val.total}</td>
                    <td><input className='btn btn-info' type='button' value='detail' onClick={this.openingModal} /> </td>
                </tr>
            )
        })
        
        return jsx
    }
    
    render(){
        return(
            <div>
                <Table bordered className='mt-lg-5' style={{backgroundColor: 'fafafa'}}>
                <thead>
                <tr>
                    <td>No.</td>
                    <td>Tanggal</td>
                    <td>Tiket</td>
                    <td>Total Harga</td> 
                    <td>Detail</td>
                </tr>
                </thead>
                <tbody>
                {this.renderHistory()}
                </tbody>
            </Table>


            <Modal isOpen={this.state.openModal} toggle={this.closeModal} >
                <ModalHeader>
                    History detail
                </ModalHeader>
                <ModalBody>
                    <Table borderless>
                        <tr>
                            <td>No.</td>
                            <td>Title</td>
                            <td>qty</td>
                            <td>Sub total</td>
                        </tr>
                        <tbody>
                            {this.detailTransaksi()}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        id : state.user.id,
        transaction : state.user.transaction,
        cart : state.user.cart
    }
}

export default connect (mapStateToProps) (History)