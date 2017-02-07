import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';



ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
);
