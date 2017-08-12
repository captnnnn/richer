from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm

class UserEmail(forms.EmailField):
	def clean(self, value):
		super(UserEmail, self).clean(value)
		if value:
			value = value.strip()
		userModel = get_user_model()

		if userModel._default_manager.filter(email=value, is_active=True).exists() or userModel._default_manager.filter(username=value).exists():
			raise forms.ValidationError("This email is already registered.")

		return value


class UserRegistrationForm(forms.Form):
	firstName = forms.CharField(widget=forms.TextInput(attrs={ 'placeholder': u"First Name" }), max_length=50)
	lastName = forms.CharField(widget=forms.TextInput(attrs={ 'placeholder': u"Last Name" }), max_length=50)

	# email will become username
	email = UserEmail(widget=forms.EmailInput(attrs={ 'placeholder': u"Email" }))
	password = forms.CharField(widget=forms.PasswordInput(attrs={ 'placeholder': u"Password" }), label="Password")
	tos = forms.BooleanField(widget=forms.CheckboxInput(),
							 label=(u'I have read and agree to the Terms of Service'),
							 error_messages={ 'required': ("You must agree to the terms to register") })


class UserAuthenticationForm(AuthenticationForm):
	username = forms.CharField(widget=forms.TextInput(attrs={ 'placeholder': u"Email" }), max_length=50)
	password = forms.CharField(widget=forms.PasswordInput(attrs={ 'placeholder': u"Password" }), label="Password")
