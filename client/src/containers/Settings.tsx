import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import styled from "styled-components";


const Settings = () => {
    const { isAuthenticated } = useAuth();
    const {  email } = useUser();

    if(!email) {
        return <p>Loading...</p>;
    }
    return(
        <>
        <Section>
            {isAuthenticated ? 
            ( 
                <h3>Settings</h3>
            )
            :
            (
                <h3>Not authenticated</h3>
            )}
        </Section>
        </>
    )
}
 
const Section = styled.section`
    padding: 80px 0 0 50px;
    height: 100vh;
`;


export default Settings;