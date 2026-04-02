import React, { useState } from 'react';
import { useTraffic } from '../context/TrafficContext';

const TrafficInput = () => {
  const { trafficDensity, updateTrafficDensity } = useTraffic();
  const [localDensity, setLocalDensity] = useState({ ...trafficDensity });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (road, value) => {
    setLocalDensity(prev => ({ ...prev, [road]: value }));
  };

  const handleSave = () => {
    Object.keys(localDensity).forEach(road => {
      updateTrafficDensity(road, localDensity[road]);
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const roads = ['Road A', 'Road B', 'Road C'];
  const levels = ['Low', 'Medium', 'High'];

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Traffic Flow Configuration</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Update current traffic conditions to adjust routing priorities.</p>
      </div>
      
      <div className="panel" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roads.map(road => (
            <div key={road} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '1rem', 
              background: 'var(--bg-dark)', 
              borderRadius: '4px', 
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '10px', height: '10px', borderRadius: '50%', 
                  background: localDensity[road] === 'High' ? 'var(--signal-red)' : localDensity[road] === 'Medium' ? 'var(--signal-yellow)' : 'var(--signal-green)' 
                }}></div>
                <label style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>{road}</label>
              </div>
              <select 
                className="input-field" 
                style={{ width: '150px' }}
                value={localDensity[road]} 
                onChange={(e) => handleChange(road, e.target.value)}
              >
                {levels.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
          {showToast ? (
            <span style={{ color: 'var(--signal-green)', fontSize: '0.875rem', fontWeight: 500 }}>
              Configuration applied successfully.
            </span>
          ) : (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Unsaved changes will not take effect.</span>
          )}
          
          <button className="btn" onClick={handleSave}>
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficInput;
