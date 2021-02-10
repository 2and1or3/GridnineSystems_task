import React from 'react';

import Filters from '@/components/Filters/Filters';
import TicketsContainer from '@/components/TicketsContainer/TicketsContainer';

const json = require('@/flights.json');

const data = JSON.parse(JSON.stringify(json));

function App() {
  const tickets = data.result.flights;

  return (
    <div className="flights-page">
      <Filters />
      <TicketsContainer tickets={tickets} />
    </div>
  );
}

export default App;
