from googleapiclient.discovery import build

from config import GOOGLE_API_KEY, GOOGLE_CSE_ID
from controllers.search_cache_controller import SearchCacheController
from models.cache import SearchCache
from db import get_db

searchCacheController = SearchCacheController(get_db())

def search(search_term, fixed_search="", api_key=GOOGLE_API_KEY, cse_id=GOOGLE_CSE_ID, num_urls=1, **kwargs):
    cache = searchCacheController.get_by_query(search_term)
    if cache is None:
        service = build("customsearch", "v1", developerKey=api_key)
        res = service.cse().list(q=f"{search_term} {fixed_search}", cx=cse_id, **kwargs).execute()
        link = res['items'][0]["link"]
        new_cache = SearchCache(f"{search_term}", link, None, None, None, None)
        searchCacheController.create(new_cache)
        return link if num_urls == 1 else [result["link"] for result in res['items'][:num_urls]]
    else:
        return cache.url if num_urls == 1 else [cache.url]
