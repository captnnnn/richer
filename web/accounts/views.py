from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def login(request):
	return render(request, 'base_anonymous.html', {})

def register(request):
	return render(request, 'accounts/register.html', {})

# Create your views here.
def dashboard(request):
	return render(request, 'client/index.html', {})
