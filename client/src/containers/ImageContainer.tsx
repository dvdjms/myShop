import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../components/Image';
import { getImages } from '../services/api';


const ImageContainer = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleImages = async () => {
        try {
            const results = await getImages();
            setImageUrls(results);
        }catch (error){
            console.error('Error fetching data', error);
        };
    };


    return (
        <>
        <Button onClick={handleImages}>Get data</Button>
        <ImageContainerMain>
            <GalleryItem>
                {imageUrls.map((imageUrl: any, index) => 
                        <Image key={index} src={imageUrl.url} alt={`image ${imageUrl.description}`}/>
                )}
            </GalleryItem>
        </ImageContainerMain>
        </>
    )

};

const ImageContainerMain = styled.main`
    display: grid;
    width: 80%;
    border: red solid;
`;

const GalleryItem = styled.div`


`;

const Button = styled.button`
    width: 85px;
`;


export default ImageContainer;