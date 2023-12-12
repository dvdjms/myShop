import React, {useState, useRef, useEffect} from 'react';
import { auth, signInWithEmailAndPassword, uiConfig } from '../config/Firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import styled from "styled-components";
import { OrLine } from '../components/OrLine';
import { signInUserFetch } from '../services/api';
import { BigButton } from '../components/BigButton';
import { FloatingInput } from '../components/FloatingInput';


const SignIn: React.FC = () =>  {
    const firebaseAuth = auth;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [errorMessageInvalidEmail, setErrorMessageInvalidEmail] = useState<boolean>(false);

    const errorMessageInvalidEmail = useRef<any>();
    const errorMessageNotRegistered = useRef<any>();
    const errorMessageEnterPassword = useRef<any>();
    const errorMessageIncorrectPassword = useRef<any>();
    const errorMessageTooManyRequests = useRef<any>();

    const emailBorder = useRef<HTMLInputElement>(null);
    const passwordBorder = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);


    useEffect(() => {
        if(email){
            setEmailError(false);
            errorMessageInvalidEmail.current.style.display = 'none';
            errorMessageNotRegistered.current.style.display = 'none';
        };
        if(password){
            setPasswordError(false);
            errorMessageIncorrectPassword.current.style.display = 'none';
            errorMessageEnterPassword.current.style.display = 'none';
            errorMessageTooManyRequests.current.style.display = 'none';
        };
    },[setEmailError, email, password]);


    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!/^\S+@\S+\.\S+$/.test(email.trim())){
            setEmailError(true)
            errorMessageInvalidEmail.current.style.display = 'block';
            console.log("Email not valid");
            return;
        }

        if(!password.trim()){
            if(!email) {
                setPasswordError(false)
                return;
            }
            else {
                setPasswordError(true)
                errorMessageEnterPassword.current.style.display = 'block';
                errorMessageIncorrectPassword.current.style.display = 'none';
                errorMessageTooManyRequests.current.style.display = 'none';
                console.log("No password provided")
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
                console.log('No user token')
            }

        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setEmailError(true)
                    errorMessageNotRegistered.current.style.display = 'block';
                    console.log("Email not registered");
                    break;
                case 'auth/user-not-found':
                    setEmailError(true)
                    errorMessageNotRegistered.current.style.display = 'block';
                    console.log("Email not registered");
                    break;
                case 'auth/wrong-password':
                    setPasswordError(true)
                    errorMessageIncorrectPassword.current.style.display = 'block';
                    errorMessageTooManyRequests.current.style.display = 'none';
                    console.log("Password incorrect");
                    break;
                case 'auth/too-many-requests':
                    setPasswordError(true)
                    setEmailError(true)
                    errorMessageTooManyRequests.current.style.display = 'block';
                    errorMessageIncorrectPassword.current.style.display = 'none';
                    console.log("Too many requests");
                    break;
                default:
                    console.log(error);
            };
        };
    };
    
    return (
        <>    

        <FirebaseAuthContainer>
            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </FirebaseAuthContainer>

        <OrLine></OrLine>

        <FloatingInput 
            error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailBorder}
            title="Email"
            type="email"
            value={email} />

        {/* {errorMessageInvalidEmail && (
            <ErrorMessage>Please provide a valid email.</ErrorMessage>
        )} */}
        <ErrorMessage ref={errorMessageInvalidEmail}>Please provide a valid email.</ErrorMessage>
        <ErrorMessage ref={errorMessageNotRegistered}>Email not registered.</ErrorMessage>

        <FloatingInput 
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordBorder}
            title="Password"
            type="password"
            value={password} />

        <ErrorMessage ref={errorMessageEnterPassword}>Please provide a password.</ErrorMessage>
        <ErrorMessage ref={errorMessageIncorrectPassword}>Incorrect password.</ErrorMessage>
        <ErrorMessage ref={errorMessageTooManyRequests}>Too many requests. Try again later.</ErrorMessage>

        <BigButton title="Sign In" onClick={onSubmit} />
        
        <ForgotPassword>Forgot password?</ForgotPassword>
        </> 
    );
};


const ForgotPassword = styled.p`
    padding: 25px 0 0 60px;
    font-size: 12px;
    width: 50%;
`;

const ErrorMessage = styled.p`
    font-size: 12px;
    font-family: sans-serif;
    display: none;
    color: red;
    padding: 5px 0 0 65px;
`;

const FirebaseAuthContainer = styled.section`
    margin-top: 50px;
    margin-bottom: 25px;
`;


export default SignIn;