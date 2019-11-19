var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
// connection configurations
// var dbConn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'transaksi_tiket'
// })

var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'engima',
  password: '123',
  database: 'transaksi_tiket',
  port: '8889'
})

// connect to database
dbConn.connect()

app.get('/', function (req, res) {
  return res.send({ error: false, message: 'hello' })
})

// Menambah transaksi baru dengan status “Pending”.
// Input yang diberikan adalah id pengguna, id film, kursi yang dipilih,
// dan nomor akun virtual yang menjadi tujuan pembayaran.
// Layanan mengembalikan id transaksi.
app.post('/transaksi', function (req, res) {
  const idUser = req.body.idUser
  const idFilm = req.body.idFilm
  const seatNumber = req.body.seatNumber
  const akunVirtual = req.body.akunVirtual
  const idSchedule = req.body.idSchedule
  const waktu = req.body.waktu
  const status = req.body.status
  const notransaksi = !idUser || !idFilm || !seatNumber || !akunVirtual || !idSchedule || !waktu || !status
  if (notransaksi) {
    return res.status(400).send({ error: true, message: 'Please insert transaksi' })
  }
  var sql = 'INSERT INTO informasiTiket (idUser, akun_virtual, idFilm, seatNumber, idSchedule, waktu_pemesanan, status) VALUES ? '
  var values = [[idUser, akunVirtual, idFilm, seatNumber, idSchedule, waktu, status]]

  dbConn.query(sql, [values], function (error, results, fields) {
    if (error) throw error
    return res.send({ id: results.insertId })
  })
})

// set port
app.listen(3000, function () {
  console.log('Node app is running on port 3000')
})

module.exports = app
