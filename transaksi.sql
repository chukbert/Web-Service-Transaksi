-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 19 Nov 2019 pada 08.38
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transaksi_tiket`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `informasiTiket`
--

CREATE TABLE `informasiTiket` (
  `idTransaksi` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `akun_virtual` int(11) NOT NULL,
  `idFilm` int(11) NOT NULL,
  `seatNumber` int(11) NOT NULL,
  `idSchedule` int(11) NOT NULL,
  `waktu_pemesanan` datetime NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `informasiTiket`
--

INSERT INTO `informasiTiket` (`idTransaksi`, `idUser`, `akun_virtual`, `idFilm`, `seatNumber`, `idSchedule`, `waktu_pemesanan`, `status`) VALUES
(1, 28, 1, 1, 1, 1, '2019-11-18 00:00:00', 'PENDING'),
(2, 28, 2, 1, 2, 1, '2019-11-21 00:00:00', 'SUCCES'),
(3, 27, 3, 2, 3, 1, '2019-11-19 03:00:00', 'pending\r\n');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `informasiTiket`
--
ALTER TABLE `informasiTiket`
  ADD PRIMARY KEY (`idTransaksi`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `informasiTiket`
--
ALTER TABLE `informasiTiket`
  MODIFY `idTransaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
