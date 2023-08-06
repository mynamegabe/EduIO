import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from db import engine
import time

base = declarative_base()

class SearchCache(base):
    __tablename__ = 'search_cache'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    query = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)
    url = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)

    def __init__(self, query, url, content, created_at, updated_at, deleted_at):
        self.query = query
        self.url = url

while True:
    try:
        base.metadata.create_all(engine)
        break
    except:
        time.sleep(3)
        continue