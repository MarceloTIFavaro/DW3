const express = require('express');
require('dotenv').config();

const router = require('./routes/router');
 
const app = express();
const port = 40000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});