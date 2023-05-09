const express = require('express'); 
const crypto = require("crypto");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
require('dotenv').config();

const {postgres,redisDB} = require("./app/Configs/database.js");
postgres.connect();
redisDB.connect();

const router = require('./app/Routers/router.js');
app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());
app.use('/', router);

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 
