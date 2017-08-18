import graphene

# NOTE import accounts, then use accounts.schema.Query won't work
# due to the lazy loading of python ? not sure... but the follwoing works
from accounts.schema import Query as AccountQuery

class Query(AccountQuery, graphene.ObjectType):
	# This class will inherit from multiple Queries
	# as we begin to add more apps to our project
	pass

schema = graphene.Schema(query=Query)
