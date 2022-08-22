import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile';
import SystemDetail from './pages/systemDetail/SystemDetail';
import NavBar from './components/NavBar'

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
              ? < Home />
              : <Navigate to="/login"/>}/>
            <Route
              path="/login"
              element={!user
              ? <Login/>
              : <Navigate to="/"/>}/>
            <Route
              path='/signup'
              element={!user
              ? <Signup/>
              : <Navigate to="/"/>}/>
            <Route
              path='/home'
              element={user
              ? <Home/>
              : <Navigate to="/login"/>}/>
            <Route
              path='/profile'
              element={user
              ? <Profile/>
              : <Navigate to="/login"/>}/>
            <Route
              path='/systems/:id'
              element={user
              ? <SystemDetail/>
              : <Navigate to={"/login"}/>}/>
          </Routes>
        </div>

      )}
    </BrowserRouter>
  );
}

export default App;
