from django.http import HttpResponse
from django.shortcuts import render
from .forms import UserRegistrationForm
from django.http import HttpResponseRedirect

# Create your views here.
def login(request):
	return render(request, 'base_anonymous.html', {})

def register(request):
	if request.method == 'POST':
		form = UserRegistrationForm(request.POST)
		if form.is_valid():
			return HttpResponseRedirect('/accounts/login/')
	else:
		form = UserRegistrationForm()

	return render(request, 'accounts/register.html', {
		'form': form,
	})

# Create your views here.
def dashboard(request):
	return render(request, 'client/index.html', {})
