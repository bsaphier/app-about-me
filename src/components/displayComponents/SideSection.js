import React from 'react';

const styles = {
  rightSideWrapper: {
    position: 'relative',
    zIndex: 9,
    float: 'right',
    height: '100%',
    width: '22rem', //:TODO fix or replace this
    maxWidth: '33.33%' //:TODO fix or replace this
  },
  rightSideContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    padding: '20px',
    background: 'rgb(255, 255, 255)',
  },

  // 3D shadow effect
  before: {
    zIndex: 1,
    position: 'absolute',
    bottom: '50%',
    left: '13px',
    width: '5%',
    top: '2px',
    maxWidth: '13px',

    WebkitBoxShadow: '-13px 0 10px rgba(0, 0, 0, 0.38)',
    MozBoxShadow: '-13px 0 10px rgba(0, 0, 0, 0.38)',
    boxShadow: '-13px 0 10px rgba(0, 0, 0, 0.38)',

    WebkitTransform: 'rotate(-3deg)',
    MozTransform: 'rotate(-3deg)',
    OTransform: 'rotate(-3deg)',
    MsTransform: 'rotate(-3deg)',
    transform: 'rotate(-3deg)',
  },
  after: {
    top: '50%',
    bottom: '2px',

    WebkitTransform: 'rotate(3deg)',
    MozTransform: 'rotate(3deg)',
    OTransform: 'rotate(3deg)',
    MsTransform: 'rotate(3deg)',
    transform: 'rotate(3deg)',
  }
};


let burger,
    rightSideWrapper;


const SideSection = ({ style, children, ...props }) => {

  rightSideWrapper = styles.rightSideWrapper;

  if (props.burger && props.burger.open) {
    burger = 'hamburger';
  } else {
    burger = 'hamburger hide';
    rightSideWrapper = { ...styles.rightSideWrapper, width: 0 };
  }

  return (
    <div className={`side-section ${burger}`} style={rightSideWrapper}>
      <div style={styles.before} />

      <div style={{...styles.rightSideContainer, ...style}}>
        { children }
      </div>

      <div style={{...styles.before, ...styles.after}} />
    </div>
  );
};

export default SideSection;
