from models.cache import SearchCache
from sqlalchemy import select
from db import get_db

class SearchCacheController:
    def __init__(self, db):
        self.db = db

    def get_all(self):
        caches = select(SearchCache)
        return caches
    
    def get_by_query(self, query):
        db = next(get_db())
        cache = db.scalars(select(SearchCache).where(SearchCache.query == query)).first()
        return cache
    
    def create(self, cache):
        db = next(get_db())
        db.add(cache)
        db.commit()
        return cache
    
    def update(self, id, cache):
        db = next(get_db())
        db.query(SearchCache).filter(SearchCache.id == id).update(cache)
        db.commit()
        return cache
    
    def delete(self, id):
        db = next(get_db())
        db.query(SearchCache).filter(SearchCache.id == id).delete()
        db.commit()
        return True
    
    