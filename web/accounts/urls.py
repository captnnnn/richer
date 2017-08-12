from django.conf.urls import url
from django.contrib.auth.views import logout_then_login
from . import views

urlpatterns = [
	url(r'^login/$', views.login),
	url(r'^register/$', views.register),
	url(r'^logout/$', logout_then_login),
]
