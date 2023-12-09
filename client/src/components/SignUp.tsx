import React, { useState, useRef, useEffect } from 'react';
import { uiConfig, auth, db, doc, setDoc,
    createUserWithEmailAndPassword, updateProfile, 
    fetchSignInMethodsForEmail } from "../config/Firebase";
import FirebaseAuth from '../config/FirebaseAuth';
import { signInUserFetch } from '../services/api';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import { OrLine } from './OrLine';


const SignUp: React.FC = () =>  {
    const firebaseAuth = auth;
    const [registerPageOne, setRegisterPageOne] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const emailBorder = useRef<any>();
    const displayNameBorder = useRef<any>();
    const passwordBorder = useRef<any>();
    const confirmPasswordBorder = useRef<any>();
    const errorMessageEnterEmail = useRef<any>();
    const errorMessageInvalidEmail = useRef<any>();
    const errorMessageEmailAlreadyInUse = useRef<any>();
    const errorMessagePasswordMissMatch = useRef<any>();
    const errorMessageEnterUsername = useRef<any>();
    const errorMessageEnterPassword = useRef<any>();
    const errorMessageEnterConfirmPassword = useRef<any>();
    const errorMessagePasswordWeak = useRef<any>();

    useEffect(() => {
        if(email && !registerPageOne){
            emailBorder.current.style.border = '';
            errorMessageEnterEmail.current.style.display = 'none';
            errorMessageInvalidEmail.current.style.display = 'none';
            errorMessageEmailAlreadyInUse.current.style.display = 'none';
        };
        if(displayName) {
            displayNameBorder.current.style.border = '';
            errorMessageEnterUsername.current.style.display = 'none';
        };
        if(password) {
            passwordBorder.current.style.border = '';
            errorMessageEnterPassword.current.style.display = 'none';
        };
        if(confirmPassword) {
            confirmPasswordBorder.current.style.border = '';
            errorMessageEnterConfirmPassword.current.style.display = 'none';
            errorMessagePasswordMissMatch.current.style.display = 'none';
            errorMessagePasswordWeak.current.style.display = 'none';
        };
    });


    const handleContinue = async () => {
        try {
            if(!email.trim()){
                emailBorder.current.style.border = 'red solid';
                emailBorder.current.focus();
                errorMessageEnterEmail.current.style.display = 'block';
                console.log("No password provided");
                return;
            };
            if(!/^\S+@\S+\.\S+$/.test(email.trim())){
                emailBorder.current.style.border = 'red solid';
                emailBorder.current.focus();
                errorMessageInvalidEmail.current.style.display = 'block';
                console.log("Email not valid");
                return;
            };
            const alreadyExists = await fetchSignInMethodsForEmail(auth, email);
            if (alreadyExists.length > 0) {
                emailBorder.current.style.border = 'red solid';
                emailBorder.current.focus();
                errorMessageEmailAlreadyInUse.current.style.display = 'block';
                console.log("Email already in use");
                return;
            };

        } catch (error){
            console.error("Error", error);
        };
        setRegisterPageOne(true);
    };
    
    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            if(!displayName.trim()){
                displayNameBorder.current.style.border = 'red solid';
                displayNameBorder.current.focus();
                errorMessageEnterUsername.current.style.display = 'block';
                console.log("No username provided");
                return;
            }

            if(!password.trim()){
                passwordBorder.current.style.border = 'red solid';
                passwordBorder.current.focus();
                errorMessageEnterPassword.current.style.display = 'block';
                errorMessageEnterUsername.current.style.display = 'none';
                console.log("No password provided");
                return;
            };

            if (!confirmPassword.trim()) {
                confirmPasswordBorder.current.style.border = 'red solid';
                confirmPasswordBorder.current.focus();
                errorMessageEnterConfirmPassword.current.style.display = 'block';
                errorMessageEnterPassword.current.style.display = 'none';
                console.log("No password provided");
                return;
            };
  
            if (password.trim() !== confirmPassword.trim()) {
                confirmPasswordBorder.current.style.border = 'red solid';
                confirmPasswordBorder.current.focus();
                errorMessagePasswordMissMatch.current.style.display = 'block';
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
            //   navigate("/");
            }
        }
        catch (error: any) {
            console.error("error", error.code);
            switch (error.code) {
                case 'auth/weak-password':
                    passwordBorder.current.style.border = 'red solid';
                    passwordBorder.current.focus();
                    confirmPasswordBorder.current.style.display = 'block';
                    errorMessagePasswordWeak.current.style.display = 'block';
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
        <InputContainer  className="form-floating mb-3">
            <Input type="email"
                className="form-control" 
                id="floatingInput" 
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
                ref={emailBorder}>
            </Input>
        <Label htmlFor="floatingInput">Email<SpanAsterisk> &#42;</SpanAsterisk></Label>
  
        <ErrorMessage ref={errorMessageEnterEmail}>Please enter email.</ErrorMessage>
        <ErrorMessage ref={errorMessageInvalidEmail}>Please provide valid email.</ErrorMessage>
        <ErrorMessage ref={errorMessageEmailAlreadyInUse}>Email already in use.</ErrorMessage>

        </InputContainer>
        <ButtonContainer>
            <StyledButton as={Button}
                className="btn btn-secondary w-100"
                type="submit"
                onClick={handleContinue}>
                    Continue
            </StyledButton>
        </ButtonContainer>
  
        </>
        )
            :
        (
        <>
        <ArrowBack onClick={() => setRegisterPageOne(false)}>&#8592;</ArrowBack>
        <H5>Create your username and password</H5>
        <InputContainer className="form-floating mb-3">
            <Input type="text" 
                className="form-control" 
                id="floatingInput"
                name="name"
                placeholder="Username"
                value={displayName}
                ref={displayNameBorder}
                onChange={(e) => setDisplayName(e.target.value)}>
            </Input>
            <Label htmlFor="floatingInput">Username<SpanAsterisk> &#42;</SpanAsterisk></Label>
       
            <ErrorMessage ref={errorMessageEnterUsername}>Please enter a username.</ErrorMessage>

        </InputContainer>
        <InputContainer className="form-floating mb-3">
            <Input type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                name="password"
                value={password}
                ref={passwordBorder}
                onChange={(e) => setPassword(e.target.value)} 
                required>
            </Input>

            <ErrorMessage ref={errorMessageEnterPassword}>Please enter a password.</ErrorMessage>

     
            <Label htmlFor="floatingPassword">Password<SpanAsterisk> &#42;</SpanAsterisk></Label>
        </InputContainer>
        <InputContainer className="form-floating mb-3">
            <Input type="password" 
                className="form-control" 
                id="floatingConfirmPassword" 
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                ref={confirmPasswordBorder}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required>
            </Input>
            <Label htmlFor="floatingConfirmPassword">Confirm Password<SpanAsterisk> &#42;</SpanAsterisk></Label>
       
            <ErrorMessage ref={errorMessageEnterConfirmPassword}>Please enter again to confirm.</ErrorMessage>
            <ErrorMessage ref={errorMessagePasswordMissMatch}>Passwords don't match.</ErrorMessage>
            <ErrorMessage ref={errorMessagePasswordWeak}>Password should be at least 6 characters</ErrorMessage>

        </InputContainer>

        <ButtonContainer>
            <StyledButton as={Button}
                className="btn btn-secondary w-100"
                type="submit" 
                onClick={onSubmit}>
                    Create Account
            </StyledButton>
        </ButtonContainer>
        </>
        )}
        </>
    );
};

const ErrorMessage = styled.p`
    font-size: 12px;
    font-family: sans-serif;
    display: none;
    color: red;
    padding: 5px 0 0 5px;
`;


const ArrowBack = styled.button`
    background: none;
    border: none;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    font-size: 25px;
    color: #525252;
    margin-left: 10px;
    &:hover {
        background-color: #e7e7e7;
        cursor: pointer;
    };
    &:focus {
        background-color: #ababab;
    };
`;

const H5 = styled.h5`
    margin: 20px 0 50px 0;   
    text-align: center;
`;

const InputContainer = styled.div`
    margin: auto;
    width: 300px;
`;

const Label = styled.label`
    margin-top: 2px;
    color: #808080;
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
    margin-top: 30px;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.div`
    font-size: 14px;
    height: 39px;
    width: 222px !important;
    border-radius: 2px;
`;

const FirebaseAuthContainer = styled.section`
    margin-top: 50px;
    margin-bottom: 25px;
`;


export default SignUp;