import React from 'react'
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import UserList from './Pages/User-List/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route exact path="/" element={<Login/>}/>
        <Route element={<Home />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user-list' element={<UserList />} />
            </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
