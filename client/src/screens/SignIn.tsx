import React, {useState, useRef, useEffect} from 'react';
import { auth, signInWithEmailAndPassword, uiConfig } from '../config/Firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import styled from "styled-components";
import { OrLine } from '../components/OrLine';
import { signInUserFetch } from '../services/api';
import { BigButton } from '../components/BigButton';
import { InputPassword } from '../components/InputPassword';


const SignIn: React.FC = () =>  {
    const firebaseAuth = auth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailBorder = useRef<any>();
    const passwordBorder = useRef<any>();
    const errorMessageInvalidEmail = useRef<any>();
    const errorMessageNotRegistered = useRef<any>();
    const errorMessageEnterPassword = useRef<any>();
    const errorMessageIncorrectPassword = useRef<any>();
    const errorMessageTooManyRequests = useRef<any>();

    // const [passwordError, setPasswordError] = useState<boolean>(false);


    useEffect(() => {
        if(email){
            emailBorder.current.style.border = '';
            errorMessageNotRegistered.current.style.display = 'none';
            errorMessageInvalidEmail.current.style.display = 'none';
        };
        if(password){
            passwordBorder.current.style.border = '';
            errorMessageIncorrectPassword.current.style.display = 'none';
            errorMessageEnterPassword.current.style.display = 'none';
            errorMessageTooManyRequests.current.style.display = 'none';
        };
    });


    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(!/^\S+@\S+\.\S+$/.test(email.trim())){
            emailBorder.current.style.border = 'red solid';
            emailBorder.current.focus();
            errorMessageInvalidEmail.current.style.display = 'block';
            console.log("Email not valid");
            return;
        }

        if(!password.trim()){
            passwordBorder.current.style.border = 'red solid';
            passwordBorder.current.focus();
            errorMessageEnterPassword.current.style.display = 'block';
            errorMessageIncorrectPassword.current.style.display = 'none';
            errorMessageTooManyRequests.current.style.display = 'none';
            console.log("No password provided")
            return;
        }

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
                    emailBorder.current.style.border = 'red solid';
                    emailBorder.current.focus();
                    errorMessageNotRegistered.current.style.display = 'block';
                    console.log("Email not registered");
                    break;
                case 'auth/user-not-found':
                    emailBorder.current.style.border = 'red solid';
                    emailBorder.current.focus();
                    errorMessageNotRegistered.current.style.display = 'block';
                    console.log("Email not registered");
                    break;
                case 'auth/wrong-password':
                    passwordBorder.current.style.border = 'red solid';
                    passwordBorder.current.focus();
                    errorMessageIncorrectPassword.current.style.display = 'block';
                    errorMessageTooManyRequests.current.style.display = 'none';
                    console.log("Password incorrect");
                    break;
                case 'auth/too-many-requests':
                    passwordBorder.current.style.border = 'red solid';
                    emailBorder.current.style.border = 'red solid';
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
        <InputContainer className="form-floating mb-3">
            <Input type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordBorder} 
                required>
            </Input>
            <Label htmlFor="floatingPassword">Password<SpanAsterisk> &#42;</SpanAsterisk></Label>
      
            <ErrorMessage ref={errorMessageEnterPassword}>Please provide a password.</ErrorMessage>
            <ErrorMessage ref={errorMessageIncorrectPassword}>Incorrect password.</ErrorMessage>
            <ErrorMessage ref={errorMessageTooManyRequests}>Too many requests. Try again later.</ErrorMessage>

        </InputContainer>

        {/* <InputPassword 
            hasError={passwordError} 
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordBorder}
            title="Passworddd"
            value={password} /> */}

        <BigButton title="Sign In" onClick={onSubmit} />
        
        <ResetPassword>Forgot password?</ResetPassword>
        </> 
    );
};


const ResetPassword = styled.p`
    padding: 30px 0 0 55px;
    font-size: 12px;
    width: 50%;
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

const FirebaseAuthContainer = styled.section`
    margin-top: 50px;
    margin-bottom: 25px;
`;


export default SignIn;