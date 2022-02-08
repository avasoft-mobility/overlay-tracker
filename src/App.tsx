import React, { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearhPage';

const App: FC = () => (
  <Router>
    <Routes>
      <Route path="/search/:search" element={<SearchPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
