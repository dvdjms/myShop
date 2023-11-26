import React, { useState } from 'react';
import { auth } from '../config/Firebase';
import styled from 'styled-components';
import { getUserDetails } from '../services/api'


const Home = () => {


    const [userID, setUserID] = useState<string>("")

    const getUser = async () => {
        try {
            const user = await getUserDetails();
            console.log('that', user)
            if(typeof user === 'string'){
                setUserID(user);
            } else {
                console.error('Invalid user details', user);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
          }
    }


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
                Welcome Home, {userID}
            </h1>
 
            <div>
                <button onClick={getData}>Get data</button>
            </div>
            <div>
                <button onClick={getUser}>Get user</button>
            </div>


        </HomePage>
    )
}
 


const HomePage = styled.div`
    height: 500px;
    /* margin: 0px; */

`

export default Home;