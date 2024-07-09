from django.shortcuts import render
from django.http import JsonResponse
from io import BytesIO
from PIL import Image
import numpy as np
import json
import base64

from .classify import inference


def homepage(request):
    context = {'csrf_token': request.COOKIES.get('csrftoken')}
    return render(request, 'app/index.html', context)


def second_page(request):
    if request.method == "POST":
        data = json.loads(request.body)
        image_data = data.get('imageData')
        request.session['image_data'] = image_data
        return JsonResponse({'message': 'ok'})
    
    image_data = request.session.get('image_data')
    if image_data:
            header, encoded = image_data.split(",", 1)
            data = base64.b64decode(encoded)
            image = np.float32(Image.open(BytesIO(data)))
            result = inference.fruit_classifier(image)
            return render(request, 'app/fruit_info.html', context=result)

    return render(request, 'app/fruit_info.html')  