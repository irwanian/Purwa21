import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogout} from '../redux/action'
import './../../node_modules/font-awesome/css/font-awesome.min.css'
import {ShoppingCart} from '@material-ui/icons'
import {addCart } from '../redux/action'
import Errorpage from './errorpage'
import {Redirect} from 'react-router-dom'

class NavBioskop extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLoggedOut = () => {
    this.props.onLogout()
    localStorage.removeItem('keepRegistered')
  }



  render() {
    // if(this.props.loggedAccount === ''){
    //   return(
    //     <Redirect to='/' />
    //   )
    // }
    // pakai Redirect semua Navbar Hilang
    
    return(

      <div>
        <Navbar style={{backgroundImage : 'linear-gradient(#8360c3, #2ebf91)'}} light expand="md">
          <Link to='/'>
          <NavbarBrand style={{fontWeight : 'bold', color : 'antiqueWhite'}} >PURWA 21</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{fontSize : '20px', color : 'antiqueWhite'}}>{this.props.cartQty}</NavLink>
              </NavItem>
              
            {this.props.loggedAccount === '' ? null :
            <Link to='/cart' >
              <NavItem>
                <NavLink style={{fontWeight : '200', fontSize: '24px', color : 'antiqueWhite'}}> <ShoppingCart  /></NavLink>
              </NavItem>
              </Link>
            }
            {this.props.loggedAccount === '' ? null :
            <Link to='/history'>                 
              
              <NavItem>
              <NavLink style={{fontWeight : '400',fontSize: '24px',  color : 'antiqueWhite'}}> history </NavLink>  
            </NavItem>
              </Link>
}
            
              
              { this.props.admin === 'admin' ?
              <Link to='/manage-movie' >
              
              <NavItem>
                <NavLink style={{fontWeight : '400', fontSize: '24px', color : 'antiqueWhite'}}>Admin</NavLink>
              </NavItem>
              </Link> : null }
              


              {this.props.loggedAccount !== '' ? null
              :
              <Link to='/login'>
              <NavItem>
                <NavLink style={{fontWeight : '400',fontSize: '24px',  color : 'antiqueWhite'}}>Login</NavLink>
              </NavItem>
              </Link>}
              
              { this.props.loggedAcount !== '' ? 

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={{fontWeight : '400',fontSize: '24px', color : 'antiqueWhite'}} nav caret>
                  {this.props.loggedAccount}
                </DropdownToggle>

                {
                this.props.loggedAccount === '' ? null :
                <DropdownMenu right>
                  <Link to='/edit-profile'>
                  <DropdownItem>
                    <i className='fa fa-user' style={{fontSize : '18px'}}> View Profile </i>
                  </DropdownItem>
                  </Link>
                  
                  <DropdownItem divider />
                  <Link to='/'>
                  <DropdownItem  onClick={ this.onLoggedOut}>
                  <i className='fa fa-sign-out' style={{fontSize : '18px'}}> Log out </i>
                  </DropdownItem>
                  </Link>
                </DropdownMenu>}
              </UncontrolledDropdown>
            : null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedAccount : state.user.username,
    cartQty : state.add.count,
    admin : state.user.role
  }
}

export default connect(mapStateToProps,  {onLogout, addCart})(NavBioskop)