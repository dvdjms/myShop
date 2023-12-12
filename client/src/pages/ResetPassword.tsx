import React, { useState, useRef } from 'react';
import { auth, sendPasswordResetEmail } from '../config/Firebase';
import styled from "styled-components";
import { BigButton } from '../components/BigButton';


const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const errorMessageInvalidEmail = useRef<any>();
    const errorMessageNotRegistered = useRef<any>();
    const emailBorder = useRef<any>();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!/^\S+@\S+\.\S+$/.test(email.trim())){
            emailBorder.current.style.border = 'red solid';
            emailBorder.current.focus();
            errorMessageInvalidEmail.current.style.display = 'block';
            console.log("Email not valid");
            return;
        };


        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent');
        })
        .catch((error: any) => {
            console.log(error)
        });
    }



    return (
        <>
        <ResetPasswordContainer></ResetPasswordContainer>

        <InputContainer  className="form-floating mb-3">
            <Input type="email" 
                className="form-control" 
                id="floatingInput" 
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailBorder} 
                required>
            </Input>
        <Label htmlFor="floatingInput">Email<SpanAsterisk> &#42;</SpanAsterisk></Label>
        
        <ErrorMessage ref={errorMessageInvalidEmail}>Please provide a valid email.</ErrorMessage>
        <ErrorMessage ref={errorMessageNotRegistered}>Email not registered.</ErrorMessage>
        </InputContainer>

        <BigButton title="Reset password" onClick={onSubmit} />
        </>
    );
};


const ResetPasswordContainer = styled.p`
    height: 50px;
    display: flex;
    justify-content: center;
`;

const ErrorMessage = styled.p`
    font-size: 12px;
    font-family: sans-serif;
    display: none;
    color: red;
    padding: 5px 0 0 5px;
`;

const InputContainer = styled.div`
    margin: auto;
    width: 300px;
`;

const Label = styled.label`
  margin-top:2px;
  color: gray;
  font-size: 14px;
  font-family: system-ui, 'Segoe UI','Open Sans', 'Helvetica Neue', sans-serif;
`;

const Input = styled.input`
  &:focus {
    box-shadow: rgb(116, 116, 116) 0 0 7px 1px !important;
    border: none;
  }
`;

const SpanAsterisk = styled.span`
  color: #a50016;
;`

const ButtonContainer = styled.div`
  padding: 0 50px 0 50px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  z-index: 0;
`;

const StyledButton = styled.div`
  font-size: 14px;
  height: 39px;
  width: 222px !important;
  border-radius: 2px;
`;


export default ResetPassword;
