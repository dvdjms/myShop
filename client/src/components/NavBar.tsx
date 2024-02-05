import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import NavDropdown from 'react-bootstrap/navdropdown';
import { useModal } from "../contexts/ModalContext";
import { useUser } from '../contexts/UserContext';
import { useAuth } from "../contexts/AuthContext";
import { navlinks } from "../constants";


const NavBar: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { username } = useUser();
    const { openModal } = useModal();

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            //   navigate("/");
            //   console.log("Signed out successfully");
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

            {isAuthenticated ?
            <>
            <NavBarContentCenter >
                <p></p>
            </NavBarContentCenter>
  
            <NavBarContentEnd>
                <NavBarContentEndSignedIn>
                    {!username ?  (
                        <SignedStatus>Loading...</SignedStatus>
                        ) : (
                        <SignedStatus>Hello, {username}</SignedStatus>
                    )}
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                        {navlinks.map((link, index) => (
                            <LinkContainer key={index}>
                                <NavLink to={`/${link.id}`}>
                                    <Link>{link.title}</Link>
                                </NavLink>
                            </LinkContainer>
                        ))}
                    <NavDropdown.Divider />
                        <LinkContainer>
                            <NavLink onClick={handleLogout} to="/">
                                <Link>Sign out</Link>
                            </NavLink>
                        </LinkContainer>
                    </NavDropdown>
                </NavBarContentEndSignedIn>
            </NavBarContentEnd>
            </>
              :
            <NavBarContentEnd>
                <NavBarContentEndSignedOut>
                    <NavLink to="#" onClick={() => openModal('signIn')}>
                        Sign in
                    </NavLink>
                    <NavLink to="#" onClick={() => openModal('signUp')} >
                        Register
                    </NavLink>
                </NavBarContentEndSignedOut>
            </NavBarContentEnd>
        }
        </NavigationContainer>
    );
};

const LinkContainer = styled.div`
    padding: 3px 0 3px 12px;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const Link = styled.div`
    color: black;
    font-size: 14px;
    text-decoration: none;
    &:hover {
        color: #4a014a;
    }
    &:active {
        color: #730273;
        font-weight: bold;
    }
`;

const SignedStatus = styled.p`
    width: 200px;
    text-align: right;
    padding-right: 25px;
`;


const NavigationContainer = styled.nav`
    font-size: 14px;
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
    justify-self: right;
    padding: 10px;
`;

const NavBarContentEnd = styled(NavBarContentCenter)`
    justify-content: end;
    font-size: 14px;
    width: 400px;
`;

const NavBarContentEndSignedIn = styled.div`
    display:flex;
    justify-content: space-between;
    float: left;
    padding-right: 15px;
    padding-top: 5px;
`;

const NavBarContentEndSignedOut = styled.div`
    width: 130px;
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
    padding-top: 5px;
`;


export default NavBar;
