from fastapi import Request, status, Response
from functools import wraps

def auth_required(*role: list):
    def wrapper(func):
        @wraps(func)
        async def wrapped(request: Request, *args, **kwargs):
            if "user" not in request.session:
                return Response(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content="Unauthorized"
                )
            user = request.session["user"]
            print(user["role"], role)
            if user["role"] not in role:
                return Response(
                    status_code=status.HTTP_403_FORBIDDEN,
                    content="Forbidden"
                )
            return await func(request, *args, **kwargs)
        return wrapped
    return wrapper
