import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, 
    signInWithPopup, updateProfile, GoogleAuthProvider,
    FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../config/Firebase';
import { signInUserFetch } from '../services/api';
import StyledFirebaseAuth from '../config/StyledFirebaseAuth';

const uiConfig = {
    signInSuccessUrl: '/',
    signInFlow: "popup",
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID,
      TwitterAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };


const Signup = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(userCredential.user, { displayName });
            const user_token = await user.getIdToken();
            const display_name = userCredential.user?.displayName || '';
            const userUID = userCredential.user?.uid || '';
            const userEmail = userCredential.user?.email || '';
    
            if(user_token) {
                signInUserFetch(user_token, userUID, display_name, userEmail);
                navigate("/");
            }
        }
        catch (error) {
            console.error("error", error);
        };
    };


    const signInWithGoogle = async (): Promise<void> => {

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userCredential = result;
            const user = userCredential.user;
            const user_token = await user.getIdToken();
            const user_UID = user.uid;
            const display_name = user.displayName || '';
            const user_email = user.email || '';
            if(user_token){
                signInUserFetch(user_token, user_UID, display_name, user_email);
                navigate("/");
            }
        } catch (error) {
            console.error("error", error);
        }
    };

 
const firebaseAuth = auth;
 
  return (
    <main >        
        <section>
            <div>
                <div>                  
                    <h1> Signup </h1>                                                                            
                    <form>
                    <div>
                            <label htmlFor="displayName">
                                Display Name
                            </label>
                            <input
                                type="text"
                                name="name"
                              //   label="Email address"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}  
                                required                                    
                                placeholder="Display name"                                
                            />
                        </div>                                                                                   
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="text"
                                name="email"
                              //   label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="User name"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                              //   label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                    <button id="google" onClick={signInWithGoogle}>
                        login with Google
                    </button>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Login
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}  />
    </main>
  )
}
 
export default Signup;