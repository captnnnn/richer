from django.conf.urls import include, url
from django.contrib import admin
from graphene_django.views import GraphQLView
from web.schema import schema
from django.contrib.auth.decorators import login_required

urlpatterns = [
	url(r'^accounts/', include('accounts.urls')),

	# we don't adding $ on purpose, so the react route still works when user refersh the page
	url(r'^dashboard/', 'accounts.views.dashboard'),
	url(r'^ajaxTest/', 'accounts.views.ajaxTest'),
	url(r'^graphql', login_required(GraphQLView.as_view(graphiql=True, schema=schema))),
]
