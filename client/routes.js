import React from 'react';
import { Route, IndexRoute } from 'react-router';

import About from './components/About';
import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';
import Requests from './components/Requests';

import NotFound404 from './components/NotFound404';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/about' component={About} />
    <Route path='/profile' component={Profile}/>
    <Route path='/requests' component={Requests} />
    <Route path='*' component={NotFound404} />
  </Route>
);
