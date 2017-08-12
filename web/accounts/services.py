from django.contrib.auth import get_user_model
from .models import UserProfile
class AccountService(object):
	def createAccount(self, username, password, email, firstName, lastName):
		userModel = get_user_model()
		user = userModel(
			username=username,
			password=password,
			email=email,
			firstName=firstName,
			lastName=lastName
		)
		user.save()
		profile = UserProfile(user=user)
		profile.save()
		return	user, profile
