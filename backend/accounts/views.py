import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        # Handle POST request for signup
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            # Check if the username is already taken
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            # Create the user
            user = User.objects.create_user(username=username, password=password)
            # Optionally, you can perform additional tasks here, such as sending a confirmation email
            return JsonResponse({'success': True, 'message': 'Account created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    elif request.method == 'GET':
        # Handle GET request for signup (e.g., render signup form)
        # You can return a JsonResponse with a message indicating that GET is not supported
        return JsonResponse({'error': 'GET method not supported for signup'}, status=405)
    else:
        # Return an error response for unsupported request methods
        return JsonResponse({'error': 'Invalid request method'}, status=405)