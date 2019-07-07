import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class MovieList extends React.Component {
    state = {
        data : [],
        dataMovie : []
    }

    componentDidMount(){
        this.getDataMovies()
    }

    getDataMovies = () => {
        Axios.get('http://localhost:2000/movies')
        .then((res)=> {
            this.setState({ data : res.data})
        })

        .catch((err)=> {
            console.log(err);
        })
    }


    printMovies = () => {
        var jsx = this.state.data.map((val)=> {
            return(
                <div className="col-md-3 mt-5">
                <div className='mycard fading'>
                    <div className="circle text-uppercase"><span>{val.duration +' min'}</span></div>
                    <Link to={'/movie-details?id=' + val.id} ><div className='fadedText'> Movie details</div></Link>
                     <img src={val.image} alt={val.title} className='img-fluid'/> 
                    <div className='container'>
                        <div style={{paddingTop : '12px', fontWeight : '500'}} >{val.title}</div>
                        <div className='director'>{val.sutradara}</div>
                        <div className='genrebox rounded-pill text-uppercase' style={{marginBottom : '22px'}}><span>{val.genre}</span></div>
                    </div>
                </div>
            </div>
            )
        })
        return jsx
    }
    



    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                    {this.printMovies()}
                </div>          
            </div>
        )
    }
}

export default MovieList;