import React from 'react';
import { useTraffic } from '../context/TrafficContext';
import TrafficLight from '../components/TrafficLight';

const SignalControl = () => {
  const { activeRoad, signalColor, trafficDensity, timer } = useTraffic();

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Active Signals</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Live state monitoring across all interconnected nodes.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1.5rem' 
      }}>
        {Object.keys(trafficDensity).map((road) => {
          const isActive = road === activeRoad;
          const currentSignal = isActive ? signalColor : 'Red';
          const density = trafficDensity[road];
          const densityColor = density === 'High' ? 'var(--signal-red)' : density === 'Medium' ? 'var(--signal-yellow)' : 'var(--signal-green)';
          
          return (
            <div 
              key={road} 
              style={{ 
                padding: '1.5rem', 
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-dark)', 
                border: `1px solid ${isActive ? 'var(--signal-green)' : 'var(--border-subtle)'}`,
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>{road}</span>
                <span style={{ 
                  padding: '0.25rem 0.5rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  textTransform: 'uppercase',
                  border: `1px solid ${densityColor}`,
                  color: densityColor,
                  borderRadius: '2px',
                  backgroundColor: 'var(--bg-deep)'
                }}>
                  {density}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <TrafficLight roadName={road} signalColor={currentSignal} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SignalControl;
