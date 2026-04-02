import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TrafficProvider } from './context/TrafficContext';

// Components
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TrafficInput from './pages/TrafficInput';
import SignalControl from './pages/SignalControl';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('traffic_auth') === 'true';
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <TrafficProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="traffic-input" element={<TrafficInput />} />
            <Route path="signal-control" element={<SignalControl />} />
          </Route>
          
          {/* Redirect any unknown route to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </TrafficProvider>
  );
}

export default App;
