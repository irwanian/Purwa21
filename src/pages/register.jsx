import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {registrationSuccess} from './../redux/action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Axios from 'axios';

// Ambil Input Value
// klik register
// Password dan confirm password harus sama
// Di Check Username udah ada atau belum di json server
// kalau udah ada munculkan error msg
// kalo belum ada simpan datanya, dan login

class Register extends Component {
    state = {
        error : '',
        loading : false
    }
    onBtnClickRegister = () => {
        
        var username = this.refs.username.value
        var password = this.refs.password.value
        var confirm = this.refs.confirm.value
        if(username === '' || password === '' || confirm === ''){
            this.setState({error : 'Semua Form Wajib diisi'})
        }else{
            if(confirm !== password){
                this.setState({error : 'Konfirmasi Password Tidak Sesuai'})
                this.refs.confirm.value = ''
                
            }else if(password.split('').length < 6){
                this.setState({error : 'Password minimal 6 karakter'})
                this.refs.password.value = ''
                this.refs.confirm.value = ''
                
            }else if(password.split('').length < 6 && confirm !== password){
                this.setState({error : 'Password minimal 6 karakter'})
                this.refs.password.value = ''
                this.refs.confirm.value = ''
                
            }else{
                this.setState({loading : true})
                // Ngecek Username udah ada atau belum
                Axios.get('http://localhost:2000/users?username=' + username)
                .then((res) => {
                    if(res.data.length > 0){
                        this.setState({error : 'Username tidak dapat digunakan' ,loading : false})
                    }else{
                        var obj = {username : username , password : password, role : "user", cart : [], transaction : []}
                        Axios.post('http://localhost:2000/users' , obj)
                        .then((res) => {
                            console.log(res.data)
                            this.props.registrationSuccess(res.data)
                            localStorage.setItem('keepRegistered' //key
                            , res.data.username //get data from username
                            )
                            ;
                            
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    // BIKIN FUNCT
    // renderErrorMessege = () => {
    //     if(this.state.error === ''){
    //         return null
    //     }else{
    //         return <div className='alert alert-danger mt-3'>{this.state.error}</div>
    //     }
    // }
    render() {
        if(this.props.user.username !== ''){
            return <Redirect to='/login' />
        }
        // BIKIN VARIABEL
        // const error = this.state.error === '' ? null : <div className='alert alert-danger mt-3'>{this.state.error}</div>
        return (
            <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-6'>
                    <Paper className='p-5 regForm'>
                    <h1> REGISTRATION FORM </h1>
                    <input style={{borderRadius : '25px'}} ref='username' className='form-control mt-3' type='text' placeholder='username' />
                    <input style={{borderRadius : '25px'}} ref='password' className='form-control mt-3' type='password' placeholder='Password Minimal 6 Karakter' />
                    <input style={{borderRadius : '25px'}} ref='confirm' className='form-control mt-3' type='password' placeholder='confirm password' />
                    {
                        // error
                        // this.renderErrorMessege()
                        this.state.error === '' 
                        ?
                        null 
                        :
                        <div className='alert alert-danger mt-3'>
                            {this.state.error} 
                            <span onClick={() =>this.setState({error : ''})} style={{fontWeight:"bolder" , cursor : 'pointer',float : 'right'}}> x </span> 
                        </div>
                    }
                    {
                        this.state.loading === true 
                        ? 
                        <Loader type='ThreeDots' color ='black' width = '40px' />
                        :
                        <input style={{borderRadius : '25px'}} type='button' onClick={this.onBtnClickRegister} className='btn btn-primary mt-3' value='Register Now' />
                    }
                   
                    
                    </Paper>
                    <p className='mt-3' style={{fontStyle:'italic'}}>
                        Sudah Punya Akun ? 
                        <Link to='/login'>
                        <span style={{color:'blue',fontWeight :"bolder" , textDecoration:'underline',cursor:'pointer'}}> 
                            Login Now 
                        </span>
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
        user : state.user
    }
}

export default connect(mapStateToProps,{registrationSuccess})(Register)