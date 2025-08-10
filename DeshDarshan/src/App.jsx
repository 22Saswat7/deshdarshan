import React from 'react';
import TopSpots from './components/TopSpots';
import DestinationDetails from './components/DestinationDetails';

const App = () => {
  return (
    <div>
      <h1>DeshDarshan - Explore Top Tourist Spots</h1>
      <TopSpots />
      <DestinationDetails />
    </div>
  );
};

export default App;