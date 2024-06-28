from django.urls import path
from . import views


urlpatterns = [
    path('', view=views.homepage, name='home'),
    path('details', view=views.second_page, name='details_page'),
]