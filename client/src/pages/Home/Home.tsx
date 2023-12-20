import React, { useState } from 'react';
import { auth } from '../../config/Firebase';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Image } from '../../components/Image';


const Home = () => {
    const { isAuthenticated } = useAuth();
    const [products, setProducts] = useState<string[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);


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

    const getImages = async () => {
        fetch('http://127.0.0.1:8000/api/images/', {
            method: "GET",
        }).then(response => response.json())
        .then((JsonResponse) => {
            let data = JsonResponse.results;
            const paths = data.map((item: { path: any; }) => item.path)
            setImageUrls(paths);
        } ).catch(error => console.error('error', error))
        };
  

   
    return (
        <HomePage>
            <div>

        <h3>Home</h3>

            </div>
 
        <div>
        <button onClick={getData}>Get data</button>

            {isAuthenticated ? (
       
                <ul>
                {products.map((product: any, index) => {
                
                    return <li key={index}>{product.product} {product.price}</li>;
                })}
                </ul>
                ) : (
                    <p></p>
                )}

        </div>

        <div>

        <button onClick={getImages}>Get data</button>
       
                <div>
                {imageUrls.map((imageUrl: any, index) => 
                     <Image key={index} src={imageUrl} alt={`image ${index}`}/>
                )}
                </div>

        </div>

        
        </HomePage>
    )
}
 


const HomePage = styled.main`
    height: 100vh;
    padding: 70px 0 0 40px;
`;

export default Home;

