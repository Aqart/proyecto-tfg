-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 25-04-2024 a las 19:56:29
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `transforstone`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CONSUMIBLE`
--

CREATE TABLE `CONSUMIBLE` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `CONSUMIBLE`
--

INSERT INTO `CONSUMIBLE` (`id`, `nombre`, `precio`, `id_maquina`) VALUES
(1, 'Consumible 1', 10.5, 1),
(2, 'Consumible 2', 15.75, 2),
(3, 'Consumible 3', 20, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `GASTO_ENERGETICO`
--

CREATE TABLE `GASTO_ENERGETICO` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `coste_energia` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `GASTO_ENERGETICO`
--

INSERT INTO `GASTO_ENERGETICO` (`id`, `nombre`, `coste_energia`, `id_maquina`) VALUES
(1, 'Electricidad', 50.5, 1),
(2, 'Gas', 30.25, 2),
(3, 'Agua', 15, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `GASTO_GENERAL`
--

CREATE TABLE `GASTO_GENERAL` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `GASTO_GENERAL`
--

INSERT INTO `GASTO_GENERAL` (`id`, `nombre`, `precio`) VALUES
(1, 'Gasto General 1', 100),
(2, 'Gasto General 2', 150),
(3, 'Gasto General 3', 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MAQUINA`
--

CREATE TABLE `MAQUINA` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `produccion_m2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `MAQUINA`
--

INSERT INTO `MAQUINA` (`id`, `nombre`, `produccion_m2`) VALUES
(1, 'Máquina A', 100),
(2, 'Máquina B', 150),
(3, 'Máquina C', 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MATERIA_PRIMA`
--

CREATE TABLE `MATERIA_PRIMA` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad_m3` float DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `MATERIA_PRIMA`
--

INSERT INTO `MATERIA_PRIMA` (`id`, `nombre`, `cantidad_m3`, `precio`) VALUES
(1, 'Materia Prima 1', 50, 200),
(2, 'Materia Prima 2', 75, 300),
(3, 'Materia Prima 3', 100, 400);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRABAJADOR_COSTES`
--

CREATE TABLE `TRABAJADOR_COSTES` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TRABAJADOR_COSTES`
--

INSERT INTO `TRABAJADOR_COSTES` (`id`, `nombre`, `apellidos`, `precio`, `id_maquina`) VALUES
(1, 'Juan', 'Pérez', 15.5, 1),
(2, 'María', 'López', 18.75, 2),
(3, 'Carlos', 'González', 20, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRANSPORTE`
--

CREATE TABLE `TRANSPORTE` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TRANSPORTE`
--

INSERT INTO `TRANSPORTE` (`id`, `nombre`, `cantidad`, `precio`) VALUES
(1, 'Transporte 1', 10, 50),
(2, 'Transporte 2', 15, 75),
(3, 'Transporte 3', 20, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USER`
--

CREATE TABLE `USER` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ultima_conexion` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `roles` enum('ADMIN','TRABAJADOR') DEFAULT 'TRABAJADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `USER`
--

INSERT INTO `USER` (`id`, `email`, `password`, `numero_trabajador`, `fecha_registro`, `ultima_conexion`, `roles`) VALUES
(1, 'admin@admin.es', '$2b$10$hloTBmbT6YGMb99dGRUXGehBZMFU4OIimB7L5lfTDwYgJFriOkklq', 1, '2024-04-25 17:48:12', '2024-04-25 15:48:12', 'ADMIN'),
(2, 'emple@emple.es', '$2b$10$s6wAe/MudNYT0GID5ScLOO6dfN3HIl7HdDIntkpfoowrYmf5P9bQK', 2, '2024-04-25 17:47:27', NULL, 'TRABAJADOR');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `CONSUMIBLE`
--
ALTER TABLE `CONSUMIBLE`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `GASTO_ENERGETICO`
--
ALTER TABLE `GASTO_ENERGETICO`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `GASTO_GENERAL`
--
ALTER TABLE `GASTO_GENERAL`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `MAQUINA`
--
ALTER TABLE `MAQUINA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `MATERIA_PRIMA`
--
ALTER TABLE `MATERIA_PRIMA`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `TRANSPORTE`
--
ALTER TABLE `TRANSPORTE`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `CONSUMIBLE`
--
ALTER TABLE `CONSUMIBLE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `GASTO_ENERGETICO`
--
ALTER TABLE `GASTO_ENERGETICO`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `GASTO_GENERAL`
--
ALTER TABLE `GASTO_GENERAL`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `MAQUINA`
--
ALTER TABLE `MAQUINA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `MATERIA_PRIMA`
--
ALTER TABLE `MATERIA_PRIMA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `TRANSPORTE`
--
ALTER TABLE `TRANSPORTE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `USER`
--
ALTER TABLE `USER`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `CONSUMIBLE`
--
ALTER TABLE `CONSUMIBLE`
  ADD CONSTRAINT `consumible_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`);

--
-- Filtros para la tabla `GASTO_ENERGETICO`
--
ALTER TABLE `GASTO_ENERGETICO`
  ADD CONSTRAINT `gasto_energetico_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`);

--
-- Filtros para la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  ADD CONSTRAINT `trabajador_costes_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
