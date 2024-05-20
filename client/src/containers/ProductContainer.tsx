import React from 'react';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { getProducts } from '../services/api_products';

const ProductContainer = () => {
    const [products, setProducts] = useState<Product[]>([]);

    type Image = {
        image_url: string;
    };
    
    type Product = {
        id: number;
        name: string;
        description: string;
        price: string;
        images: Image[];
    };

    useEffect(() => {
        fetchProducts()
    },[])

    const fetchProducts = async () => {
        try {
            const results = await getProducts();
            setProducts(results);
        } catch (error){
            console.error('Error fetching data', error);
        };
    };

    return(
        <Container>
            {products.map((product, index) => {
                return <ProductCard key={index}>
                    {product.images.length > 0 && (
                        <ImageWrapper>
                            <Image src={product.images[0].image_url}></Image>
                        </ImageWrapper>
                    )}
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductName>{product.price}</ProductName>
                </ProductCard>
            })}
        </Container>
    );
}


const ProductName = styled.h6`
    padding: 15px;
`;

const ProductDescription = styled.h6`
    padding-left: 15px;
`;

const Image = styled.img`
    height: 250px;
    width: 250px;  
    float: left;
    border-radius: 7px 7px 0 0;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
    };
`;

const ImageWrapper = styled.div`
    overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: fit-content;
    margin-left: 25px;
    width: 75vw;
`;

const ProductCard = styled.div`
    border-radius: 7px;
    background-color: white;
    height: 500px;
    margin-bottom: 15px;
    padding: 0px;
    width: 250px;
    overflow: hidden;
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    };
`;


export default ProductContainer;