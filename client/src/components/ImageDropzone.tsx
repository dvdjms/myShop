import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from "styled-components";
import { uploadImage } from '../services/api';


interface Props {
    fetchImages: Function;
};

export const ImageDropzone = (props: Props) => {

    const onDrop = useCallback(async (acceptedFiles: any) => {
        if (acceptedFiles) {
            console.log('accepted file', acceptedFiles)
            try {
                const formData = new FormData();
                formData.append("file", acceptedFiles[0]);
                formData.append("description", "Image description");
                await uploadImage(formData);
                props.fetchImages();
            }
            catch (error){
                console.log("Error", error)
            }
        };
    },[props])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
        <Paragraph1>Drag an image here, or click to upload a file</Paragraph1> 
        <DropContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <>
                <DropBoxActive>

                <Paragraph2>Drop the files here ...</Paragraph2>
    
                </DropBoxActive>
                </>
                :
                <>
                <DropBoxInactive />
                </>
            }
        </DropContainer>
        </>
    )
};

const Paragraph1 = styled.p`
    text-align: center;
    width: 100%;
`;

const Paragraph2 = styled(Paragraph1)`
    color: grey;
`;

const DropBoxInactive = styled.div`
    height: 70%;
    width: 70%;
    border: #fbedba solid;
    border-radius: 15px;
    margin: auto;
`;

const DropBoxActive = styled(DropBoxInactive)`
    border: #bfa454 solid;
    background-color: #e3e2e2;
`;

const DropContainer = styled.section`
    height: 15vh;
    width: 50%;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    position: relative;
    border: #e1bb75 solid;
    border-radius: 10px;
    cursor: pointer;
`;
