import React, { useState, useRef, useEffect } from 'react';
import { auth, sendPasswordResetEmail } from '../config/Firebase';
import styled from "styled-components";
import { BigButton } from '../components/BigButton';
import { FloatingInput } from '../components/FloatingInput';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMsgEmail, setErrorMsgEmail] = useState<string | null>(null);
    const [errorMsgPassword, setErrorMsgPassword] = useState<string | null>(null);
    const [errorMsgConfirmPassword, setErrorMsgConfirmPassword] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const emailBorder = useRef<HTMLInputElement>(null);
    const passwordBorder = useRef<HTMLInputElement>(null);
    const confirmPasswordBorder = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if(email){
            setEmailError(false);
            setErrorMsgEmail(null);
        };
        if(password) {
            setPasswordError(false);
            setErrorMsgPassword(null);
        };
        if(confirmPassword) {
            setConfirmPasswordError(false);
            setErrorMsgConfirmPassword(null);
        };
    },[email, password, confirmPassword]);


    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!email.trim()){
            setEmailError(true);
            setErrorMsgEmail('Please enter email.');
            console.log("No email provided");
            return;
        };

        if(!/^\S+@\S+\.\S+$/.test(email.trim())){
            setEmailError(true);
            setErrorMsgEmail('Please enter vaild email.');
            console.log("Email not valid");
            return;
        };

        if(!password.trim()){
            setPasswordError(true);
            setErrorMsgPassword('Please enter a password.');
            console.log("No password provided");
            return;
        };

        if (!confirmPassword.trim()) {
            setConfirmPasswordError(true);
            setErrorMsgConfirmPassword('Please enter again to confirm.')
            console.log("No password provided");
            return;
        };

        if (password.trim() !== confirmPassword.trim()) {
            setConfirmPasswordError(true);
            setErrorMsgConfirmPassword('Passwords don\'t match.')
            console.log("No confirm password provided");
            return;
        };

        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset. Please check you email inbox');
        })
        .catch((error: any) => {
            console.log(error)
        });
    };


    return (
        <>
        <H5>Reset password</H5>
        <FloatingInput 
            $error={emailError}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailBorder}
            title="Email"
            type="email"
            value={email} />
        <ErrorMessage>{errorMsgEmail}</ErrorMessage>

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
 
        <BigButton title="Reset password" onClick={onSubmit} />
        </>
    );
};


const ErrorMessage = styled.p`
    font-size: 12px;
    font-family: sans-serif;
    color: red;
    padding: 5px 0 0 5px;
`;

const H5 = styled.h5`
    margin: 20px 0 50px 0;   
    text-align: center;
`;

export default ForgotPassword;
