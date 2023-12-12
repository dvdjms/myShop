import React, { ChangeEvent, forwardRef, Ref } from "react";
import styled from "styled-components";

interface Props {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    title: string;
    type: string;
    value: string;
    error: boolean;
};

export const FloatingInput = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  const {title, onChange, value, type, error} = props;

    return (

        <InputContainer className="form-floating mb-3">
            <Input 
                className="form-control" 
                id="floatingInput"
                placeholder="floatingIpnut"
                name="floatingIpnut"
                type={type}
                value={value}
                onChange={onChange}
                error={error}
                ref={ref}
                required>
            </Input>
            <Label htmlFor="floatingInput">{title}<SpanAsterisk>&#42;</SpanAsterisk></Label>
        </InputContainer>
    );
});


const InputContainer = styled.div`
    margin: auto;
    width: 70%;
    margin-bottom: 0 !important;
    margin-top: 12px;
`;

const Label = styled.label`
  margin-top:2px;
  color: gray;
  font-size: 14px;
  font-family: system-ui, 'Segoe UI','Open Sans', 'Helvetica Neue', sans-serif;
`;

const Input = styled.input<{ error?: boolean}>`
    &:focus {
        box-shadow: rgb(116, 116, 116) 0 0 7px 1px !important;
        border: none;
    }
    border: ${(props) => (props.error ? "red solid" : "")};
`;

const SpanAsterisk = styled.span`
  color: #a50016;
;`

