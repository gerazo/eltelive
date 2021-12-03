from locator import *
from element import BasePageElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

class GivenNameTextElement(BasePageElement):
    locator = "givenName"

class FamilyNameTextElement(BasePageElement):
    locator = "familyName"

class EmailTextElement(BasePageElement):
    locator = "email"

class PasswordTextElement(BasePageElement):
    locator = "password"

#def verify_element(driver, locatorclass, elementname):
#        try:
#            WebDriverWait(driver, 5).until(EC.presence_of_element_located(locatorclass.elementname))
#        except:
#            return False
#        finally:
#            return True

class BasePage(object): #all pages inherit from this class
    def __init__(self, driver):
        self.driver = driver

class HomePage(BasePage):
    def is_title_matches(self):
        return "ELTELive Stream" in self.driver.title
    
    def click_signup_button(self):
        element = self.driver.find_element(*HomePageLocators.SIGNUP_BUTTON) #* to unpack, it will unpack (1,2) into 1, 2
        element.click()
    
    def click_login_button(self):
        element = self.driver.find_element(*HomePageLocators.LOGIN_BUTTON) #* to unpack, it will unpack (1,2) into 1, 2
        element.click()
    
class SignUpPage(BasePage):

    def is_on_page(self):
        try:
            WebDriverWait(self.driver, 5).until(EC.presence_of_element_located(*SignUpPageLocators.SIGN_UP_CONTAINER))
        except:
            return False
        finally:
            return True
            #TODO make it a function
        #verify_element(self.driver, *SignUpPageLocators.SIGN_UP_CONTAINER)

    given_name_element = GivenNameTextElement()
    family_name_element = FamilyNameTextElement()
    email_element = EmailTextElement()
    password_element = PasswordTextElement()

    def click_submit_button(self):
        element = self.driver.find_element(*SignUpPageLocators.SIGN_UP_BUTTON)
        element.click()

    def verify_notification_error_button(self, message):
        notifbutton = self.driver.find_element(*SignUpPageLocators.NOTIFICATION_ERROR_BUTTON)
        try:
            WebDriverWait(self.driver, 5).until(
                EC.visibility_of(notifbutton)
                )
        except:
            visible = False
            print("FALSE")
        finally:
            style = notifbutton.get_attribute("style")
            visible = (style == "display: block;")
            print(style)
            print(visible)
        buttonmsg = notifbutton.text
        message_matches = (buttonmsg == message)
        return visible & message_matches
        #given_name_element = "a"
        #given_name_element = self.driver.find_element(*SignUpPageLocators.GIVEN_NAME_FIELD)
        #given_name_element = "a"

class LoginPage(BasePage):
    def is_on_page(self):
        try:
            WebDriverWait(self.driver, 5).until(EC.presence_of_element_located(*LoginPageLocators.LOG_IN_CONTAINER))
        except:
            return False
        finally:
            return True

    email_element = EmailTextElement()
    password_element = PasswordTextElement()
    def log_in(self, email, password):
        self.email_element = email
        self.password_element = password
        try:
            WebDriverWait(self.driver, 5).until(EC.presence_of_element_located(LoginPageLocators.LOG_IN_BUTTON))
        finally:
            loginbtn = self.driver.find_element(*LoginPageLocators.LOG_IN_BUTTON)
            loginbtn.click()

class ActiveStreamsPage(BasePage):
    def is_on_page(self):
        try:
            WebDriverWait(self.driver, 5).until(EC.presence_of_element_located(*ActiveStreamsPageLocators.LOGOUT_BUTTON))
        except:
            return False
        finally:
            return True