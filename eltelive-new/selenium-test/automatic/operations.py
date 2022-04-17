from logging import exception
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
#from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import random
from time import sleep




FIREFOXDRIVER = "/home/x/Downloads/geckodriver"
#CHROMEDRIVER = "/home/x/Downloads/chromedriver"

s = Service(FIREFOXDRIVER)
driver = webdriver.Firefox(service = s)

randomemail = "a" + str(random.randint(1000000, 9999999)) + "@gmail.com"


def reset():
    global driver
    global s
    print("Reset")
    driver.close()
    s = Service(FIREFOXDRIVER)
    driver = webdriver.Firefox(service = s)
    driver.get("http://localhost:8080/")
    driver.maximize_window()

def set_up():
    global driver
    driver.get("http://localhost:8080/")
    driver.maximize_window()

def give_input(number):
    print("Input " + str(number))
    clickable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19, 20, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32,  34]
    fillable = [17, 18, 21, 27, 33]
    id_value = ""
    text_to_input = ""
    if number in clickable:
        id_value = "selenium_" + str(number)
        click_on(id_value)
    else:
        if number in fillable:
            if number == 17: #contact
                fill_text("selenium_14", "a")
                fill_text("selenium_15", randomemail)
                fill_text("selenium_16", "selenium_test")
                click_on("selenium_17")

            if number == 18: #log in
                fill_text("email", "a@gmail.com") #TODO test the newly created e-mail too?
                #fill_text("email", randomemail)
                fill_text("password", "aaaaa") #\nTODO this is just a workaround
                click_on("selenium_18")

            if number == 21: #sign up
                fill_text("givenName", "a")
                fill_text("familyName", "a")
                fill_text("email", randomemail)
                fill_text("password", "aaaaa") #\nTODO this is just a workaround
                click_on("selenium_21")

            if number == 27: #guest listen-in
                fill_text("streamkey", "a")
                click_on("selenium_27")

            if number == 33:
                fill_text("password", "aaaaa") #TODO can you change to the same pw?
                click_on("selenium_33")

        else:
            print("No such input as " + str(number))
            driver.quit()

    get_output()

def click_on(id_value):
    try:
        element =  WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, id_value)))
        driver.execute_script("arguments[0].click();", element)
        #driver.execute_script("arguments[0].scrollIntoView(true);", element)
        #element.click() #TODO for some reason selenium can't click it even though a normal user can
        
    except Exception as e:
        print(str(e.__class__) + " No such input as " + str(id_value))
        driver.quit()    

def fill_text(id_value, text):
    try:
        element =  WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, id_value)))
        element.clear()
        element.send_keys(text)
    except Exception as e:
        print(str(e.__class__) + " No such input as " + str(id_value))
        driver.quit()

#TODO key_textfield and server_textfield might be used for output
    

def get_output():
    print("Output")
    try:
        element =  WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "[id*='selenium_output_']")))
        print(element.get_attribute("id"))
        return element.get_attribute("id")
    except Exception as e:
        print(str(e.__class__) + " No output found!")
        driver.quit()
