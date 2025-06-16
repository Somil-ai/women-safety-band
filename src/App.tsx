import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import History from './pages/History';
import Layout from './components/Layout';
import { SafetyProvider } from './context/SafetyContext';

function App() {
  return (
    <SafetyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </SafetyProvider>
  );
}

export default App;