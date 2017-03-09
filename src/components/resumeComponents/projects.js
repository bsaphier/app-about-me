import React from 'react';

import Sidebar from '../Sidebar';
import Section from '../Section';
import SectionItem from '../SectionItem';
import ChangeSection from '../ChangeSection';

const Projects = ({ styling }) => {
  return (
    <Section id="projects">
      <Sidebar title="Projects" />
      <h1 className="shadow" style={styling.title}>PROJECTS</h1>
      <SectionItem>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </SectionItem>
      <ChangeSection to="skills" text="NEXT" sidebar />
    </Section>
  );
};

export default Projects;
