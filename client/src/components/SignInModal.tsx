import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import StyledFirebaseAuth from '../config/FirebaseAuth';
import { uiConfig } from "../config/Firebase";
import { auth } from '../config/Firebase';
// import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';

function SignInModal() {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const firebaseAuth = auth;
    
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}></StyledFirebaseAuth>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    
}


export default SignInModal;