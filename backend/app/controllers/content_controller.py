from models.content import Content
from sqlalchemy import select
from db import get_db

class ContentController:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        content = select(Content)
        return content
    
    def get_by_id(self, id):
        db = next(get_db())
        content = db.scalars(select(Content).where(Content.id == id)).first()
        return content
    
    def get_by_query(self, query):
        db = next(get_db())
        content = db.scalars(select(Content).where(Content.query == query)).first()
        return content
    
    def get_by_user_id(self, user_id):
        db = next(get_db())
        content = db.scalars(select(Content).where(Content.user_id == user_id)).first()
        return content
    
    def get_history_by_user_id(self, user_id):
        db = next(get_db())
        content = db.execute(select(Content.id, Content.query).where(Content.user_id == user_id).order_by(Content.id.desc()).limit(4)).all()
        tmp_content = [ {"id": i[0], "query": i[1]} for i in content ]
        return tmp_content
    
    def get_by_user_id_and_query(self, user_id, query):
        db = next(get_db())
        content = db.scalars(select(Content).where(Content.user_id == user_id).where(Content.query == query)).first()
        return content

    def create(self, content):
        db = next(get_db())
        db.add(content)
        db.commit()
        return content
    
    def update(self, id, content):
        db = next(get_db())
        db.query(Content).filter(Content.id == id).update(content)
        db.commit()
        return content
    
    def delete(self, id):
        db = next(get_db())
        db.query(Content).filter(Content.id == id).delete()
        db.commit()
        return True
    
