import React from 'react';
import { connect } from 'react-redux';
import colors from '../../../bin/colors';
import { buttons, Title, Divider, SideSection } from '../../displayComponents';
import { rotateCarousel } from '../../../actions';
import { styles } from '../../../styles';


const  { SidebarButton } = buttons;

const ProjectsSidebar = ({ style, rotate, theta, content, rotation, currPanel, burgerOpen }) => {
    let { length } = content;
    const getPanelMovement = index => {
        // proper modulus math...
        let forwards = (((currPanel - index) % length) + length) % length;
        let backwards = (((index - currPanel) % length) + length) % length;
        return backwards > forwards ? forwards : backwards * -1;
    };
    const getNewRotation = index => rotation + theta * getPanelMovement(index);
    const sidebarItems = content.map( (project, idx) => {
        let navigate = () => {
            if (currPanel !== idx) rotate(getNewRotation(idx), idx);
        };
        return (
            <div
                key={`sidebar-item-projects${project.index}`}
                onMouseDown={navigate}
                style={styles.resumeComponents.projects.sidebarButton}>
                <SidebarButton colors={{ upColor: [45, 45, 45], downColor: [ 81, 81, 81] }}>
                    <Title style={{ fontSize: '1.1rem' }}>
                        <span>{ project.title }</span>
                    </Title>
                </SidebarButton>
            </div>
        );
    });

    return (
        <SideSection
            title="Projects"
            burger={{ open: burgerOpen }}
            style={{ background: colors.AMETHYST }}>
            <Title style={style.title}>
                <span style={styles.resumeComponents.projects.sidebarTitle}>Projects</span>
                <span>Projects</span>
            </Title>
            <Divider />
            <div style={styles.resumeComponents.projects.sidebarButtonsWrapper}>
                { sidebarItems }
            </div>
        </SideSection>
    );
};

const mapStateToProps = ({ carousel: { theta, currPanel, rotation } }) => ({ theta, currPanel, rotation });

const mapDispatchToProps = dispatch => ({
    rotate: (newRotation, currPanel) => dispatch(rotateCarousel(newRotation, currPanel))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSidebar);
