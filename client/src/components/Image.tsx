import React from 'react';
import styled from "styled-components";


interface Props {
    src: string;
    alt: string;
}

export const Image = (props: Props) => {

    const {src, alt} = props;

    return (
      <div>
        <Img src={src} alt={alt} />
      </div>
    )
};

const Img = styled.img`
    height: 150px;
    width: 100px;  
`;