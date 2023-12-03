import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../config/Firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import SignInWithEmail from '../components/SignInWithEmail';
import { uiConfig } from '../config/Firebase';



const Signup = () => {
   


    const firebaseAuth = auth;
 
  return (
    <main >        
        <section>
    
        <SignInWithEmail></SignInWithEmail>


        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}  />


        Already have an account?{' '}
                        <NavLink to="/login" >
                            Login
                        </NavLink>
        </section>
    </main>
  )
}
 
export default Signup;