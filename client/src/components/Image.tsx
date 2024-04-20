import React from 'react';
import styled from "styled-components";

interface Props {
    src: string;
    alt: string;
    onRightClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export const Image = (props: Props) => {

    const {src, alt, onRightClick} = props;


    return (
      <div>
        <Img src={src} alt={alt} onContextMenu={onRightClick}/>
      </div>
    )
};

const Img = styled.img`
    height: 150px;
    width: 100px;  
    float: left;
    margin: 5px;
`;