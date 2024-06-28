from django.shortcuts import render


def homepage(request):
    return render(request, 'app/index.html')


def second_page(request):
    return render(request, 'app/fruit_info.html')