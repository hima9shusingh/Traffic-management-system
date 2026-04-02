import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';

const TrafficContext = createContext();

const DENSITY_TIME_MAP = { Low: 3, Medium: 6, High: 10 };
const DENSITY_RANK = { High: 3, Medium: 2, Low: 1 };
const ROADS = ['Road A', 'Road B', 'Road C'];

export const TrafficProvider = ({ children }) => {
  const [trafficDensity, setTrafficDensity] = useState({
    'Road A': 'Medium',
    'Road B': 'Low',
    'Road C': 'High',
  });

  const [activeRoad, setActiveRoad] = useState('Road A');
  const [signalColor, setSignalColor] = useState('Green');
  const [timer, setTimer] = useState(DENSITY_TIME_MAP['Medium']);
  const [maxTimer, setMaxTimer] = useState(DENSITY_TIME_MAP['Medium']);

  const stateRef = useRef({ activeRoad, trafficDensity, signalColor, timer, maxTimer });
  
  useEffect(() => {
    stateRef.current = { activeRoad, trafficDensity, signalColor, timer, maxTimer };
  }, [activeRoad, trafficDensity, signalColor, timer, maxTimer]);

  const getNextRoad = (currentRoad, currentDensity) => {
    // Candidates are the other two roads in order
    const currentIndex = ROADS.indexOf(currentRoad);
    const candidates = [
      ROADS[(currentIndex + 1) % ROADS.length],
      ROADS[(currentIndex + 2) % ROADS.length]
    ];
    
    let bestRoad = candidates[0];
    let maxRank = DENSITY_RANK[currentDensity[bestRoad]];

    for (let i = 1; i < candidates.length; i++) {
      const candidate = candidates[i];
      const rank = DENSITY_RANK[currentDensity[candidate]];
      if (rank > maxRank) {
        maxRank = rank;
        bestRoad = candidate;
      }
    }
    return bestRoad;
  };

  const nextRoad = useMemo(() => getNextRoad(activeRoad, trafficDensity), [activeRoad, trafficDensity]);

  // Main tick loop
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      const current = stateRef.current;
      
      if (current.timer > 1) {
        const nextTimer = current.timer - 1;
        setTimer(nextTimer);
        
        // Turn yellow on last 2 seconds
        if (nextTimer <= 2 && current.signalColor === 'Green') {
          setSignalColor('Yellow');
        }
      } else {
        // Switch to the dynamically calculated next road
        const upcomingRoad = getNextRoad(current.activeRoad, current.trafficDensity);
        const nextDensity = current.trafficDensity[upcomingRoad];
        let nextTime = DENSITY_TIME_MAP[nextDensity] || 5;

        setActiveRoad(upcomingRoad);
        setSignalColor('Green');
        setTimer(nextTime);
        setMaxTimer(nextTime);
      }
    }, 1000);

    return () => clearInterval(cycleInterval);
  }, []);

  // Update logic: Instantly affect signals and timers
  const updateTrafficDensity = (road, density) => {
    setTrafficDensity((prev) => {
      const newDensity = { ...prev, [road]: density };
      const current = stateRef.current;
      
      // If we modified the active road's density, dynamically adjust its max time
      if (road === current.activeRoad) {
        const newTime = DENSITY_TIME_MAP[density];
        setMaxTimer(newTime);
        // If current timer is strictly greater than the new max time, scale it down immediately
        if (current.timer > newTime) {
          setTimer(newTime);
          if (newTime <= 2) setSignalColor('Yellow');
        } else if (current.signalColor === 'Yellow' && current.timer > 2) {
          // If it was yellow but we added time, make it green again
          setSignalColor('Green');
        }
      } else {
        // If we modified another road, compare its new rank with the active road's rank.
        // If it's strictly greater AND the active road is still green with plenty of time, 
        // we should instantly switch or fast-track the transition!
        const activeRank = DENSITY_RANK[newDensity[current.activeRoad]];
        const updatedRank = DENSITY_RANK[density];
        
        if (updatedRank > activeRank) {
          // Force a switch immediately by setting timer to 1
          if (current.timer > 2) {
            setTimer(2);
            setSignalColor('Yellow');
          }
        }
      }
      
      return newDensity;
    });
  };

  return (
    <TrafficContext.Provider value={{
      trafficDensity,
      updateTrafficDensity,
      activeRoad,
      signalColor,
      timer,
      maxTimer,
      nextRoad
    }}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => useContext(TrafficContext);
