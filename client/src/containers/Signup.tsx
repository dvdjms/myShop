import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/Firebase';


const Signup = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
     
      try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const user_token = await user.getIdToken();
        const userUID = userCredential.user?.uid;
        // const userEmail = userCredential.user?.email;
        console.log(userUID);
     
        if(user_token) {

        const response = await fetch('http://127.0.0.1:8000/api/users/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token}`,
            },
            body: JSON.stringify({
                'firebase_uid': userUID,
                'email': email,
                'display_name': displayName,
            }),
        });
        const data = await response.json();
        console.log('Message from React:', data);
        navigate("/")
        // if(userUID){
        //     navigate("/login")
        // }

    }
        
    }
        catch (error) {
            const errorCode = error;
            const errorMessage = error;
            console.log(errorCode, errorMessage);
            // ..
        };

    }

    const signInWithGoogle = async (): Promise<void> => {
        //////////////////////////////////////////////////////////////////////////////
        //send data to server
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
 
export default Signup