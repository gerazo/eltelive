from selenium.webdriver.common.by import By

class HomePageLocators(object):
    SIGNUP_BUTTON = (By.CSS_SELECTOR, "a[href*='/signup']")
    LOGIN_BUTTON = (By.CSS_SELECTOR, "a[href*='/login']")

class SignUpPageLocators(object):
    GIVEN_NAME_FIELD = (By.ID, "givenName")
    SIGN_UP_BUTTON = (By.CSS_SELECTOR, "input[value='Sign Up']")
    NOTIFICATION_ERROR_BUTTON = (By.ID, "notificationError")
    SIGN_UP_CONTAINER = (By.CLASS_NAME, "container-sign-up" )

class LoginPageLocators(object):
    LOG_IN_CONTAINER = (By.CLASS_NAME, "container-sign-in")
    LOG_IN_BUTTON = (By.CSS_SELECTOR, "input[value='Login']")

class ActiveStreamsPageLocators(object):
    LOGOUT_BUTTON = (By.XPATH, "a[text=()='Logout'")