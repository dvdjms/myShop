import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../components/Image';
import { getImages } from '../services/api';
import { auth } from '../config/Firebase';
// import { uploadImage } from '../services/api';


const ImageContainer = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string | null>('');


    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };


    const handleImages = async () => {
        try {
            const results = await getImages();
            setImageUrls(results);
        }catch (error){
            console.error('Error fetching data', error);
        };
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        };
    };

    const handleUpload = async () => {
        const user = auth.currentUser || '';
        if(!user){
            return "not signed in";
        }
        const token = await user.getIdToken();
        if (file) {
            console.log("Uploading file...");
            const formData = new FormData();
            formData.append("file", file);
            formData.append("description", description ?? '');
            const url = 'http://127.0.0.1:8000/api/images/';
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData
                })
                const data = await response.json();
                console.log("data", data);

            } catch (error) {
                console.error('Error uploading image', error);
                throw error;
            };
        };
    };


    return (
        <>
        <Button onClick={handleImages}>Get data</Button>
        <ImageUploadContainer>
            <input onChange={handleFileChange} type="file" id="file" name="img" accept="image/*"></input>
            <input onChange={handleDescriptionChange} type="text" name="description"/>
            <button onClick={handleUpload} type="button">Submit image</button>
        </ImageUploadContainer>



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
const ImageUploadContainer = styled.form`
    height: 70px;
`
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