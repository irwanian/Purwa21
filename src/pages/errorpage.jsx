import React from 'react'
import {Link} from 'react-router-dom'

class Error extends React.Component {
    render(){
        return(
            <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>404</h1>
                <h2>Page not found</h2>
              </div>
              <Link to='/' >
              <a href="#">Homepage</a>
              </Link>
            </div>
          </div>
        )
    }
}

export default Error