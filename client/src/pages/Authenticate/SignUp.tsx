import React, { useState, useRef, useEffect } from 'react';
import { uiConfig, auth, db, doc, setDoc,
    createUserWithEmailAndPassword, updateProfile, 
    fetchSignInMethodsForEmail } from "../../config/Firebase";
import FirebaseAuth from '../../config/FirebaseAuth';
import { signInUserFetch } from '../../services/api';
import styled from "styled-components";
import { OrLine } from '../../components/OrLine';
import { BigButton } from '../../components/BigButton';
import { FloatingInput } from '../../components/FloatingInput';
import { BackArrow } from '../../components/BackArrow';

const SignUp: React.FC = () =>  {
    const firebaseAuth = auth;
    const [registerPageOne, setRegisterPageOne] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [errorMsgEmail, setErrorMsgEmail] = useState<string | null>(null);
    const [errorMsgUsername, setErrorMsgUsername] = useState<string | null>(null);
    const [errorMsgPassword, setErrorMsgPassword] = useState<string | null>(null);
    const [errorMsgConfirmPassword, setErrorMsgConfirmPassword] = useState<string | null>(null);

    const [emailError, setEmailError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

    const emailBorder = useRef<HTMLInputElement>(null);
    const displayNameBorder = useRef<HTMLInputElement>(null);
    const passwordBorder = useRef<HTMLInputElement>(null);
    const confirmPasswordBorder = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if(email && !registerPageOne){
            setEmailError(false);
            setErrorMsgEmail(null);
        };
        if(displayName) {
            setUsernameError(false);
            setErrorMsgUsername(null);
        };
        if(password) {
            setPasswordError(false);
            setErrorMsgPassword(null);
        };
        if(confirmPassword) {
            setConfirmPasswordError(false);
            setErrorMsgConfirmPassword(null);
        };
    },[email, displayName, password, confirmPassword, registerPageOne]);


    const handleContinue = async () => {
        try {
            if(!email.trim()){
                setEmailError(true);
                setErrorMsgEmail('Please enter email.');
                console.log("No email provided");
                return;
            };
            if(!/^\S+@\S+\.\S+$/.test(email.trim())){
                setEmailError(true);
                setErrorMsgEmail('Please provide valid email.');
                console.log("Email not valid");
                return;
            };
            const alreadyExists = await fetchSignInMethodsForEmail(auth, email);
            if (alreadyExists.length > 0) {
                setEmailError(true);
                setErrorMsgEmail('Email already in use.');
                console.log("Email already in use");
                return;
            };

        } catch (error){
            console.error("Error", error);
        };
        setRegisterPageOne(true);
    };
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            if(!displayName.trim()){
                setUsernameError(true);
                setErrorMsgUsername('Please enter a username.');
                console.log("No username provided");
                return;
            }

            if(!password.trim()){
                setPasswordError(true);
                setErrorMsgPassword('Please enter a password.');
                console.log("No password provided");
                return;
            };

            if (!confirmPassword.trim()) {
                setConfirmPasswordError(true);
                setErrorMsgConfirmPassword('Please enter again to confirm.');
                console.log("No password provided");
                return;
            };
  
            if (password.trim() !== confirmPassword.trim()) {
                setConfirmPasswordError(true);
                setErrorMsgConfirmPassword('Passwords don\'t match.');
                console.log("No confirm password provided");
                return;
            };

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
            const user = userCredential.user;
            await updateProfile(userCredential.user, { displayName });
            const user_token = await user.getIdToken();
            const display_name = userCredential.user?.displayName || '';
            const userUID = userCredential.user?.uid || '';
            const userEmail = userCredential.user?.email || '';

            await setDoc(doc(db, 'users', userUID), {
                username: display_name,
                email: email,
            });

            if(user_token) {
                signInUserFetch(user_token, userUID, display_name, userEmail);
            }
        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/weak-password':
                    setConfirmPasswordError(true);
                    setErrorMsgConfirmPassword('Password should be at least 6 characters');
                    console.log("password too weak");
                    break;
                default:
                    console.log(error);
            };
        };
    };


    return (
        <>    
        {!registerPageOne ? (
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
        <ErrorMessage>{errorMsgEmail}</ErrorMessage>

        <BigButton title="Continue" onClick={handleContinue} />
  
        </>
        )
            :
        (
        <>
        <BackArrow onClick={() => setRegisterPageOne(false)} />

        <H5>Create your username and password</H5>

        <FloatingInput 
            $error={usernameError}
            onChange={(e) => setDisplayName(e.target.value)}
            ref={displayNameBorder}
            title="Username"
            type="text"
            value={displayName} />
        <ErrorMessage>{errorMsgUsername}</ErrorMessage>

        <FloatingInput 
            $error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordBorder}
            title="Password"
            type="password"
            value={password} />
        <ErrorMessage>{errorMsgPassword}</ErrorMessage>

        <FloatingInput 
            $error={confirmPasswordError}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ref={confirmPasswordBorder}
            title="Confirm password"
            type="password"
            value={confirmPassword} />
        <ErrorMessage>{errorMsgConfirmPassword}</ErrorMessage>

        <BigButton title="Create Account" onClick={handleSubmit} />

        </>
        )}
        </>
    );
};

const ErrorMessage = styled.p`
    font-size: 12px;
    font-family: sans-serif;
    color: red;
    padding: 5px 0 0 65px;
`;

const H5 = styled.h5`
    margin: 20px 0 50px 0;   
    text-align: center;
`;

const FirebaseAuthContainer = styled.section`
    margin-top: 50px;
    margin-bottom: 25px;
`;


export default SignUp;