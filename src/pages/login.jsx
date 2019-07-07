import React from 'react'
import { Paper } from '@material-ui/core';
import{Link} from 'react-router-dom'
import {connect} from 'react-redux'


class Login extends React.Component{
  state = {
      error : '',
  }


  
    render(){

        



        return(
            <div className='container'>
                
            <div className='row justify-content-center'>
                <div className='col-md-6 mt-5'>
                    <Paper className='container'>
                        <h1>Login</h1>
                        <input type='text' style={{borderRadius : '25px'}} ref='name' placeholder='username' className='form-control mt-3' />
                        <input type='password' style={{borderRadius : '25px'}} ref= 'password' placeholder='password' className='form-control mt-3' />
                        <input type='button' style={{borderRadius : '25px'}} value='Login' className='mt-5 btn btn-primary' /> 
                        
                        
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
        username : state.user.username
    }
}

export default connect(mapStateToProps)(Login);