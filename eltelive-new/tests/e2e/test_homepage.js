const dotenv = require("dotenv");

dotenv.config();
const localURL = `http://${process.env.VUE_APP_HOST}:8080`



describe('default e2e tests', function() {

    // // test() and specify() is also available
    before(function(browser) {
        this.homepage = browser.page.home();
    });
    it('demo test', ()=>{

        this.homepage.navigate()
            .waitForElementVisible("#app",5000)
            .end()
    });

});
