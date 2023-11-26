import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../config/Firebase';
import { signInUserFetch } from '../services/api';


const Signup = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
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
          await signInWithPopup(auth, googleProvider);
          navigate("/");
        } catch (err) {
          console.error(err);
        }
    };




 
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
    </main>
  )
}
 
export default Signup;