import React, { Component } from 'react';

import Modernizr from '../../.modernizrrc';
import { buttons, Cell, Title, FillSection } from './displayComponents';
import { normal as _normal } from '../bin/utils';
const { Button } = buttons;

const transform = Modernizr.prefixed('transform');

const styles = {
  parallaxWrapA: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(45, 45, 45)',
  },
  parallaxWrapB: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)',

    // WebkitPerspectiveOrigin: '25% 10%',
    // MozPerspectiveOrigin: '25% 10%',
    // OPerspectiveOrigin: '25% 10%',
    // perspectiveOrigin: '25% 10%',
  },
  parallaxDiv: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: 'transparent',
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'auto 100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  backgroundBlur: {
    //:TODO boolean will include these styles
  },

  banner: {
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '33.33%',
    backgroundColor: 'rgba(81, 81, 81, 0.55)',
    // backgroundImage: 'radial-gradient(circle at 50%, rgba(45, 45, 45, 0.55), rgba(45, 45, 45, 0.21))',

    WebkitTransform: '-webkit-translate(-50%, -50%)',
    MozTransform: '-moz-translate(-50%, -50%)',
    OTransform: '-o-translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
  },
  bannerInfo: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  titleMain: {
    display: 'block',
    position: 'relative',
    textAlign: 'inherit'
  },
  title: {
    display: 'inherit'
  },
  buttonWrap: {
    width: '13rem',
    margin: 'auto'
  }
};


class ProjectPanel extends Component {

  constructor( props ) {
    super(props);
    let { project: { backgroundImg }} = props;

    this.state = {
      mouseX: 0,
      mouseY: 0,
      panelWidth: 0,
      panelHeight: 0,
      parallax: Array.isArray(backgroundImg),
      parallaxVar: Array.isArray(backgroundImg) && (backgroundImg.length > 5)
    };

    this.getElement = this.getElement.bind(this);
    this.normMouseX = this.normMouseX.bind(this);
    this.normMouseY = this.normMouseY.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.createBackground = this.createBackground.bind(this);
  }


  componentDidMount() {
    window.addEventListener( 'resize', this.handleResize);

    if (this.state.parallax) {
      window.addEventListener( 'mousemove', this.handleMouseMove);
    }
  }


  componentWillUnmount() {
    window.removeEventListener( 'resize', this.handleResize);

    if (this.state.parallax) {
      window.removeEventListener( 'mousemove', this.handleMouseMove);
    }
  }


  normMouseX( value ) {
    let { panelWidth } = this.state;
    let norm = _normal(panelWidth, 0, (panelWidth / 2), (-1 * (panelWidth / 2)));
    return norm(value);
  }


  normMouseY( value ) {
    let { panelHeight } = this.state;
    let norm = _normal(panelHeight, 0, (panelHeight / 2), (-1 * (panelHeight / 2)));
    return norm(value);
  }


  handleMouseMove( event ) {
    let { clientX, clientY } = event;
    // maps mouse pos relative to the center of the panelcoordinates of the mouse, relative to
    // the size of the panel
    let mouseX = this.normMouseX(clientX);
    let mouseY = this.normMouseY(clientY);

    this.setState({ mouseX, mouseY });
  }


  handleResize() {
    let { offsetWidth, offsetHeight } = this.domNode;
    this.setState({
      panelWidth: offsetWidth,
      panelHeight: offsetHeight
    });
  }


  // create a refrence to a DOM node to listen for mouseMove
  getElement( ref ) {
    this.domNode = ref;
    this.setState({
      panelWidth: ref.offsetWidth,
      panelHeight: ref.offsetHeight
    });
  }


  createBackground() {
    let perspective;
    let { project: { backgroundImg } } = this.props;
    let { mouseX, mouseY, parallax, parallaxVar, panelWidth, panelHeight } = this.state;

    // the maxDistance is the distance from the center to the corner of the panel
    let maxDistance = Math.sqrt(Math.pow(panelWidth, 2) + Math.pow(panelHeight, 2));

    // the distance of the mouse, from the center of the panel, as a cartesian coordinate
    let distance = Math.sqrt(Math.pow((mouseX), 2) + Math.pow((mouseY), 2));

    // vary the style for different panels
    if (parallaxVar) {
      // distance *= -1;
      perspective = panelWidth < panelHeight
        ? (panelHeight * 100 / panelWidth)
        : (panelWidth  * 100 / panelHeight);
    } else {
      perspective = panelWidth < panelHeight
        ? (panelHeight * 100 / panelWidth)
        : (panelWidth  * 100 / panelHeight);
    }

    const backgroundStyle = (parallax)
      ? {
          ...styles[ parallaxVar ? 'parallaxWrapB' : 'parallaxWrapA' ],
          WebkitPerspective: `${perspective}px`,
          MozPerspective: `${perspective}px`,
          OPerspective: `${perspective}px`,
          perspective: `${perspective}px`,
        }
      : {
          ...styles.background,
          backgroundImage: `url(public/images/${backgroundImg})`
        };


    return (parallax)
      ? (<div className="parallax-mouse" style={backgroundStyle}>
          { backgroundImg.map( (fileName, i) => {

            let translateZ = (parallaxVar)
              ? distance / Math.pow((i + 1), 2)
              : 2 * distance / maxDistance * Math.sqrt(perspective * (i + 1));

            return (<div key={`bg-layer-${+i}-${fileName}`} style={styles.parallaxDiv}>
              <img
                src={`public/images/${fileName}`}
                alt={fileName}
                style={{
                  height: `${panelHeight * 1.5}px`,
                  [transform]: `
                    translateZ(${translateZ}px)
                    rotateY(${(mouseX * -1) / (panelWidth * (i + 1))}deg)
                    rotateX(${(mouseY) / (panelHeight * (i + 1))}deg)
                    `
                }}
              />
            </div>);
          })}
        </div>)
      : (<div style={backgroundStyle} />);
  }


  render() {
    let { style, toggleModal, project: { link, title, shortDescription } } = this.props;

    return (
      <FillSection className="project-panel" style={{padding: 0}}>

        <div className="background" ref={this.getElement} style={{width: '100%', height: '100%'}}>
          { this.createBackground() }
        </div>

        <Cell style={{position: null}}>
          <div style={styles.banner}>
            <div style={styles.bannerInfo}>

              <Title style={style.title} parentStyle={styles.titleMain}>
                <span>{ title }</span>
              </Title>

              <div>{ shortDescription }</div>

              <div style={styles.buttonWrap}>
                <div style={{padding: '5px'}}>
                  <Button link={link} title={`Link To ${title}`}>
                    {'Check it out!'}
                  </Button>
                </div>

                <div style={{padding: '5px'}}>
                  <Button title="More Info" onClick={toggleModal}>
                    {'More Info'}
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </Cell>

      </FillSection>
    );
  }
}


export default ProjectPanel;
