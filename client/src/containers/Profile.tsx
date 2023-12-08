import React from 'react';
import styled from 'styled-components';

import { useUser } from '../contexts/UserContext';

const Profile = () => {
    const { username, email, uid } = useUser();

    if(!username) {
        return <p>Loading...</p>;
    }

    return(
         <>
            <H2>
                Profile
            </H2>
 
            <UserDetails>
                <p>User name: {username}</p>
                <p>User email: {email}</p>
                <p>User ID: {uid}</p>
            </UserDetails>

        </>

    )
}

const H2 = styled.h2`
      color: blue;
`;

const UserDetails = styled.div`
    margin-top: 50px;
    padding-left: 50px;
    height: 100vh;
`;

export default Profile;