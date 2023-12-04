import React from 'react';
import { useNavigate , NavLink} from 'react-router-dom';
import styled from 'styled-components'
import { signOut } from "firebase/auth";
import { auth } from '../config/Firebase';

const Navigation = (props: { isSignedIn: boolean; handleShow: any }) => {

      const navigate = useNavigate();

      const handleLogout = () => {               
                  signOut(auth).then(() => {
                        navigate("/login");
                        console.log("Signed out successfully")
            }).catch((error) => {
                  console.error(error)
            });
      };

      return(
            <NavigationContainer>
                  <NavLink to="/" >
                        Home
                  </NavLink>
            {props.isSignedIn === true ?
                  <>
                        <NavLink to="/profile" >
                              Profile
                        </NavLink>
                        <button onClick={handleLogout}>
                              Logout
                        </button>
                  </>
                  :
                  <>
                        <NavLink to="/login" onClick={props.handleShow}>
                              Login
                        </NavLink>
                        
                        <NavLink to="/signup" >
                              Signup
                        </NavLink>
                  </>

            }
            </NavigationContainer>
      )
}

const NavigationContainer = styled.nav`
      height: 70px;
      background-color: green;
      margin: 0px;
`;

export default Navigation;