const express = require('express'); 
const crypto = require("crypto");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const {postgres} = require("./app/Configs/database.js");
postgres.connect();

const router = require('./app/Routers/router.js');
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 