import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';

import resumeReducer from './resume-reducer';
import sidebarReducer from './sidebar-reducer';
import monotronReducer from './monotron-reducer';
import homePageReducer from './homePage-reducer';
import particlesReducer from './particles-reducer';

export default combineReducers({
  burgerMenu,
  resume: resumeReducer,
  sidebar: sidebarReducer,
  homePage: homePageReducer,
  monotron: monotronReducer,
  particles: particlesReducer
});