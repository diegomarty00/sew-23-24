-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2023 a las 20:37:21
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `records`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` varchar(62) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(62) COLLATE utf8_spanish_ci NOT NULL,
  `nivel` int(11) NOT NULL,
  `tiempo` varchar(62) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`nombre`, `apellidos`, `nivel`, `tiempo`) VALUES
('Diego', 'Martinez Menendez', 3, '00:00:24'),
('Diego', 'Marty', 3, '00:00:41'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Gray', 'Diaz', 3, '00:01:04'),
('Diego_Marty', 'Marty', 3, '00:01:00'),
('Diego_Marty', 'Marty', 3, '00:01:00'),
('Diego_Marty', 'Marty', 3, '00:01:00'),
('Diego', 'Marty', 3, '00:00:27'),
('', '', 3, '00:00:15'),
('', '', 3, '00:00:26'),
('Sara', 'Martinez', 3, '00:00:42'),
('Sara', 'Martinez', 3, '00:00:42'),
('Diego', 'Marty', 3, '00:00:38');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
