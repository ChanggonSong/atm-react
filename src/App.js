import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './FirstPage';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Default route to handle direct access to the root */}
      </Routes>
    </Router>
  );
}

export default App;