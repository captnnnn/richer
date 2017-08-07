from django_mongoengine import Document
from django_mongoengine import fields
from django_mongoengine.mongo_auth.models import User
# Create your models here.

class UserProfile(Document):
	firstName = fields.StringField(max_length=64)
	lastName = fields.StringField(max_length=64)
	user = fields.ReferenceField(User)