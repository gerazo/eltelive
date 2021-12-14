const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    url: `http://${process.env.VUE_APP_HOST}:8080//login#/login`,
    elements: {
        email:'#email',
        password:'#password',
        loginButton:'input[type=submit]'
    },
    commands: [{
        setCredentials(email,password) {
            return this
                .setValue('@email', email)
                .setValue('@password',password);
        },
        clickLogin() {
            return this
                .click('@loginButton');
        },
        login(){
            return this.waitForElementVisible('body', 1000)
                .verify.visible('@email')
                .verify.visible('@password')
                .verify.visible('input[type=submit]')
                .maximizeWindow()
                .setValue('@email', 'test2@test.com')
                .setValue('@password', 'test12345')
                .waitForElementPresent('@loginButton',5000)
                .click('@loginButton')
                .click('@loginButton')
                .waitForElementVisible('body', 2000)
        }
    }]
};
