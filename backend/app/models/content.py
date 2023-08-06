import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from db import engine
import time

base = declarative_base()

class Content(base):
    __tablename__ = 'content'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    query = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)
    quiz_json = sqlalchemy.Column(sqlalchemy.Text(), nullable=False)
    mcq_json = sqlalchemy.Column(sqlalchemy.Text(), nullable=False)
    summary = sqlalchemy.Column(sqlalchemy.Text(), nullable=False)
    fill_the_blank_json = sqlalchemy.Column(sqlalchemy.Text(), nullable=False)
    
    def __init__(self, user_id, query, quiz_json, mcq_json, summary, fill_the_blank_json):
        self.user_id = user_id
        self.query = query
        self.quiz_json = quiz_json
        self.mcq_json = mcq_json
        self.summary = summary
        self.fill_the_blank_json = fill_the_blank_json

while True:
    try:
        base.metadata.create_all(engine)
        break
    except:
        time.sleep(3)
        continue