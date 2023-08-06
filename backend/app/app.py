from fastapi import FastAPI, status, Request, Response, UploadFile, Form, File, WebSocket, BackgroundTasks, UploadFile
from fastapi.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from werkzeug.utils import secure_filename
import hashlib
import uvicorn
import config
import datetime
import json
import os

from db import get_db
from controllers.user_controller import UserController
from controllers.content_controller import ContentController
from models.user import Users
from models.content import Content
from schemas import RegisterSchema, LoginSchema, SearchSchema
from modules.search import search
from modules.scrape import getPageText
from modules.gpt import get_gpt_response, generateQuiz, generateMCQ, generateSummary, generateFillTheBlank
from modules.parser import parseQuiz, parseMCQ, parseSummary, parseFillTheBlank
from modules.ocr import imageToText
from middleware.auth import auth_required


middleware = [Middleware(SessionMiddleware, secret_key=config.SECRET_KEY)]
userController = UserController(get_db())
contentController = ContentController(get_db())
app = FastAPI(middleware=middleware)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index(request: Request):
    # users = userController.get_all()
    return {"message": "Hello World"}


@app.post("/register")
def register(request: Request, user: RegisterSchema):
    user.password = hashlib.sha256(user.password.encode()).hexdigest()
    new_user = Users(user.username, user.password, user.email, "user", datetime.datetime.now(), datetime.datetime.now(), None)
    return userController.create(new_user)


@app.post("/login")
def login(request: Request, user: LoginSchema):
    user.password = hashlib.sha256(user.password.encode()).hexdigest()
    tmp_user = userController.get_by_username(user.username)
    if tmp_user.password == user.password:
        request.session["user"] = {
            "username": tmp_user.username,
            "role": tmp_user.role
        }
        return status.HTTP_200_OK
    else:
        return status.HTTP_401_UNAUTHORIZED


def contentGenerator(request, text_image_path, query, num_questions):
    if text_image_path != None:
        content = imageToText(text_image_path)
    else:
        urls = search(query, num_urls=10)
        content = getPageText(urls)

    gpt_response = generateQuiz(content, num_questions)
    quiz = parseQuiz(gpt_response)
    gpt_response = generateMCQ(content, num_questions)
    mcq = parseMCQ(gpt_response)
    gpt_response = generateSummary(content)
    summary = parseSummary(gpt_response)
    gpt_response = generateFillTheBlank(content, num_questions)
    print(gpt_response)
    fill_the_blank = parseFillTheBlank(gpt_response)

    username = request.session["user"]["username"]
    user = userController.get_by_username(username)

    new_content = Content(user.id, query, json.dumps(quiz), json.dumps(mcq), summary, json.dumps(fill_the_blank))
    contentController.create(new_content)


@app.post("/generate")
@auth_required("user")
async def run(request: Request, background_tasks: BackgroundTasks, query: str = Form(...), num_questions: int = Form(10), text_image: UploadFile = File(None)):
    filepath = None
    if text_image != None:
        filename = secure_filename(text_image.filename)
        filepath = os.path.join(os.getcwd(), "uploads/", filename)
        with open(filepath, "wb+") as f:
            f.write(text_image.file.read())

    background_tasks.add_task(contentGenerator, request, filepath, query, num_questions)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "message": "Generating content"
        }
    )


@app.get("/history")
@auth_required("user")
async def history(request: Request):
    username = request.session["user"]["username"]
    user = userController.get_by_username(username)
    queries = contentController.get_history_by_user_id(user.id)
    return queries


@app.get("/content/{id}")
@auth_required("user")
async def content(request: Request, id: int):
    username = request.session["user"]["username"]
    user = userController.get_by_username(username)
    content = contentController.get_by_id(id)
    if content.user_id != user.id:
        return Response(
            status_code=status.HTTP_403_FORBIDDEN,
            content="Forbidden"
        )
    return content


@app.post("/test")
def test(request: Request, s: SearchSchema):
    url = search(s.query, num_urls=1)
    content = getPageText(url)
    return content


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
