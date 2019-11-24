# Web Service Transaksi

Web service Transaksi memiliki basis data tersendiri yang memiliki informasi transaksi tiket film setiap pengguna Engima. Informasi transaksi adalah id pengguna, nomor akun virtual tujuan, id film, jadwal film, kursi yang dipesan, waktu pembuatan transaksi, dan status transaksi.

## Ada tiga status pembayaran sebuah transaksi tiket film sebagai berikut.
1. Pending: tiket belum dibayar namun belum lewat dari masa berlaku transaksi.
2. Cancelled: tiket belum dibayar dan sudah lewat dari masa berlaku transaksi. Status kursi yang dipesan pada transaksi dengan status cancelled menjadi tersedia kembali.
3. Success: tiket sudah dibayar sebelum masa berlaku transaksi.

## Berikut layanan yang disediakan oleh web service ini:
1. Menambah transaksi baru dengan status “Pending”. Input yang diberikan adalah id pengguna, id film, kursi yang dipilih, dan nomor akun virtual yang menjadi tujuan pembayaran. Layanan mengembalikan id transaksi.
2. Mengubah status suatu transaksi menjadi status “Success” atau “Cancelled”. Input yang diberikan adalah id transaksi.
3. Mengembalikan seluruh data transaksi pembelian film seorang pengguna Engima.

## Basis data yang digunakan pada Web Service Transaksi :
'''
`informasiTiket` (`idTransaksi`, `idUser`, `akun_virtual`, `idFilm`, `seatNumber`, `idSchedule`, `waktu_pemesanan`, `status`)
'''

Link deploymeny : [WS-Transaksi](http://13.229.224.101:3000)

### Note : script testing di branch develop