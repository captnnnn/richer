from django.conf.urls import url
from django.contrib.auth.views import logout_then_login
from django.contrib.auth.views import login
from . import views

urlpatterns = [
	url(r'^register/$', views.register),
	url(r'^login/$', login, {
			'template_name': 'accounts/login.html',
		}),
	url(r'^logout/$', logout_then_login),
]
