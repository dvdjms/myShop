import React, { useState, useRef, useEffect } from 'react';
import { auth, sendPasswordResetEmail } from '../../config/Firebase';
import styled from "styled-components";
import { BigButton } from '../../components/BigButton';
import { FloatingInput } from '../../components/FloatingInput';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [errorMsgEmail, setErrorMsgEmail] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<boolean>(false);
    const emailBorder = useRef<HTMLInputElement>(null);
    const [passwordResetMsg, setPasswordResetMsg] = useState<boolean>(false);

    useEffect(() => {
        if(email){
            setEmailError(false);
            setErrorMsgEmail(null);
        };
    },[email]);


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

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setPasswordResetMsg(true);
            console.log('Password reset');
        })
        .catch((error: any) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    setEmailError(true);
                    setErrorMsgEmail("Email not registered.");
                    console.log("Email invalid");
                    break;
                case 'auth/user-not-found':
                    setEmailError(true);
                    setErrorMsgEmail(" Email not registered.");
                    console.log("Email not registered");
                    break;
            };
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
 
        <BigButton title="Reset password" onClick={onSubmit} />

        {passwordResetMsg && 
            <PasswordResetMessage>Password reset. Please check you email inbox.</PasswordResetMessage>
        }
        </>
    );
};

const PasswordResetMessage = styled.p`
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: lightgreen;
    height: 30px;
    margin: 40px 10px 0 10px;
`

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

export default ForgotPassword;
