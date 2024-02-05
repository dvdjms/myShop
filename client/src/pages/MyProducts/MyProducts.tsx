import React from 'react';
import styled from "styled-components";
import ImageContainer from '../../containers/ImageContainer';
import { ImageDropzone } from '../../components/ImageDropzone';

const MyProducts = () => {





    return (
        <Section>
            <>My Products</>
            {/* <ImageDropzone fetchImages={fetchImages}/> */}
            <ImageContainer />
        </Section>


    )


}

const Section = styled.section`
    padding-top: 70px;
    padding-left: 70px;
    height: fit-content;
    min-height: 110vh;
    position: relative;
`




export default MyProducts;