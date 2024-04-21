import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from "styled-components";
import { uploadImage } from '../services/api';
import upload_logo from '../assets/upload.png'
import drag_logo from '../assets/dragImageLogo.png'

interface Props {
    fetchImages: Function;
};

export const ImageDropzone = (props: Props) => {
    const [showAlert, setShowAlert] = useState<Boolean>(false)

    const onDrop = useCallback(async (acceptedFiles: any) => {
        if (acceptedFiles) {
            if (acceptedFiles[0].size > 524288) {
                return (
                    console.log("File too large"),
                    setShowAlert(true),
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 3000)
                );
            }
            else {
                console.log('accepted file', acceptedFiles[0].size)
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
        };
    },[props])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
        <DropContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <>
                <DropBoxActive>
                    <Paragraph2>Drop the files here ...</Paragraph2>
                    <Logo src={upload_logo} alt="upload logo"/>
                </DropBoxActive>
                </>
                :
                <>
                <DropBoxInactive>
                    <Paragraph1>Drag an image here, or click to upload a file</Paragraph1> 
                    <Logo src={drag_logo} alt="drag logo"/>
                </DropBoxInactive>
                </>
            }
        </DropContainer>
        {showAlert ? <div><p>File too large</p></div> : <></>}
        </>
    )
};

const DropContainer = styled.section`
    height: 170px;
    width: 310px;
    margin: auto;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-bottom: 20px;
`;

const Paragraph1 = styled.p`
    color: #404040;
    height: 27px;
    margin-bottom: 22px;
    margin-top: 7px;
    text-align: center;
    width: 100%;
`;

const Paragraph2 = styled(Paragraph1)`
    color: grey;
    margin-top: 25px;
    margin-bottom: 10px;
`;

const DropBoxInactive = styled.div`
    height: 100%;
    padding: 10px;
    width: 100%;
    position: absolute;
    border: #989898 solid;
    border-radius: 10px;
`;

const DropBoxActive = styled(DropBoxInactive)`
    border-style: dashed;
    background-color: #f3f2f2;
    border-radius: 10px;
`;

const Logo = styled.img`
    height: 70px;
    width: 70px;
    opacity:.6;
    display: block;
    margin: auto;
`;



