import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../config/Firebase";
import { signInUserFetch } from '../services/api';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

const SignInWithEmail: React.FC = () => {

  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await updateProfile(userCredential.user, { displayName });
          const user_token = await user.getIdToken();
          const display_name = userCredential.user?.displayName || '';
          const userUID = userCredential.user?.uid || '';
          const userEmail = userCredential.user?.email || '';
  
          if(user_token) {
              signInUserFetch(user_token, userUID, display_name, userEmail);
              navigate("/");
          }
      }
      catch (error) {
          console.error("error", error);
      };
  };


  return (
    <>
    <FormContainer>
    <LineContainer>
        <LineBox><Hr></Hr></LineBox>
          <OrBox>OR</OrBox>
        <LineBox><Hr></Hr></LineBox>
      </LineContainer>
      <InputContainer className="form-floating mb-3">
        <Input type="text" 
          className="form-control" 
          id="floatingInput"
          name="name"
          placeholder="Username"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}>
        </Input>
        <Label htmlFor="floatingInput">Username<SpanAsterisk> &#42;</SpanAsterisk></Label>
      </InputContainer>
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
        <Input type="password" className="form-control" id="floatingPassword" placeholder="Password"></Input>
          <Label htmlFor="floatingPassword">Password<SpanAsterisk> &#42;</SpanAsterisk></Label>
      </InputContainer>
      <InputContainer className="form-floating mb-3">
        <Input type="password" 
          className="form-control" 
          id="floatingConfirmPassword" 
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required>
          </Input>
        <Label htmlFor="floatingConfirmPassword">Confirm Password<SpanAsterisk> &#42;</SpanAsterisk></Label>
      </InputContainer>

      <ButtonContainer>
        <StyledButton as={Button}
          className="btn btn-secondary w-100"
          type="submit" 
          onClick={onSubmit}>
            Continue
        </StyledButton>
      </ButtonContainer>

    </FormContainer>
    </>
  );
};


const FormContainer = styled.form`
  margin: auto;
  height: 300px;
`;

const InputContainer = styled.div`
  margin: auto;
  width: 300px;
`;

const Label = styled.label`
  margin-top:2px;
  color: gray;
  font-size: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI','Open Sans', 'Helvetica Neue', sans-serif;
`;

const Input = styled.input`
  &:focus {
    box-shadow: rgb(116, 116, 116) 0 0 7px 1px !important;
    border: none;
  }
`;

const ButtonContainer = styled.div`
  padding: 0 50px 0 50px;
  margin-top: 30px;
  display:flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  font-size: 14px;
  height: 39px;
  width: 222px !important;
  border-radius: 2px;

`;

const LineContainer = styled.div`
  height: 70px;
  width: 300px;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const LineBox = styled.div`
  width: 40%;
  height: 30px;
  /* margin-top: 25px; */
`;

const OrBox = styled(LineBox)`
  color: #6e6e6e;
  font-size: 14px;
  padding-top: 4px;
  text-align: center;
  width: 20%;
`;

const Hr = styled.hr`
  border: #909090 .5px solid;
  opacity: 1;
`;

const SpanAsterisk = styled.span`
  color: #a50016;
;`

export default SignInWithEmail;
