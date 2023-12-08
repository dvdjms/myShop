import React, {useState, useEffect}  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Profile from './containers/Profile';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { onAuthStateChanged, auth } from './config/Firebase';
import { getUserDetails } from './services/api';
import { UserProvider } from './contexts/UserContext';
import { ModalProvider } from './contexts/ModalContext';

import SignInModal from './containers/ModalContainer';


const App: React.FC = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    onAuthStateChanged(auth, (user) => {
        if(user){
            setIsSignedIn(true);
        }
        else{
            setIsSignedIn(false);
        }
    })

    const getUser = async () => {
        try {
            const userDetails = await getUserDetails();
            if(userDetails !== undefined){
                setUserName(userDetails);
                console.log('User Signed In:', userDetails);
            }
        } catch (error) {
                console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUser();
            } else {
                console.log("User is signed out");
            };
        });
        return () => unsubscribe();
    }, []);


    return (
        // <div className="App">
        <UserProvider>
        <ModalProvider >
            <Router>
        
                <SignInModal></SignInModal>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home isSignedIn={isSignedIn} userName={userName} loading={loading}/>} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
        
            </Router>
        </ModalProvider>
        </UserProvider>
        // </div>
      );
}


export default App;