import React from 'react';// Import the CSS file for styling

const FloatingButton = () => {
  return (
    <button className="floating-button" onClick={() => {window.open('/help','_blank')}}>
      Help
    </button>
  );
};

export default FloatingButton;
