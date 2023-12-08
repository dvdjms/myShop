import React, {useState} from 'react';
import { uiConfig } from "../config/Firebase";
import { auth } from '../config/Firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import { OrLine } from './OrLine';
import { signInUserFetch } from '../services/api';


const SignIn: React.FC = () =>  {
    const firebaseAuth = auth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
        catch (signInError) {
            if (signInError){
                console.error(signInError, "invalid email");
            }

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
                required>
            </Input>
        <Label htmlFor="floatingInput">Email<SpanAsterisk> &#42;</SpanAsterisk></Label>
        </InputContainer>
        <InputContainer className="form-floating mb-3">
            <Input type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required>
            </Input>
            <Label htmlFor="floatingPassword">Password<SpanAsterisk> &#42;</SpanAsterisk></Label>
      </InputContainer>

        <ButtonContainer>
            <StyledButton as={Button}
                className="btn btn-secondary w-100"
                type="submit" 
                onClick={onSubmit}>
                    Sign in
            </StyledButton>
        </ButtonContainer>
        </> 
    );
};


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



export default SignIn;