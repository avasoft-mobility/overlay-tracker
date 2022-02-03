import React, { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App: FC = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
