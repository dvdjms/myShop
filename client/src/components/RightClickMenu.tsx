import React from "react";
import styled from "styled-components";
import { deleteImage } from '../services/api';
import { useNavigate } from "react-router-dom";

interface Props {
    isVisible: boolean;
    position: { x: number; y: number };
    image_id: number;
    imageUrl: string;
    onMenuItemClick: (item: any) => void;
    deleteImageState: (item: any) => void;
};

export const RightClickMenu: React.FC<Props> = ({ isVisible, position, image_id, imageUrl, onMenuItemClick, deleteImageState }) => {
    
    let navigate = useNavigate();

    const menuItem = [
        {
            text: 'View image',
            onClick: () => {
                // this is not ideal
                navigate(window.location.href = imageUrl);
            }
        },
        {
            text: 'View user',
            onClick: () => {
                alert("view user button " + image_id);
                onMenuItemClick(image_id);
            }
        },
        {
            text: 'Delete',
            onClick: () => {
                deleteImage(image_id);
                onMenuItemClick(image_id);
                deleteImageState(image_id);
            }
        },
    ];


    return (
        <Rightclick
            style={{ left: position.x, top: position.y }}
        >
            <ul>
                {menuItem.map((item, index) => (
                    <List key={index} onClick={item.onClick} >                        
                        {item.text}
                    </List>
                ))}
            </ul>
        </Rightclick>
    );
};


const Rightclick = styled.div`
    background: gray;
    border: none;
    border-radius: 5px;
    width: 130px;
    height: fit-content;
    font-size: 16px;
    color: #525252;
    margin-left: 10px;
    z-index: 100;
    position: absolute;
`;


const List = styled.li`
    border-radius: 5px;
    padding: 5px;
    &:hover {
        background-color: #e7e7e7;
        cursor: pointer;
    };
    &:focus {
        background-color: #ababab;
    };
`;


