import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import NavBioskop from './pages/header';
import MovieList from './pages/movieList';
import MovieDetails from './pages/movieDetail';
import ManageMovie from './admin/manageMovie'
import Register from './pages/register'
import Login from './pages/login'


class App extends React.Component {
    render(){
        return(
            <div>
                <NavBioskop/>
                <Route exact path='/' component={MovieList}/>
                <Route path='/movie-details' component={MovieDetails} />
                <Route path='/manage-movie' component={ManageMovie} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login}/>
                 
            </div>
        )
    }
    
}

export default App;
