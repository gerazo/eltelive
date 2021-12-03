from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

class BasePageElement(object):
    def __set__(self, obj, value):
        driver = obj.driver
        WebDriverWait(driver, 100).until( #wait 100 sec until this is true
            lambda driver: driver.find_element(By.ID, self.locator))
        driver.find_element(By.ID, self.locator).clear()
        driver.find_element(By.ID, self.locator).send_keys(value) #if we want to set the element's value, like a search bar or a form

    def __get__(self, obj, owner):
        driver = obj.driver
        WebDriverWait(driver, 100).until( #wait 100 sec until this is true
            lambda driver: driver.find_element(By.ID, self.locator))
        element = driver.find_element(By.ID, self.locator)
        return element.get_attribute("value")