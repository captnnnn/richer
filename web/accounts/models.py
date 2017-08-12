from django_mongoengine import Document
from django_mongoengine import fields
from django_mongoengine.mongo_auth.models import User
# Create your models here.

class UserProfile(Document):
	firstName = fields.StringField(verbose_name="First Name", max_length=255)
	lastName = fields.StringField(verbose_name="Last Name", max_length=255)
	user = fields.ReferenceField(User)
