import urllib.request
from bs4 import BeautifulSoup

def getPageText(urls):
    for url in urls:
        try:
            content = urllib.request.urlopen(url)
            soup = BeautifulSoup(content, "html.parser")
            return soup.get_text()
        except:
            pass
    return None