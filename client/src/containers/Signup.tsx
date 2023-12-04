import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../config/Firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import SignInWithEmail from '../components/SignInWithEmail';
import { uiConfig } from '../config/Firebase';
import styled from "styled-components";


const Signup: React.FC = () => {
   
    const firebaseAuth = auth;
 
  return (
    <main >        
        <SignupPage>

        <SignInWithEmail></SignInWithEmail>

        <FirebaseAuthContainer>
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}  />
        </FirebaseAuthContainer>

        <NavLinkContiner>
          Already have an account?{' '}
          <NavLink to="/login" >
              Login
          </NavLink>
        </NavLinkContiner>
        </SignupPage>
    </main>
  )
};

const SignupPage = styled.main`
  padding: 70px 0 0 0;

`;

const FirebaseAuthContainer = styled.section`
  margin-top: 135px;
  margin-bottom: 50px;
`;

const NavLinkContiner = styled.section`
  margin-bottom: 50px;
  text-align: center;
`;
 
export default Signup;