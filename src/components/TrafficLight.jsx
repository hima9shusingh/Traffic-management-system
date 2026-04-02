import React from 'react';

const TrafficLight = ({ roadName, signalColor }) => {
  return (
    <div className="traffic-light-housing">
      {/* Red Light */}
      <div className={`light-bulb red ${signalColor === 'Red' ? 'active' : ''}`}>
        {signalColor === 'Red' && (
          <div style={{ position: 'absolute', top: '15%', left: '20%', width: '30%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', filter: 'blur(2px)' }} />
        )}
      </div>
      
      {/* Yellow Light */}
      <div className={`light-bulb yellow ${signalColor === 'Yellow' ? 'active' : ''}`}>
        {signalColor === 'Yellow' && (
          <div style={{ position: 'absolute', top: '15%', left: '20%', width: '30%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', filter: 'blur(2px)' }} />
        )}
      </div>
      
      {/* Green Light */}
      <div className={`light-bulb green ${signalColor === 'Green' ? 'active' : ''}`}>
        {signalColor === 'Green' && (
          <div style={{ position: 'absolute', top: '15%', left: '20%', width: '30%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', filter: 'blur(2px)' }} />
        )}
      </div>
    </div>
  );
};

export default TrafficLight;
