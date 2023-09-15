import React from 'react';

const PropGreeting = ({ greeting }) => {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
      }}
    >
      {greeting}
    </div>
  );
};

export default PropGreeting;
