import React, { useContext } from "react";
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,NavbarText} from "reactstrap";
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  return (
    <Navbar color="primary" light expand="md">
      <NavbarBrand>
        <Link to="/" className="text-white">
         TODO
        </Link>
      </NavbarBrand>
      <NavbarText className="text-white">
        {/* {context.user?.email ? context.user.email : ""} */}
      </NavbarText>
        <Nav className="ml-auto" navbar>
          {
          isLoggedIn ? (
            <NavItem>
              <NavLink tag={Link} to="/signin" onClick={() => logout()}className="text-white">
                Logout
              </NavLink>
            </NavItem> ) : 

            <>
              <NavItem>
                <NavLink tag={Link} to="/signup" className="text-white">
                  Signup
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signin" className="text-white">
                  Signin
                </NavLink>
              </NavItem>
            </>}
        </Nav>
    </Navbar>
  );
};

export default Header;
