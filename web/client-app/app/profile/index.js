import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

class UserProfile extends React.Component {
	handleClick(e) {
		console.log('this is:' + e);
	}

	render() {
		let messageToShow = (<p> No Data.</p>);
		if (this.props.data.loading) {
			messageToShow = (<p> Loading </p>);
		}
		if (this.props.data.error) {
			messageToShow = (<p> error: {this.props.data.error.message} </p>);
		}
		if (this.props.data.myProfile) {
			const profile = this.props.data.myProfile;
			messageToShow = (
				<div>
					<p> first Name: {profile.firstName} </p>
					<p> last Name: {profile.lastName} </p>
				</div>
			)
		}
		return (
			<div>
				<h2> Profile </h2>
				{messageToShow}
				 <button onClick={(e) => this.handleClick(e)}>
					Click me
				</button>
			</div>

		)
	}
};

const userProfileQuery = gql`
	query UserProfileQuery {
		myProfile {
			firstName,
			lastName,
		}
	}
`;

const UserProfileWithData = graphql(userProfileQuery)(UserProfile);

export default UserProfileWithData;
