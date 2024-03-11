import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Image } from '../components/Image';
import { getImages, uploadImage, deleteImage } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { ImageDropzone } from '../components/ImageDropzone';
// import Dropzone from 'react-dropzone';

const ImageContainer = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string | null>('');
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        fetchImages();
    },[])

    const fetchImages = async () => {
        try {
            const results = await getImages();
            setImageUrls(results);
        } catch (error){
            console.error('Error fetching data', error);
        };
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        };
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("description", description ?? '');
            await uploadImage(formData);
            console.log('This', formData)
            fetchImages();
        };
    };

    // this is not the correct method. Slicing the string is incorrect as string length may change
    const popUpDelete = (image: String) => {
        const images = image.slice(28)
        const formDataDelete = new FormData
        formDataDelete.append("url", images)
        deleteImage(formDataDelete);
    };


    return (
        <>
        {isAuthenticated ? 
        (<>
        <ImageDropzone fetchImages={fetchImages}/>
 

        <FormContainer>
            <input onChange={handleFileChange} type="file" id="file" name="img" accept="image/*"></input>
            <input onChange={(e) => setDescription(e.target.value)} type="text" name="description"/>
            <button onClick={handleUpload} type="button">Submit image</button>
        </FormContainer>
        </>
        ) : ( <></> )
        }

        <ImageContainerMain>
            <GalleryItem>
                {imageUrls.map((imageUrl: any, index) => 
                    <a key={index} href={imageUrl.url} onContextMenu={(e) => popUpDelete(imageUrl.url)} >
                        <Image src={imageUrl.url} alt={`image ${imageUrl.description}`} />
                    </a>
                )}
            </GalleryItem>
        </ImageContainerMain>
        </>
    )

};


const FormContainer = styled.form`
    height: 70px;
`;

const ImageContainerMain = styled.main`
    height: fit-content;
    margin: auto;
    width: 77%;
`;

const GalleryItem = styled.div`
    border: red solid;
    height: 100vh;
`;

// const DropBox = styled.div`
//     height: 100px;
//     width: 100px;
//     border: #ff0000 solid;

// `;

export default ImageContainer;