const mountNode = window.document.getElementById('appRoot');


import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ProfileIndex from './profile/index';

const BasicExample = () => (
  <Router basename='/dashboard'>
    <div>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <hr/>

      <Route path="/profile" component={ProfileIndex}/>
    </div>
  </Router>
);

ReactDOM.render(<BasicExample />, mountNode);
