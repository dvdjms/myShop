import React from 'react';
import { auth } from '../config/Firebase';
import styled from 'styled-components';


const Home = () => {

    const getData = () => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                let token = await user.getIdToken();
                fetch('http://127.0.0.1:8000/products/', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    } 
                })
                .then((response) => response.json())
                .then((JsonResponse) => {
                    console.log(JsonResponse)
                })
            }
        })

    }

   
    return(
        <HomePage>
 
            <h1>
                Welcome Home 
            </h1>
 
            <div>
                <button onClick={getData}>Get data</button>
            </div>


        </HomePage>
    )
}
 


const HomePage = styled.div`
    height: 500px;
    /* margin: 0px; */

`

export default Home;