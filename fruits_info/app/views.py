from django.shortcuts import render
from django.http import JsonResponse
from django.urls import reverse
from io import BytesIO
from PIL import Image
import numpy as np
import json
import base64

from .classify import inference
from .agent import health_benefits


def homepage(request):
    second_page_url = reverse('details_page')
    ctx = {'details_page': second_page_url}
    return render(request, 'app/index.html', context=ctx)


def second_page(request):
    if request.method == "POST":
        data = json.loads(request.body)
        image_data = data.get('imageData')
        request.session['image_data'] = image_data
        return JsonResponse({'ok': True})
    
    image_data = request.session.get('image_data')
    if image_data:
            _, encoded = image_data.split(",", 1)
            data = base64.b64decode(encoded)
            image = np.float32(Image.open(BytesIO(data)))
            result = inference.fruit_classifier(image)
            fruit_name = result['fruit']
            benefits = health_benefits(fruit=fruit_name)
            ctx = {
                'fruit': fruit_name,
                'benefits': benefits
            }
            return render(request, 'app/fruit_info.html', context=ctx)

    return render(request, 'app/fruit_info.html')  