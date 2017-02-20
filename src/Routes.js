import {
  Route,
  Router,
  IndexRoute,
  IndexRedirect,
  browserHistory
} from 'react-router';
import React from 'react';


import store from './store';
import { didLoad } from './actions';

import Main from './components/Main';
import Resume from './components/Resume';
import SectionWrapper from './components/SectionWrapper';

require('./stylesheets/main.scss');

const fetchData = () => {
  // load resume data
  store.dispatch(didLoad());
};

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRedirect to="/my-site" />
      <Route path="my-site" component={SectionWrapper} onEnter={fetchData}>
        <IndexRoute component={Resume} />
      </Route>
    </Route>
  </Router>
);

export default Routes;
