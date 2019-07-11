import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {registrationSuccess} from './../redux/action/'



class MovieList extends React.Component {
    state = {
        data : [],
        dataMovie : [],
        searching : ''
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

    searchMovie = (word) => {
        this.setState({searching : word})        
    }


    printMovies = () => {
        var jsx = this.state.data.filter((val)=>{
            return val.title.toLowerCase().indexOf(this.state.searching.toLowerCase()) !== -1
        }).map((val)=> {
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
                <div className='mb-5 mt-3 col-md-4'>
                    <input type='input'  placeholder='cari film. . .' ref='searchbox' style={{ height: '38px', paddingLeft : '5px'}} />
                    <input type='button' value='cari' className='ml-2 d-inline-flex btn btn-primary ' 
                        onClick={()=> this.searchMovie(this.refs.searchbox.value)} />    
                </div>        

                { this.props.loggedAccount !== ""?
                <div className='alert alert-success'>
                    Hello, {this.props.loggedAccount}, Selamat Datang!
                </div>: null
                }
                <div className='row justify-content-center'>
                    {this.printMovies()}
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

export default connect(mapStateToProps, {registrationSuccess})(MovieList);