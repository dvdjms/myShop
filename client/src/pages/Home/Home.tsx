import React from 'react';
import styled from 'styled-components';
import CategoryContainer from '../../containers/CategoryContainer';
import ProductContainer from '../../containers/ProductContainer';


const Home = () => {



   
    return (
        <>
            <Header>
  
            </Header>
            <HomePage>
                <ShopContainer>
                    <CategoryContainer />
                    <ProductContainer />
                </ShopContainer>
            </HomePage>
        </>
    )
}
 
const Header = styled.header`
    padding: 70px 0 10px 70px;
`;

const ShopContainer = styled.section`
    margin: 70px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1f1;
`;


const HomePage = styled.main`
    height: fit-content;
    min-height: 110vh;
    position: relative;
`;

export default Home;

