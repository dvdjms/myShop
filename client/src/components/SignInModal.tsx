import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import { uiConfig } from "../config/Firebase";
import { auth } from '../config/Firebase';
import SignInWithEmail from '../components/SignInWithEmail';
import FirebaseAuth from '../config/FirebaseAuth';
import styled from "styled-components";
import { useModal } from '../Contexts/ModalContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';


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

                <Modal.Header closeButton>
                    <Modal.Title>Sign In / Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={activeTab as string} onSelect={(k) => switchTab(k as 'signIn' | 'signUp')}>
                            <Nav.Item>
                                <Nav.Link eventKey="signIn">Sign In</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="signUp">Sign Up</Nav.Link>
                            </Nav.Item> 
                    </Tabs>
                    <TabContent>
                    {activeTab === 'signIn' && (
                    <>
                            <SignInWithEmail />
                            <FirebaseAuthContainer>
                                <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
                            </FirebaseAuthContainer>
                    </>
                    )}        
                    {activeTab === 'signUp' && (
                    <>
                        <p>Sign Up content goes here</p>
                        <SignInWithEmail />
                    </>
                    )}
                    </TabContent>
                    <SignupPage>
                        <NavLinkContiner>
                            Already have an account?{' '}
                            <NavLink to="/login" >
                                Login
                            </NavLink>
                        </NavLinkContiner>
                    </SignupPage>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={closeModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
        </Modal>
    </>
      );
}

const Tabs = styled(Nav).attrs({
      variant: 'tabs',
})`
      margin-bottom: 20px;
`;

const TabContent = styled.div`
      margin-top: 20px;
`;

const SignupPage = styled.main`
      padding: 70px 0 0 0;
`;

const FirebaseAuthContainer = styled.section`
      margin-top: 135px;
      margin-bottom: 50px;
`;

const NavLinkContiner = styled.section`
      margin-bottom: 50px;
      text-align: center;
`;

export default SignInModal;