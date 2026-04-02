import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrafficCone } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('traffic_auth', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'radial-gradient(circle at center, var(--bg-panel), var(--bg-deep))' }}>
      <div className="panel animate-fade" style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ 
              background: 'var(--bg-dark)', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <TrafficCone color="var(--text-main)" size={40} />
            </div>
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Traffic Control System</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Authenticate to access the controller dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="admin@smarttraffic.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.875rem', width: '100%', background: 'var(--text-main)', color: 'var(--bg-deep)', border: 'none' }}>
            System Login
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          System diagnostics mode. Any credentials accepted.
        </div>
      </div>
    </div>
  );
};

export default Login;
