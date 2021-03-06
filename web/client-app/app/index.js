const mountNode = window.document.getElementById('appRoot');

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ProfileIndex from './profile/index';


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);
const BasicExample = () => (
  <Router basename='/dashboard'>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><a href="/accounts/logout/">Logout</a></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/profile" component={ProfileIndex}/>
    </div>
  </Router>
);

ReactDOM.render(<BasicExample />, mountNode);
