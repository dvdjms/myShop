import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import { auth } from '../config/Firebase';
import styled from "styled-components";
import { useModal } from '../contexts/ModalContext'; 
import SignIn from '../pages/SignInTest';/////////////////////////////////////////
import SignUp from '../pages/SignUp';
import '../index.css'


const SignInModal: React.FC = () =>  {
    const firebaseAuth = auth;
    const { isModalOpen, closeModal, modalType } = useModal();
    const [ activeTab, setActiveTab ] = useState<'signIn' | 'signUp'>(modalType || 'signIn');
    
    const switchTab = (tab: 'signIn' | 'signUp') => {
        setActiveTab(tab);
    }

    useEffect(() => {
        if (isModalOpen) {
                setActiveTab(modalType || 'signIn');
        }
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    closeModal();
                }
        });
        return () => unsubscribe();
    }, [isModalOpen, modalType, closeModal, firebaseAuth]);


    
      return (
        <>    
            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header>
                    <Tabs activeKey={activeTab as string} onSelect={(k) => switchTab(k as 'signIn' | 'signUp')}>
                        <Nav.Item>
                            <Nav.Link as={NavLink} eventKey="signIn">Sign in</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link as={NavLink} eventKey="signUp">Register</Nav.Link>
                        </Nav.Item> 
                    </Tabs>
                </Modal.Header>
                <Modal.Body as={ModalBody}>
                    <TabContent>
                    {activeTab === 'signIn' && (
                    <>
                        <SignIn />
                    </>
                    )}        
                    {activeTab === 'signUp' && (
                    <>
                        <SignUp />
                    </>
                    )}
                    </TabContent>
                </Modal.Body>

                <Modal.Footer as={Footer}>
                    <CloseButton onClick={closeModal}>&#10005;</CloseButton>
                </Modal.Footer>
        </Modal>
    </>
    );
};


const Footer = styled.div`
    border: none;
    background-color: white;
    border-radius: 0 0 15px 15px;
    height: 70px;
    padding: 20px 0 0 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    font-size: 25px;
    color: #525252;
    margin-left: 10px;
    &:hover {
        background-color: #e7e7e7;
        cursor: pointer;
    };
    &:focus {
        background-color: #ababab;
    };
`;

const ModalBody = styled.div`
    padding: 0px;
    background-color: white;
    height: 72vh;
`;

const Tabs = styled(Nav).attrs({
    variant: 'tabs',
})`
    border: none;
    width: 100%;
    & > * {
        width: 50%;
        text-align: center;
    }
`;

const TabContent = styled.div`
    margin-top: 10px;
    height: 60vh;
`;

const NavLink = styled.a`
    background-color: #e7e7e7;
    color: #727272;
    border-color: #727272;
    &:hover {
        cursor: pointer;
        color: #040404;
    };
    &:active {
        color: #000000;
    }
`;


export default SignInModal;