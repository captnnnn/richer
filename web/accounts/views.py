from django.http import HttpResponse

# Create your views here.
def login(request):
    return HttpResponse("Hello, world. You're at the accounts login.")