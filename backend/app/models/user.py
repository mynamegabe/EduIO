# import declarativebase from sqlalchemy
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from db import engine
import time

base = declarative_base()

class Users(base):
    __tablename__ = 'users'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    username = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)
    password = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)
    email = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)
    role = sqlalchemy.Column(sqlalchemy.String(255), nullable=False)
    created_at = sqlalchemy.Column(sqlalchemy.DateTime, nullable=False)
    updated_at = sqlalchemy.Column(sqlalchemy.DateTime, nullable=False)
    deleted_at = sqlalchemy.Column(sqlalchemy.DateTime, nullable=True)

    def __init__(self, username, password, email, role, created_at, updated_at, deleted_at):
        self.username = username
        self.password = password
        self.email = email
        self.role = role
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at

while True:
    try:
        base.metadata.create_all(engine)
        break
    except:
        time.sleep(3)
        continue