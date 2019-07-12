import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import NavBioskop from './pages/header';
import MovieList from './pages/movieList';
import MovieDetails from './pages/movieDetail';
import ManageMovie from './admin/manageMovie'
import Register from './pages/register'
import Login from './pages/login'
import Axios from 'axios';
import {apiURL} from './support/apiURL'
import {registrationSuccess} from './redux/action'
import {connect} from 'react-redux'
import Reservation from './pages/seatReservation'
import EditProfile from './pages/editProfile'
import Errorpage from './pages/errorpage'
import Cart from './pages/cart'
import History from './pages/history'




class App extends React.Component {

    componentDidMount(){
        var username = localStorage.getItem('keepRegistered')
        
        
        if(username !== null){
            Axios.get(apiURL +'/users?username=' + username)
            .then((res)=>{
                console.log(res.data);
                this.props.registrationSuccess(res.data[0])
            })
            .catch((err)=>{

            })
        }
    }

    render(){
        if(this.props.user === '' && localStorage.getItem('keepRegistered') !== null){
            return(
                <p>Loading. . .</p>
            )
        }
        return(
            <div>
                <NavBioskop/>
                <Switch>
                    <Route exact path='/' component={MovieList}/>
                    <Route path='/movie-details' component={MovieDetails} />
                    <Route path='/manage-movie' component={ManageMovie} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login}/>
                    <Route path='/reservation' component={Reservation}/>  
                    <Route path='/edit-profile' component={EditProfile} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/history' component={History} /> 
                    <Route path='*' component={Errorpage} />
                </Switch>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
  return{     
      user : state.user.username
  }  
}

export default connect(mapStateToProps, {registrationSuccess}) (App);