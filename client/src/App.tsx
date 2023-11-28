import React, {useState, useEffect}  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import { onAuthStateChanged, auth } from './config/Firebase';
import Navigation from './components/Navigation';
import { getUserDetails } from './services/api'


function App() {

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
    <div className="App">
      <Router>
      <Navigation isSignedIn={isSignedIn} />
        <Routes>
             <Route path="/" element={<Home isSignedIn={isSignedIn} userName={userName} loading={loading}/>} />
          {isSignedIn === true ?
            <Route path="/profile" element={<Profile />} />
          :
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
          }
        </Routes>
      </Router>
    </div>
  );
}


export default App;
