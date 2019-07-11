import React from 'react'
import {Paper} from '@material-ui/core'
import {connect} from 'react-redux'
import Axios from 'axios'
import {registrationSuccess} from './../redux/action'
import{ apiURL } from './../support/apiURL'
import {Edit} from '@material-ui/icons'
import {Modal, ModalBody, ModalHeader } from 'reactstrap'



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

    onEditing = (id) =>{
        this.setState({openModal : true})
    }


    renderUserData = () => {
        var jsx = this.state.data.map((val, index)=> {
            
            return(
            <div >
                <div className='mb-3'>Username : {val.username}  
                <Edit onClick={() => this.onEditing} 
                style={{float : 'right', cursor : 'pointer'}}  /> </div>
                <div className='mb-3'>Password : {val.password} 
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