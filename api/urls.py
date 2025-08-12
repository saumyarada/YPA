from django.urls import path
from . import views # Import the entire views module

urlpatterns = [
    # This path will handle POST requests to 'yourdomain.com/api/run-query/'
    # It directly calls the run_query function from the imported views module.
    path('combined/', views.combined, name='combined'),
    path('terminals/', views.terminals, name='terminals')
]
