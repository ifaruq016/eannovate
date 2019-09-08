const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const knex = require('./backend/db.js');
const port = process.env.PORT || 3001;
const app = express();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const productRoute = require('./backend/routes/productRoute');
productRoute(app);
