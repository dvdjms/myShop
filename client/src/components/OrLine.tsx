import styled from "styled-components";


export const OrLine = () => {

    return (
        <>
        <LineContainer>
            <LineBox><Hr></Hr></LineBox>
                <OrBox>OR</OrBox>
            <LineBox><Hr></Hr></LineBox>
        </LineContainer>
        </>
    );
};


const LineContainer = styled.div`
    height: 50px;
    width: 300px;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 10px;
`;

const LineBox = styled.div`
  width: 40%;
  height: 30px;
`;

const OrBox = styled(LineBox)`
  color: #6e6e6e;
  font-size: 12px;
  padding-top: 7px;
  text-align: center;
  width: 20%;
`;

const Hr = styled.hr`
  border-top: #909090 .5px solid;
  opacity: 1;
`;

