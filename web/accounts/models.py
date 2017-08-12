from django_mongoengine import Document
from django_mongoengine import fields
from django_mongoengine.mongo_auth.models import User
# Create your models here.

class UserProfile(Document):
	user = fields.ReferenceField(User)
	url = fields.URLField(max_length=255, null=True, verbose_name='URL')
