const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
//const path = require('path');
const routes = require('./routes');
const app = express();
const port = process.env.PORT;

/* MiddleWare  */
const guestMiddleware = require('./middleware/Guest');

app.use(bodyParser.json({limit: '200mb'}));
app.use(cors());
app.use(guestMiddleware);    
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

Object.values(routes).forEach((value) => {
    app.use(value);
});

app.listen(port, () => {
    console.log(port);
});
