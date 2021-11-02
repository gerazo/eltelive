const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {nms} = require('./config/media_server');
const userRouter = require('./routers/user')

dotenv.config();

nms.run();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)





const port = process.env.NODE_JS_PORT || 4000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})
module.exports = { app};
