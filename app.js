require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const path = require('path');
var cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.once('connected', () => {
	console.log('Database Connected');
});
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.use(
	express.static(path.join(__dirname, 'data-visualization-tool', 'build'))
);
app.use(express.static('public'));

module.exports = app;
