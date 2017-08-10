from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
	url(r'^accounts/', include('accounts.urls')),

	# we don't adding $ on purpose, so the react route still works when user refersh the page
	url(r'^dashboard/', 'accounts.views.dashboard'),
]
