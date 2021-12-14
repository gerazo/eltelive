

describe('test if active stream page is loaded ', function() {

    // // test() and specify() is also available
    this.tags = ['feedback', 'authentication'];
    before(function(browser) {
        const login = browser.page.login();

        login
            .navigate()
            .login()
        this.activeStreamPage = browser.page.activeStream();
    });
    it('demo test', ()=>{

        this.activeStreamPage
            .navigate()
            .waitForElementVisible('body', 5000)
            .assert.containsText('@streamKey','')
            .assert.containsText('@streamServer','')
            .saveScreenshot('tests_output/snapshot.png')
            .end()
    });

});
