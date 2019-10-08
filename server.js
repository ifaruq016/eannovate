const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const app = express();

const port = process.env.PORT || 3001;

// enable file upload
app.use(fileUpload({
  createParentPath: true
}))

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.listen(port);

console.log('API server started on: ' + port);

const productRoute = require('./backend/routes/productRoute');
productRoute(app);

