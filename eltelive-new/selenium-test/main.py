import unittest
from selenium import webdriver
import page
import time
import random

from selenium.webdriver.chrome.service import Service


CHROMEDRIVER = "/home/x/Downloads/chromedriver"
s = Service(CHROMEDRIVER)

class SignUp(unittest.TestCase): #create a class for every different test case
    def setUp(self):
        self.driver = webdriver.Chrome(service = s)
        self.driver.get("http://localhost:8080/")
        self.driver.maximize_window()
    
    def test_home_page(self):
        homePage = page.HomePage(self.driver)
        assert homePage.is_title_matches()

    def test_sign_up_already_existing(self): #if you def something starting with test, unittest will recognize it
        homePage = page.HomePage(self.driver)
        homePage.click_signup_button()
        sign_up_page = page.SignUpPage(self.driver)
        assert sign_up_page.is_on_page()
        sign_up_page.given_name_element = "a"
        sign_up_page.family_name_element = "a"
        sign_up_page.email_element = "a@gmail.com"
        sign_up_page.password_element = "aaaaa"
        sign_up_page.click_submit_button()
        error_button_correct = sign_up_page.verify_notification_error_button("Email already in use")
        assert error_button_correct
        
    def test_sign_up_new(self):
        homePage = page.HomePage(self.driver)
        homePage.click_signup_button()
        sign_up_page = page.SignUpPage(self.driver)
        assert sign_up_page.is_on_page()
        sign_up_page.given_name_element = "a"
        sign_up_page.family_name_element = "a"
        randomemail = "a" + str(random.randint(1000000, 9999999)) + "@gmail.com"
        sign_up_page.email_element = randomemail
        sign_up_page.password_element = "aaaaa"
        sign_up_page.click_submit_button()
        
        log_in_page = page.LoginPage(self.driver)
        assert log_in_page.is_on_page()
        log_in_page.log_in(randomemail, "aaaaa")
        active_streams_page = page.ActiveStreamsPage(self.driver)
        assert active_streams_page.is_on_page()
    
    def test_login_page(self):
        homePage = page.HomePage(self.driver)
        homePage.click_login_button()
        log_in_page = page.LoginPage(self.driver)
        assert log_in_page.is_on_page()
        log_in_page.log_in("a@gmail.com", "aaaaa")
        active_streams_page = page.ActiveStreamsPage(self.driver)
        assert active_streams_page.is_on_page()



    def tearDown(self):
        self.driver.close()
        s.stop() #TODO get rid of the warning?

if __name__ == "__main__":
    unittest.main() #run all the unit tests we have defined

#run it with python3 main.py