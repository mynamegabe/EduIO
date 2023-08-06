FROM python:3.9.7-slim-buster

WORKDIR /app

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

# install mysql client
RUN apt-get update 
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:alex-p/tesseract-ocr-devel
RUN apt-get install -y default-libmysqlclient-dev ffmpeg libsm6 libxext6 tesseract-ocr default-mysql-client iputils-ping

COPY ./app .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]