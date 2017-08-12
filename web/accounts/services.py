from django.contrib.auth import get_user_model
from .models import UserProfile
class AccountService(object):
	def createAccount(self, username, password, email, firstName, lastName):
		userModel = get_user_model()
		user = userModel._default_manager.create_user(
			username=username,
			password=password,
			email=email
		)
		user.save()
		profile = UserProfile(
			firstName=firstName,
			lastName=lastName,
			user=user
		)
		profile.save()
		return	user, profile
