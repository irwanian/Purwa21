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
    
    return (
      <div>
        <Navbar style={{backgroundImage : 'linear-gradient(#8360c3, #2ebf91)'}} light expand="md">
          <Link to='/'>
          <NavbarBrand style={{fontWeight : 'bold', color : 'antiqueWhite'}} >PURWA 21</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <Link to='/cart' >
              <NavItem>
                <NavLink style={{fontWeight : '200', fontSize: '24px', color : 'antiqueWhite'}}><ShoppingCart  /></NavLink>
              </NavItem>
              </Link>
              <Link to='/manage-movie' >
              <NavItem>
                <NavLink style={{fontWeight : '400', fontSize: '24px', color : 'antiqueWhite'}}>Admin</NavLink>
              </NavItem>
              </Link>
              
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
                <DropdownMenu right>
                  <Link to='/edit-profile'>
                  <DropdownItem>
                    <i className='fa fa-user' style={{fontSize : '18px'}}> View Profile </i>
                  </DropdownItem>
                  </Link>
                  <DropdownItem>
                  <i className='fa fa-cart-arrow-down' style={{fontSize : '18px'}}> </i>  
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem  onClick={ this.onLoggedOut}>
                  <i className='fa fa-sign-out' style={{fontSize : '18px'}}> Log out </i>
                  </DropdownItem>
                </DropdownMenu>
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
    loggedAccount : state.user.username
  }
}

export default connect(mapStateToProps, {onLogout})(NavBioskop)