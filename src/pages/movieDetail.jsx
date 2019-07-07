import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class MovieDetails extends React.Component {
    state = {
        data : null,
        login : null
    }
    
    componentDidMount(){
        var id = this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/' + id)
        .then((res)=>{
            this.setState({data : res.data})
        })
        .catch((err)=>{

        })
    }
    
    
    onBuyTicket= () =>{
        if(this.props.user.id === 0){
            this.setState({login : false})
        }
    }
    
    
    
    render(){

        if(this.state.login === false){
            return(
                <Redirect to='/login' />
            )
        }if(this.state.data === null){
            return(
                <p>Loading. . .</p>
            )
        }
        return(
            <div className='container mt-5 mb-5'>
                <div className='row '>
                    <div className='col-md-4'>
                        <img height='430px' src={this.state.data.image} alt={this.state.data.title} />
                    </div>
                    <div className='col-md-8'>
                        <h1>{this.state.data.title}</h1>
                        <h5>{this.state.data.sutradara}</h5>
                        <p>{this.state.data.duration} Menit</p>
                        <p>Playing at {this.state.data.playingAt.join(' ')}</p>
                        <p style={{fontStyle : 'italic'}}>{this.state.data.sinopsis}</p>
                        <input type='button' onClick={this.onBuyTicket} className='btn btn-outline-primary' value='Buy Ticket' />
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

export default connect(mapStateToProps)(MovieDetails)