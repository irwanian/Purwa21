import React from 'react'
import { Paper } from '@material-ui/core';
import{Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {registrationSuccess} from './../redux/action'
import{ apiURL } from './../support/apiURL'
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
  state = {
      error : '',
  }

onLogin = () => {
    var username = this.refs.name.value 
    var password = this.refs.password.value
    if(username === '' || password === ''){
        alert('data wajib diisi')
    }else{
        Axios.get(apiURL + '/users?username=' + username + '&password=' + password)
        .then((res)=> {
            if(res.data.length === 0){
                alert('password or username invalid')
            }else{
                this.props.registrationSuccess(res.data[0])
                localStorage.setItem('keepRegistered', username)
            }            
        })
        .catch((err) => {
    
        })
    }
}
  
    render(){
        if(this.props.loggedAccount !== ''){
            return(
                <Redirect to='/'></Redirect>
            )
        }




        return(
            <div className='container'>               
            
            <div className='row justify-content-center'>
                <div className='col-md-6 mt-5'>
                    <Paper className='container logForm'>
                        <h1>Login</h1>
                        <input type='text' style={{borderRadius : '25px'}} ref='name' placeholder='username' className='form-control mt-3' />
                        <input type='password' style={{borderRadius : '25px'}} ref= 'password' placeholder='password' className='form-control mt-3' />
                        <input type='button' onClick={this.onLogin} style={{borderRadius : '25px'}} value='Login' className='mt-5 btn btn-primary' /> 
                        
                        
                    </Paper>
                    <p className='mt-3'>Belum punya akun?
                    <Link to='/register'>
                        <span style={{fontStyle: 'italic',color:'blue',
                        cursor:'pointer',fontWeight: 'bold', textDecoration : 'underline'}}>
                        Daftar sekarang</span> 
                        </Link>
                        </p>
                </div>
            </div>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loggedAccount : state.user.username
    }
}

export default connect(mapStateToProps, {registrationSuccess})(Login);