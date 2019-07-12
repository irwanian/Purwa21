import React from 'react'
import {Paper} from '@material-ui/core'
import {connect} from 'react-redux'
import Axios from 'axios'
import {registrationSuccess} from './../redux/action'
import{ apiURL } from './../support/apiURL'
import {Edit} from '@material-ui/icons'
import {Modal, ModalBody,Alert, ModalHeader } from 'reactstrap'



class EditProfile extends React.Component{

    state = {
        data : [],
        editing : 0,
        openModal : false
    }
    componentDidMount(){
        Axios.get(apiURL + '/users?id=' + this.props.id)
        .then((res)=>{
            this.setState({data : res.data})
        })
        .catch((err)=>{

        })
    }

    onEditing = () =>{
        this.setState({openModal : true})
    }

    cancelEdit = () =>{
        this.setState({openModal : false})
    }

    onEditProfile = () =>{
        var newPass = this.refs.password.value
        if(newPass.split('').length > 5){
            Axios.patch(apiURL+ '/users/' + this.props.id, { password : newPass} )
            .then((err)=>{
                this.setState({openModal : false})
            })
            .catch((err)=>{

            })
        }else{
            alert('Password Minimal 6 Karakter')
            this.refs.password.value = ''
        }

    }


    renderUserData = () => {
        var jsx = this.state.data.map((val, index)=> {
            
            return(
            <div >
                <div className='mb-3'>Username : {val.username}  
                </div>
                <div className='mb-3'>Password : {val.password.replace(val.password, '******')} 
                  <Edit onClick={this.onEditing}
                   style={{float : 'right', cursor : 'pointer'}} /> </div>
            </div>
            )
        })
        return jsx
    }

        render(){
            return(
              <div className='container'>
                  <h2 className='mb-5'>Your Profile</h2>
                  <Paper className='container pt-5 pl-5'>
                        {this.renderUserData()}
                  </Paper>

                  <Modal isOpen={this.state.openModal} toggle={this.cancelEdit} >
                      <ModalHeader className='justify-content-center' >
                            Edit Profile
                      </ModalHeader>
                      <ModalBody>
                          <tr>
                            Password : <input type='password' placeholder='password minimal 6 karakter' style={{border : 'solid 0.5px black' ,height : '35px',width:'250px' ,borderRadius : '25px', marginBottom : '40px'}}  ref='password' />
                          </tr>
                          <div style={{float : 'right'}}>
                            <input  type='button' onClick={this.onEditProfile} value='Save' className='mr-2 btn btn-primary' />
                            <input type='button' onClick={this.cancelEdit} value='cancel' className='btn btn-danger' />
                          </div>
                      </ModalBody>
                  </Modal>
              </div>  
            )
        }
    }

    const mapStateToProps = (state)=> {
        return{
            id : state.user.id,
        }
    }
    export default connect(mapStateToProps)(EditProfile)