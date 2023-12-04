import React from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/Firebase';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const Login = () => {
    // const navigate = useNavigate();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
       
    // const onLogin = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth, email, password)
    //     navigate("/")
    // }

    // const signInWithGoogle = async (): Promise<void> => {
    //     try {
    //         await signInWithPopup(auth, googleProvider);
    //         navigate("/");
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    return(
        <>
            <LoginPage>      
                <section>
                    <div>                                            
                        <p> Login </p>                       
                                                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                    </div>

                </section>
            </LoginPage>  
        </>
    )
};


const LoginPage = styled.main`
    height: 100vh;
    padding: 70px 0 0 0;
`;
 
export default Login;