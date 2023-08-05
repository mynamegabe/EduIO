import urllib.request
from bs4 import BeautifulSoup

def getPageText(url):
    thepage = urllib.request.urlopen(url)
    soup = BeautifulSoup(thepage, "html.parser")
    return soup.get_text()
    