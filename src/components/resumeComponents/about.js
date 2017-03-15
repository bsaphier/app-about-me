import React from 'react';

import {
  Cell,
  Title,
  Section,
  Divider,
  FillView,
  BorderGrad,
  SideSection,
  SocialButton
} from '../displayComponents';
import { hoverSpin } from '../HOC';
import SectionFoot from '../SectionFoot';


// hoverSpin takes two props: initialColor & hoverColor
// which are arrays of RGB values. If hoverColor is a nested array the
// color is rendered as a gradient –– only the first two arrays are used
const SpinButton = hoverSpin(SocialButton);

const About = ({ content: { about, contact }, style }) => {

  const socialButtons = contact.links.map( link =>
    <SpinButton
      url={link.url}
      key={link.name}
      name={link.name}
      icon={link.icon}
      initialColor={[45, 45, 45]}
      hoverColor={[[255, 68, 62], [252, 255, 88]]}
    />
  );


  return (
    <Section id="about">


      <SideSection title="Contact">

        <Title style={{
          ...style.title,
          fontSize: '300%',
          letterSpacing: '-0.05em'
        }}>
          <span>Contact</span>
        </Title>

        <Cell style={{height: '62%'}}>
          { 'FILLER' }
        </Cell>
        <Divider />
        <Cell style={{height: '21%', textAlign: 'center'}}>
          { socialButtons }
        </Cell>

      </SideSection>


      <FillView style={{
        background: 'rgb(81, 81, 81)',
        boxShadow: 'inset -1em 0em 1em -0.7em rgba(45, 45, 45, 0.7)'
      }}>

        <Cell>

          <BorderGrad style={{
            top: '47%',
            left: '49%',
            width: '74%',
            height: '65%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '-0.4em 0.3em 1em -0.1em rgba(45, 45, 45, 0.7)'
          }}>

            <Title className="shadow" style={style.title}>
              ABOUT ME
            </Title>

            <p style={style.text}>{about}</p>

          </BorderGrad>

        </Cell>

        <SectionFoot to="projects" text="NEXT" />

      </FillView>


    </Section>
  );
};

export default About;
