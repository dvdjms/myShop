import React, {useState}  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import { onAuthStateChanged, auth } from './config/Firebase';
import Navigation from './components/Navigation';


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {

    if(user){
      setIsSignedIn(true);
    }
    else{
      setIsSignedIn(false);
    }
  })

  return (
    <div className="App">
      <Router>
      <Navigation isSignedIn={isSignedIn} />
        <Routes>
             <Route path="/" element={<Home />} />
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
