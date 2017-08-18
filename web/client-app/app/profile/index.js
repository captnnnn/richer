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
		if (action == 'edit') {
			this.setState({
				isEditing: true,
				firstName: this.props.data.myProfile.firstName,
				lastName: this.props.data.myProfile.lastName,
			});
		}
		else if  (action == 'cancel') {
			this.setState({isEditing: false});
		}
	}

	handleTextInputChange(event) {
		const target = event.target;
		this.setState({
			[target.name]: target.value,
		});
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
					 <button onClick={(e) => this.handleClick('cancel')}>
						Cancel
					</button>
					<label>First Name:
						<input type="text" name="firstName" value={this.state.firstName} onChange={(e) => this.handleTextInputChange(e)} />
					</label>
					<label>Last Name:
						<input type="text" name="lastName" value={this.state.lastName} onChange={(e) => this.handleTextInputChange(e)} />
					</label>
				</div>
			);
		}
		return (
			<div>
				{header}
				 <button onClick={(e) => this.handleClick('edit')}>
					Edit
				</button>
				<p> First Name: {profile.firstName} </p>
				<p> Last Name: {profile.lastName} </p>
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
