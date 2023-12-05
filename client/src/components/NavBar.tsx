import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import NavDropdown from 'react-bootstrap/navdropdown';
import { useModal } from "../contexts/ModalContext";

type NavbarProps = {
      isSignedIn: boolean;
}


const NavBar: React.FC<NavbarProps> = ({ isSignedIn }) => {
      const navigate = useNavigate();

      const { openModal } = useModal();

      const handleLogout = () => {
            signOut(auth)
            .then(() => {
                //   navigate("/login");
                  console.log("Signed out successfully");
            })
            .catch((error) => {
                  console.error(error);
            });
      };

      
      return (

        <NavigationContainer>
            <NavBarContentStart>
                  <NavLink to="/">
                        MyShop
                  </NavLink>
            </NavBarContentStart>

            <NavBarContentCenter >
                  <NavLink to="/" >

                  </NavLink>
            </NavBarContentCenter>

            {isSignedIn === true ?
            <NavBarContentEnd>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                        <NavLink to="/profile" >
                              Profile
                        </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                        <NavLink to="/settings" >
                              Settings
                        </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                        <NavLink onClick={handleLogout} to="/login">
                              Sign out
                        </NavLink>
                  </NavDropdown.Item>
                  </NavDropdown>
            </NavBarContentEnd>
              :
            <NavBarContentEnd >
                  <NavLink to="/login" className="nav-link" onClick={() => openModal('signIn')}>
                        Sign in
                  </NavLink>
                  <NavLink to="/signup" onClick={() => openModal('signUp')} >
                        Register
                  </NavLink>
            </NavBarContentEnd>
        }
        </NavigationContainer>
  )
};

const NavigationContainer = styled.nav`
      height: 50px;
      background-color: white;
      margin: 0px;
      display: flex;
      justify-content: space-between;
      border-bottom: #d4d4d4 .5px solid;
      position: fixed;
      width: 100vw;
      z-index: 3;
`;

const NavBarContentStart = styled.div`
      font-size: 24px;
      font-weight: 700;
      padding: 5px 0 0 20px;
`;

const NavBarContentCenter = styled.div`
      display: flex;
      justify-content: center;
      padding: 10px;
`;

const NavBarContentEnd = styled(NavBarContentCenter)`
      justify-content: end;
      padding-right:30px;
      display: flex;
      justify-content: space-between;
      width: 170px;
`;


export default NavBar;
