
import React, { ChangeEvent, RefObject } from "react";
import styled from "styled-components";



interface Props {
    title: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    ref?: RefObject<HTMLInputElement>; 
    value: string;
    hasError?: boolean;
};

export const InputPassword = (props: Props) => {

    const {title, onChange, ref, value, hasError } = props;


    return (

        <InputContainer className="form-floating mb-3" hasError={hasError}>
            <Input type="password" 
                className="form-control" 
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={value}
                onChange={onChange}
                ref={ref}
                required>
            </Input>
            <Label htmlFor="floatingPassword">{title}<SpanAsterisk>&#42;</SpanAsterisk></Label>
        </InputContainer>
    );
};


const InputContainer = styled.div<{ hasError?: boolean}>`
    margin: auto;
    width: 300px;
    border: ${(props) => (props.hasError ? "red solid" : "1px solid #ced4da")} 
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

