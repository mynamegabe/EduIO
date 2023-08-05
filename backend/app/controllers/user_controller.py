from models.user import Users
from sqlalchemy import select
from db import get_db

class UserController:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        users = select(Users)
        return users
    
    def get_by_id(self, id):
        user = select(Users).where(Users.id == id)
        return user
    
    def get_by_username(self, username):
        db = next(get_db())
        user = db.scalars(select(Users).where(Users.username == username)).first()
        print(user.username)
        return user
    
    def create(self, user):
        db = next(get_db())
        db.add(user)
        db.commit()
        return user
    
    def update(self, id, user):
        db = next(get_db())
        db.query(Users).filter(Users.id == id).update(user)
        db.commit()
        return user
    
    def delete(self, id):
        db = next(get_db())
        db.query(Users).filter(Users.id == id).delete()
        db.commit()
        return True
    