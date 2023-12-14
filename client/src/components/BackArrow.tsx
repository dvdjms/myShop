import React, { MouseEvent } from "react";
import styled from "styled-components";


interface Props {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const BackArrow: React.FC<Props> = ({onClick}) => {

    return (
        <>
        <ArrowBack onClick={onClick}>&#8592;</ArrowBack>
        </>
    );
};


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

