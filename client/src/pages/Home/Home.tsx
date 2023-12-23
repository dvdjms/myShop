import React, { useState } from 'react';
import { auth } from '../../config/Firebase';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import ImageContainer from '../../containers/ImageContainer';


const Home = () => {
    const { isAuthenticated } = useAuth();
    const [products, setProducts] = useState<string[]>([]);


    const getData = () => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                let token = await user.getIdToken();
                fetch('http://127.0.0.1:8000/api/products/', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    } 
                })
                .then((response) => response.json())
                .then((JsonResponse) => {
                    let data = JsonResponse.results;
                    setProducts(data);
                });
            };
        });
    };


   
    return (
        <>

            <Header>
                <h3>Home</h3>
                <button onClick={getData}>Get data</button>
            </Header>
            <HomePage>

                {isAuthenticated ? (
                    <ul>
                    {products.map((product: any, index) => {
                    
                        return <li key={index}>{product.product} {product.price}</li>;
                    })}
                    </ul>
                    ) : (
                       <></>
                    )}

            <ImageContainer />

            </HomePage>
        </>
    )
}
 
const Header = styled.header`
    padding: 70px 0 10px 70px;
`


const HomePage = styled.main`
    padding-left: 70px;
    height: fit-content;
    min-height: 110vh;
    position: relative;
`;

export default Home;

