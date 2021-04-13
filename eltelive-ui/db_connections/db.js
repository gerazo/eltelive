const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

module.exports = exports = mongoose;