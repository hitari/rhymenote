import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Router as RouterDom } from './Router';

import './App.css';

function App() {
  return (
    <Router>
      <Link to="/">/Home</Link>
      <Link to="/list">/List</Link>
      <RouterDom />
    </Router>
  );
}

export default App;
