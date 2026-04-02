import React from 'react';
import { useTraffic } from '../context/TrafficContext';
import TrafficLight from '../components/TrafficLight';

const Dashboard = () => {
  const { activeRoad, signalColor, timer, trafficDensity } = useTraffic();

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Traffic Control Panel</h1>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-panel)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Active Signal</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              {activeRoad} - <span style={{ color: signalColor === 'Green' ? 'var(--signal-green)' : signalColor === 'Yellow' ? 'var(--signal-yellow)' : 'var(--signal-red)' }}>{signalColor}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Timer</div>
            <div className="timer-text" style={{ fontSize: '2.5rem', color: signalColor === 'Green' ? 'var(--signal-green)' : signalColor === 'Yellow' ? 'var(--signal-yellow)' : 'var(--signal-red)' }}>
              {timer}s
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {Object.entries(trafficDensity).map(([road, density]) => {
          const isRoadActive = road === activeRoad;
          const currentSignal = isRoadActive ? signalColor : 'Red';
          const densityColor = density === 'High' ? 'var(--signal-red)' : density === 'Medium' ? 'var(--signal-yellow)' : 'var(--signal-green)';
          
          return (
            <div key={road} style={{ 
              padding: '1.5rem', 
              backgroundColor: isRoadActive ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-dark)', 
              border: `1px solid ${isRoadActive ? 'var(--signal-green)' : 'var(--border-subtle)'}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
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

export default Dashboard;
