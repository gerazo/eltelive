const dotenv = require("dotenv");
dotenv.config();
module.exports = {


    url: `http://${process.env.VUE_APP_HOST}:8080/#/active-streams`,
    elements:{
            streamKey:'#key_textfield',
            streamServer:'#server_textfield',
            generateKey:"input[value='Generate Key']",
            deleteKey:"input[value='Delete Key']"
    },
    commands : [{
      selectFilter(selector,value){

      }
    }]
}
