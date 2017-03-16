import React from 'react';


const styles = {
  divider: {
    display: 'block',
    margin: '5pt 0',
    background: 'rgba(81, 81, 81, 0.5)'
  },
  horizontal: {
    width: '100%',
    height: '1pt',
  },
  vertical: {
    width: '1pt',
    height: '100%'
  }
};

const Divider = ({ style, vertical = false }) => {
  let orientation = vertical ? styles.vertical : styles.horizontal;

  return <span style={{ ...orientation, ...styles.divider, ...style }} />;
};


export default Divider;