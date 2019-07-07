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
  render() {
    return (
      <div>
        <Navbar style={{backgroundImage : 'linear-gradient(#8360c3, #2ebf91)'}} light expand="md">
          <NavbarBrand href="/" style={{fontWeight : 'bold', color : 'antiqueWhite'}} >PURWA 21</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Link to='/manage-movie' >
              <NavItem>
                <NavLink style={{fontWeight : '400', color : 'antiqueWhite'}}>Admin</NavLink>
              </NavItem>
              </Link>
              <Link to='/login'>
              <NavItem>
                <NavLink style={{fontWeight : '400', color : 'antiqueWhite'}}>Login</NavLink>
              </NavItem>
              </Link>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={{fontWeight : '400', color : 'antiqueWhite'}} nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBioskop