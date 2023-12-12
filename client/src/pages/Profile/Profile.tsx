import React from 'react';
import styled from 'styled-components';

import { useUser } from '../../contexts/UserContext';

const Profile = () => {
    const { username, email} = useUser();

    if(!username) {
        return <Section><p>Loading...</p></Section>
    };


    return(
         <>
        <Section>
            <H2>
                Profile
            </H2>

            <UserDetails>
                <p>User name: {username}</p>
                <p>User email: {email}</p>
                <p>Address:</p>
            </UserDetails>
        </Section>
        </>

    );
};

const Section = styled.section`
    padding: 80px 0 0 50px;
    height: 100vh;
`;


const H2 = styled.h2`
      color: blue;
`;

const UserDetails = styled.div`
    margin-top: 50px;
    padding-left: 50px;
    height: 100vh;
`;

export default Profile;