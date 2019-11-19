var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
 
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transaksi_tiket'
});
  
// connect to database
dbConn.connect(); 

app.get('/', function (req, res) {
    return res.send({ error: false, message: 'hello' })
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;