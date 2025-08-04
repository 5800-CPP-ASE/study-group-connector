import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Matches from './components/Matches';
import Chat from './components/Chat';
import Header from './components/Header'; 
import './App.css';

// router for ui, full page reload 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<> <Header /> <Profile /> </>} />
          <Route path="/matches" element={<> <Header /> <Matches /> </>} />
          <Route path="/chat/:room" element={<> <Header /> <Chat /> </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;