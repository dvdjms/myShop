import React, { MouseEvent } from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

interface Props {
    title: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const BigButton = (props: Props) => {

    const {title, onClick} = props;

    return (
        <ButtonContainer>
            <StyledButton as={Button}
                className="btn btn-secondary w-100"
                onClick={onClick}
                type="submit">{title}
            </StyledButton>
        </ButtonContainer>
    );
};


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
