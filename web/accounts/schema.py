import graphene
from .models import UserProfile

# NOTE:
# 1.we can't really make this work for mongodb, but we
# can update or have our own `DjangoObjectType` to take care of this
# 2. or we can't get rid of this `model` thing completely
# and always use graphql for our data modeling and use it to interact
# with mongodb direclty
#
# class UserProfileType(DjangoObjectType):
#	class Meta:
#		model = UserProfile

class UserProfileType(graphene.ObjectType):
	firstName = graphene.String()
	lastName = graphene.String()

	def resolve_firstName(self, args, context, info):
		return self.firstName

	def resolve_lastName(self, args, context, info):
		return self.lastName

# abstractType on purpse so it can be includded in the final query schema
class Query(graphene.AbstractType):

	allUserProfiles = graphene.List(UserProfileType)

	def resolve_allUserProfiles(self, args, context, info):
		return UserProfile.objects.all()
