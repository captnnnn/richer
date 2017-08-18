import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

class UserProfile extends React.Component {
	constructor() {
		super();
		this.state = {
			isEditing: false,
		};
	}

	handleClick(action) {
		if (this.state.isEditing) {
			this.setState({isEditing: false});
		}
		else {
			this.setState({isEditing: true});
		}
	}

	render() {
		if (this.props.data.loading) {
			return <p> Loading </p>;
		}
		if (this.props.data.error) {
			return <p> error: {this.props.data.error.message} </p>;
		}

		const profile = this.props.data.myProfile;
		const header = <h2> Profile </h2>;
		if (this.state.isEditing) {
			return (
				<div>
					{header}
					 <button onClick={(e) => this.handleClick(e)}>
						Save
					</button>
					<p> Edit first Name: {profile.firstName} </p>
					<p> Edit last Name: {profile.lastName} </p>
				</div>
			);
		}
		return (
			<div>
				{header}
				 <button onClick={(e) => this.handleClick(e)}>
					Edit
				</button>
				<p> first Name: {profile.firstName} </p>
				<p> last Name: {profile.lastName} </p>
			</div>
		);

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
