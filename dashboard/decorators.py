from django.shortcuts import redirect

def allowed_roles(roles=[]):
    def wrapper(view_func):
        def inner(request, *args, **kwargs):
            if request.user.role in roles:
                return view_func(request, *args, **kwargs)
            return redirect("dashboard")
        return inner
    return wrapper