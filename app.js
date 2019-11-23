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

// DEV ----------------------------------
// var dbConn = mysql.createConnection({
//   host: 'localhost',
//   user: 'engima',
//   password: '123',
//   database: 'transaksi_tiket',
//   port: '8889'
// })

var dbConn = mysql.createConnection({
  host: '35.240.201.66',
  user: 'engima',
  password: '123',
  database: 'engima',
  port: '3306'
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
  console.log(req.body)
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

app.post('/transaksichange', async function (req, res) {
  // const trans = { account: 1, amount: 2000, start: '2019-11-19 19:10:07', end: '2019-11-19 22:10:09' }
  // await checkTrans(trans)
  // return res.send({ error: false, message: 'hello' })
  const idTrans = req.body.idTransaksi
  const status = req.body.status
  const notSufficient = !idTrans || !status
  if (notSufficient) {
    return res.status(400).send({ error: true, message: 'Please insert sufficient information' })
  } else {
    var sql = "UPDATE informasiTiket SET status = '" + status + "' WHERE idTransaksi ='" + idTrans + "'"
    dbConn.query(sql, function (error, results, fields) {
      if (error) throw error
      return res.send({ error: false, data: results, message: 'transaction list.' })
    })
  }
})

// Retrieve semua transaksi dari user dengan id = idUser
app.get('/transaksi/:id', function (req, res) {
  const idUser = req.params.id

  if (!idUser) {
    return res.status(400).send({ error: true, message: 'Please provide transaksi id' })
  }

  dbConn.query('SELECT * FROM informasiTiket where idUser=?', idUser, function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: 'transaction list.' })
  })
})

// Retrieve all taken seats
app.get('/seats/:id', function (req, res) {
  const idSched = req.params.id
  if (!idSched) {
    return res.status(400).send({ error: true, message: 'Please provide transaksi id' })
  }

  dbConn.query('SELECT seatNumber FROM informasiTiket WHERE status = "success" and idSchedule = ?', idSched, function (error, results, fields) {
    if (error) throw error
    const resp = []
    results.forEach(seat => {
      resp.push(seat.seatNumber)
    })
    return res.send({ error: false, data: resp, message: 'transaction list.' })
  })
})

// set port
app.listen(3000, function () {
  console.log('Node app is running on port 3000')
})

module.exports = app
