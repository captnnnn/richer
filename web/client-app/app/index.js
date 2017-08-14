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
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';


// -- Start Mock Data ----
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
 import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
const typeDefs = `
    type UserProfile {
       id: ID!
       firstName: String
       lastNmae: String
    }
    type Query {
       userProfiles: [UserProfile]
    }
`;
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
const client = new ApolloClient({
   networkInterface: mockNetworkInterface,
 });

// -- end Mock Data

// -- START Graphql  --
//const client = new ApolloClient();

class UserProfileList extends React.Component {
  render () {
       let messageToShow = (<p> success </p>);

       if (this.props.data.loading) {
         messageToShow = (<p> Loading </p>);
       }
       if (this.props.data.error) {
         messageToShow = (<p> error: {this.props.data.error.message} </p>);
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
    <ApolloProvider client={client}>
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
