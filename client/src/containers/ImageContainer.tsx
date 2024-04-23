import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Image } from '../components/Image';
import { getImages, uploadImage } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { ImageDropzone } from '../components/ImageDropzone';
import { RightClickMenu } from '../components/RightClickMenu';


const ImageContainer = () => {
    const [imageUrls, setImageUrls] = useState<{id: number; url: string; description: string}[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string | null>('');
    const {isAuthenticated} = useAuth();


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
            fetchImages();
        };
    };

    const [menuStates, setMenuStates] = useState<{[key: number]: { isVisible: boolean; position: { x: number; y: number } }}>({});
    
    const handleRightClick = (e: React.MouseEvent<HTMLImageElement>, image_id: number) => {
        e.preventDefault();
        const newPosition = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY};
        setMenuStates(prevState => ({
            ...Object.fromEntries(Object.entries(prevState).map(([key, value]) => [key, { isVisible: false, position: { x: 0, y: 0 } }])),
            [image_id]: { isVisible: !prevState[image_id]?.isVisible, position: newPosition }
        }));
    };
    
    // eslint-disable-next-line
    const handleMenuItemClick = (image_id: number) => {
        setMenuStates(prevState => ({
            ...prevState,
            [image_id]: { isVisible: false, position: { x: 0, y: 0 } }
        }))
    };

    const handleDelete = (deletedImageId: number) => {
        setImageUrls(prevImages => prevImages.filter(image => image.id !== deletedImageId));
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const clickedElement = event.target as HTMLElement;
            const isClickInsideMenu = clickedElement.closest('.menu');
    
            if (!isClickInsideMenu) {
                setMenuStates(prevState => {
                    const updatedMenuStates = {...prevState};
                    for (const menuId in updatedMenuStates) {
                        updatedMenuStates[menuId].isVisible = false;
                    }
                    return updatedMenuStates;
                });
            }
        };
    
        window.addEventListener('click', handleClick);
    
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [menuStates]);


    useEffect(() => {
        fetchImages();
    },[]);

    
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
                    <div key={index}>
                        <Image 
                            src={imageUrl.url} 
                            alt={imageUrl.description} 
                            onRightClick={(e) => handleRightClick(e, imageUrl.id)}
                        />
                        {menuStates[imageUrl.id]?.isVisible && (
                            <RightClickMenu 
                                isVisible={menuStates[imageUrl.id].isVisible}
                                position={menuStates[imageUrl.id].position} 
                                onMenuItemClick={() => handleMenuItemClick(imageUrl.id)}
                                image_id={imageUrl.id}
                                imageUrl={imageUrl.url}
                                deleteImageState={(imageId) => handleDelete(imageId)}
                            />
                        )}
                    </div> 
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
    // border: red solid;
    height: 100vh;
`;

// const DropBox = styled.div`
//     height: 100px;
//     width: 100px;
//     border: #ff0000 solid;

// `;

export default ImageContainer;