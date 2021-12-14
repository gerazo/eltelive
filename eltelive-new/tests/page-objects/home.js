const dotenv = require("dotenv");
dotenv.config();
module.exports = {


    url: `http://${process.env.VUE_APP_HOST}:8080`,
    elements:{
        loginButton:'.btn-primary',
        joinStreamButton:'.btn-outline-secondary'
    },
    commands : []
}
