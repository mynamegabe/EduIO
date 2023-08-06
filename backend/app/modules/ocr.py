import cv2 
import pytesseract
import os

pytesseract.pytesseract.tesseract_cmd = os.path.join(os.getcwd(), "deps/Tesseract-OCR/tesseract.exe")

def imageToText(filepath):

    img = cv2.imread(filepath)

    # Adding custom options
    custom_config = r'--oem 3 --psm 6'

    text = pytesseract.image_to_string(img, config=custom_config)

    return text