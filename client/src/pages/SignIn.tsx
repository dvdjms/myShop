import React, {useState, useRef, useEffect} from 'react';
import { auth, signInWithEmailAndPassword, uiConfig } from '../config/Firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import styled from "styled-components";
import { OrLine } from '../components/OrLine';
import { signInUserFetch } from '../services/api';
import { BigButton } from '../components/BigButton';
import { BackArrow } from '../components/BackArrow';
import { FloatingInput } from '../components/FloatingInput';
import ForgotPassword from './ForgotPassword';


const SignIn: React.FC = () =>  {
    const firebaseAuth = auth;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsgEmail, setErrorMsgEmail] = useState<string | null>(null);
    const [errorMsgPassword, setErrorMsgPassword] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const emailBorder = useRef<HTMLInputElement>(null);
    const passwordBorder = useRef<HTMLInputElement>(null);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);

    useEffect(() => {
        if(email){
            setEmailError(false);
            setErrorMsgEmail(null);
        };
        if(password){
            setPasswordError(false);
            setErrorMsgPassword(null);
        };
    },[setEmailError, email, password]);

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!/^\S+@\S+\.\S+$/.test(email.trim())){
            setEmailError(true);
            setErrorMsgEmail("Please provide a valid email.");
            console.log("Email not valid");
            return;
        };

        if(!password.trim()){
            if(!email) {
                setPasswordError(false);
                return;
            }
            else {
                setPasswordError(true);
                setErrorMsgPassword("Please provide a password.");
                console.log("No password provided");
                return;
            };
        };

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const user_token = await user.getIdToken();
            const display_name = userCredential.user?.displayName || '';
            const userUID = userCredential.user?.uid || '';
            const userEmail = userCredential.user?.email || '';

            if(user_token) {
                signInUserFetch(user_token, userUID, display_name, userEmail);
            }
            else {
                console.log('No user token');
            }
        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setEmailError(true);
                    setErrorMsgEmail("Email not registered.");
                    console.log("Email invalid");
                    break;
                case 'auth/user-not-found':
                    setEmailError(true);
                    setErrorMsgEmail(" Email not registered.");
                    setErrorMsgPassword(null);
                    console.log("Email not registered");
                    break;
                case 'auth/wrong-password':
                    setPasswordError(true);
                    setErrorMsgPassword("Incorrect password.");
                    console.log("Password incorrect");
                    break;
                case 'auth/too-many-requests':
                    setPasswordError(true);
                    setEmailError(true);
                    setErrorMsgPassword("Too many requests. Try again later.");
                    console.log("Too many requests");
                    break;
                default:
                    console.log(error);
            };
        };
    };


    return (
        <> 
        {forgotPassword ? (
            <>
            <BackArrow onClick={() => setForgotPassword(false)} />
            <ForgotPassword></ForgotPassword>
            </>
        )
        :
        (
            <>
            <FirebaseAuthContainer>
                <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
            </FirebaseAuthContainer>

            <OrLine></OrLine>

            <FloatingInput 
                $error={emailError}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailBorder}
                title="Email"
                type="email"
                value={email} />

            {errorMsgEmail && (
                <ErrorMessage>{errorMsgEmail}</ErrorMessage>
            )}

            <FloatingInput 
                $error={passwordError}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordBorder}
                title="Password"
                type="password"
                value={password} />

            {errorMsgPassword && (
                <ErrorMessage>{errorMsgPassword}</ErrorMessage>
            )}

            <BigButton title="Sign In" onClick={onSubmit} />
            
            <ForgotPasswordLink onClick={() => setForgotPassword(true)}>Forgot password?</ForgotPasswordLink>
            </>
        )}
        </> 
    );
};


const ForgotPasswordLink = styled.p`
    padding: 25px 0 0 60px;
    font-size: 12px;
    width: 50%;
    cursor: pointer;
    &:hover {
        color: #001e80;
    }
`;

const ErrorMessage = styled.p`
    font-size: 12px;
    font-family: sans-serif;
    color: red;
    padding: 5px 0 0 65px;
`;

const FirebaseAuthContainer = styled.section`
    margin-top: 50px;
    margin-bottom: 25px;
`;


export default SignIn;