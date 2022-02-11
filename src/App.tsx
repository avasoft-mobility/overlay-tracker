import React, { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearhPage';
import TrackerPage from './pages/TrackerPage';

const App: FC = () => (
  <Router>
    <Routes>
      <Route path="/search/:search" element={<SearchPage />} />
      <Route path="/tracker/:session" element={<TrackerPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
