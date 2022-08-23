import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import NavBar from './components/NavBar';
import Reservation from './pages/reservation/Reservation'
import Profile from './pages/profile/Profile';
import Landing from './pages/landing/Landing';


import {useAuthContext} from './hooks/useAuthContext'

function App() {

  const {user, authIsReady} = useAuthContext()

  return (
    <BrowserRouter>
      {authIsReady && (

        <div className="App">

          <NavBar/>
          <Routes>
            <Route
              exact
              path="/"
              element={user
              ? <Landing/>
              : <Navigate to="/login"/>}/>
            <Route
              path="/login"
              element={!user
              ? <Login/>
              : <Navigate to="/"/>}/>
            <Route
              path='/signup'
              element={!user
              ? <SignUp/>
              : <Navigate to="/"/>}/>
            <Route
              path='/home'
              element={user
              ? <Home/>
              : <Navigate to="/login"/>}/>
            <Route
              path='/reservation/:id'
              element={user
              ? <Reservation/>
              : <Navigate to="/login"/>}/>
            <Route
              path='/profile'
              element={user
              ? <Profile/>
              : <Navigate to="/login"/>}/>

          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
