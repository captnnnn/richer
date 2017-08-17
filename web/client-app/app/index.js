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
import apolloClient from './myApolloClient';
import {
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';

// -- START Graphql  --

class UserProfileList extends React.Component {
  render () {
       let messageToShow = (<p> success </p>);

       if (this.props.data.loading) {
         messageToShow = (<p> Loading </p>);
       }
       if (this.props.data.error) {
         messageToShow = (<p> error: {this.props.data.error.message} </p>);
       }
       if (this.props.data.userProfiles) {
         messageToShow = this.props.data.userProfiles.map(profile => <li key={profile.id}>{profile.firstName}</li>)
       }
       return (
          <div>
             <h2> Users</h2>
             {messageToShow}
          </div>
        )

      return <p> success</p>
  }
};

const userProfileListQuery = gql`
   query UserListQuery {
     userProfiles {
       id,
       firstName,
       lastName,
     }
   }
`;
const UserProfileListWithData = graphql(userProfileListQuery)(UserProfileList);
// END Graphql


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);


const BasicExample = () => (
  <Router basename='/dashboard'>
    <ApolloProvider client={apolloClient}>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><a href="/accounts/logout/">Logout</a></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/profile" component={ProfileIndex}/>
        <div>
          <UserProfileListWithData />
        </div>
      </div>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<BasicExample />, mountNode);
