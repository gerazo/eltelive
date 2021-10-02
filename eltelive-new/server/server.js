const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const node_media_server = require('./config/media_server');
const userRouter = require('./routers/user')

dotenv.config();
node_media_server.run();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter)





const port = process.env.NODE_JS_PORT || 4000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
})

module.exports = app; 
