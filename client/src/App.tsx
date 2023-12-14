import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Settings from './pages/Settings/Settings';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ModalProvider } from './contexts/ModalContext';
import SignInModal from './containers/ModalContainer';


const App: React.FC = () => {


    return (
        // <div className="App">
        <AuthProvider>
        <UserProvider>
        <ModalProvider>
            <Router>
                <SignInModal></SignInModal>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
                <Footer />
            </Router>
        </ModalProvider>
        </UserProvider>
        </AuthProvider>
        // </div>
      );
}


export default App;