from django.http import HttpResponse
from django.shortcuts import render
from .forms import UserRegistrationForm
from django.http import HttpResponseRedirect
from .services import AccountService
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login

# Create your views here.
def login(request):
	return render(request, 'base_anonymous.html', {})

def register(request):
	if request.method == 'POST':
		form = UserRegistrationForm(request.POST)
		if form.is_valid():
			AccountService().create(
				username=form.cleaned_data['email'],
				password=form.cleaned_data['password'],
				email=form.cleaned_data['email'],
				firstName=form.cleaned_data['firstName'],
				lastName=form.cleaned_data['lastName'],
			)
			# authenticate to populate backend
			user = authenticate(username=form.cleaned_data['email'], password=form.cleaned_data['password'])
			# login the session
			auth_login(request, user)
			return HttpResponseRedirect('/dashboard/')
	else:
		form = UserRegistrationForm()

	return render(request, 'accounts/register.html', {
		'form': form,
	})

# Create your views here.
def dashboard(request):
	return render(request, 'client/index.html', {})
