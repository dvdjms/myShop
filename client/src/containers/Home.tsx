import React, { useState } from 'react';
import { auth  } from '../config/Firebase';
import styled from 'styled-components';
import { useUser } from '../contexts/UserContext';

const Home = (props: { userName: string, loading: boolean, isSignedIn: boolean}) => {

    const [products, setProducts] = useState<string[]>([]);
    const { username } = useUser();

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

   
    return(
        <HomePage>
        <div>

            {props.loading ?  (
                <p>Loading...</p>
            ) : (
                username ? (
                    <div>
                        <p>Hello, {username}!</p>
                    </div>
                ) : (
                    <p>Signed out</p>
                )
            )}

        </div>
 
        <div>
        <button onClick={getData}>Get data</button>

            {username ? (
       
                <ul>
                {products.map((product: any, index) => {
                
                    return <li key={index}>{product.product} {product.price}</li>;
                })}
                </ul>
                ) : (
                    <p></p>
                )}

        </div>

        </HomePage>
    )
}
 


const HomePage = styled.main`
    height: 100vh;
    padding: 70px 0 0 40px;
`;

export default Home;