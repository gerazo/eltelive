# eltelive-new
The newer version of the ELTELive live streaming solution of ELTE University

## Prerequisites
You will need to download and install [Node.js] and [MongoDB] on your system.

You will have specfiy the Environment Variables that are being used in the development of the application.
Create a `.env` file, and insert your key/value pairs in the following format of `KEY=VALUE`:
```
# Back-end Environment Variables
HOST=localhost
NODE_JS_PORT=4000
SERVER_DATABASE=mongodb://localhost:27017/db
TEST_DATABASE=mongodb://localhost:27017/test
JWT_SECRET=sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk

# Front-end Environment Variables
VUE_APP_HOST=localhost
VUE_APP_NODE_JS_PORT=4000
VUE_APP_EMAIL_SERVICE_ID='service_k3wro66'
VUE_APP_EMAIL_TEMPLATE_ID='template_lm8nnls'
VUE_APP_EMAIL_USER_ID='user_UnWtOOGPoa3vHSWQRtLZQ'
```
---

## Install packages and dependencies for the project setup
```
npm install
```

---

## Front-end Command-Line Interface (CLI) commands
#### Compiles and hot-reloads for front-end development
```
npm run serve
```
#### Compiles and minifies for front-end production
```
npm run build
```
#### Lints and fixes front-end files
```
npm run lint
```
#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

## Back-end Command-Line Interface (CLI) commands
#### Running the back-end server
```
npm run server
```
#### Running the back-end server while monitoring any changes during development
```
npm run watch
```
#### Running the back-end tests
```
npm run test
```
#### Customize command-line options
See [Node.js CLI documentation](https://nodejs.org/api/cli.html).

> Note: You have to run the front-end and back-end commands in two seperate terminals.

[Node.js]: https://nodejs.org/en/download/
[MongoDB]: https://www.mongodb.com/try/download