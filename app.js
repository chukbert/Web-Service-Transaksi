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

// Menambah transaksi baru dengan status “Pending”. 
//Input yang diberikan adalah id pengguna, id film, kursi yang dipilih, 
//dan nomor akun virtual yang menjadi tujuan pembayaran. 
//Layanan mengembalikan id transaksi.
app.post('/transaksi', function (req, res) {
    //     console.log(req);
        let idUser = req.body.idUser;
        let idFilm = req.body.idFilm;
        let seatNumber = req.body.seatNumber;
        let akun_virtual = req.body.akun_virtual;
        let idSchedule = req.body.idSchedule;
        let waktu = req.body.waktu;
        let status = req.body.status;
        let notransaksi = !idUser || !idFilm || !seatNumber || !akun_virtual || !idSchedule || !waktu || !status; 
        if (notransaksi) {
            return res.status(400).send({ error:true, message: 'Please insert transaksi' });
        }
        
        var sql = "INSERT INTO informasiTiket (idUser, akun_virtual, idFilm, seatNumber, idSchedule, waktu_pemesanan, status) VALUES ? ";
        var values = [[idUser, akun_virtual, idFilm, seatNumber, idSchedule, waktu, status]]

        dbConn.query(sql,[values], function (error, results, fields) {
            if (error) throw error;
            return res.send({ id:results["insertId"]});
        });
    })

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;