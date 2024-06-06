-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 05-06-2024 a las 17:49:25
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
-- Estructura de tabla para la tabla `consumible`
--

CREATE TABLE `consumible` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consumible`
--

INSERT INTO `consumible` (`id`, `nombre`, `precio`, `id_maquina`) VALUES
(1, 'consumible 1', 1200.51, 1),
(2, 'consumible 2', 4500, 1),
(3, 'consumible 3', 4500, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_energetico`
--

CREATE TABLE `gasto_energetico` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `coste_energia` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gasto_energetico`
--

INSERT INTO `gasto_energetico` (`id`, `nombre`, `coste_energia`, `id_maquina`) VALUES
(1, 'Electricidad', 10500, 6),
(2, 'Gas', 5500, 1),
(3, 'Agua', 7000, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_general`
--

CREATE TABLE `gasto_general` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gasto_general`
--

INSERT INTO `gasto_general` (`id`, `nombre`, `precio`) VALUES
(1, 'Gasto General 1', 5000),
(2, 'Gasto General 2', 5000),
(3, 'Gasto General 3', 5000),
(4, 'Marketing', 30000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquina`
--

CREATE TABLE `maquina` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `produccion_m2` float DEFAULT NULL,
  `porcentaje_desperdicio` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maquina`
--

INSERT INTO `maquina` (`id`, `nombre`, `produccion_m2`, `porcentaje_desperdicio`) VALUES
(1, 'Telar', 28520, 7),
(2, 'Pulidora', 28000, 1),
(4, 'Discopuente', 35000, 30),
(5, 'Monohilo', 310, 10),
(6, 'Cortabloques', 600, 30),
(7, 'Linea losa', 400, 10),
(8, 'Multidisco', 500, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_prima`
--

CREATE TABLE `materia_prima` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad_m3` float DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia_prima`
--

INSERT INTO `materia_prima` (`id`, `nombre`, `cantidad_m3`, `precio`) VALUES
(1, 'Bloque de primera', 1426.7, 260),
(2, 'Bloque de segunda', 1576.61, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parte_cortabloques`
--

CREATE TABLE `parte_cortabloques` (
  `id` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `numero_bloque` int(5) DEFAULT NULL,
  `bis` tinyint(1) NOT NULL DEFAULT 0,
  `retal` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `parte_cortabloques`
--

INSERT INTO `parte_cortabloques` (`id`, `fecha_inicio`, `fecha_fin`, `hora_inicio`, `hora_fin`, `observaciones`, `numero_trabajador`, `numero_bloque`, `bis`, `retal`) VALUES
(1, '2024-05-15', '2024-05-16', '08:00:00', '09:00:00', 'Observaciones prueba', 101, 111111, 0, 0),
(2, '2024-05-15', '2024-05-15', '08:00:00', '13:00:00', 'Observaciones prueba', 102, 222222, 0, 0),
(3, '2024-05-14', '2024-05-14', '08:00:00', '13:00:00', 'Observaciones prueba', 103, 333333, 0, 0),
(4, '2024-05-15', '2024-05-17', '08:00:00', '16:00:00', 'Observaciones prueba', 104, NULL, 0, 1),
(5, '2024-05-28', '2024-05-28', '13:55:00', '13:55:00', 'hakfhsdkf', 101, NULL, 0, 1),
(6, '2024-05-29', '2024-05-29', '12:23:00', '15:23:00', 'observación de prueba', 101, 45678, 1, 0),
(7, '2024-05-29', '2024-05-29', '16:55:00', '20:55:00', 'observación del trabajador pedro', 104, 87654, 1, 0),
(8, '2024-05-29', '2024-05-29', '17:46:00', '17:46:00', 'Sgnwgbdgb', 101, 12986, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion_maquina`
--

CREATE TABLE `produccion_maquina` (
  `id` int(11) NOT NULL,
  `id_parte` int(11) DEFAULT NULL,
  `largo` float DEFAULT NULL,
  `ancho` float DEFAULT NULL,
  `grosor` float DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `produccion_maquina`
--

INSERT INTO `produccion_maquina` (`id`, `id_parte`, `largo`, `ancho`, `grosor`, `cantidad`) VALUES
(9, 1, 100, 50, 10, 10),
(10, 1, 200, 100, 20, 5),
(11, 2, 100, 50, 10, 10),
(12, 2, 200, 100, 20, 5),
(13, 3, 100, 50, 10, 10),
(14, 3, 200, 100, 20, 5),
(15, 4, 100, 50, 10, 10),
(16, 4, 200, 100, 20, 5),
(17, 5, 1, 1, 2, 3),
(18, 6, 120, 65, 3, 13),
(19, 7, 123, 59.5, 2, 10),
(20, 8, 12, 10, 14, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido1` varchar(255) DEFAULT NULL,
  `apellido2` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajador`
--

INSERT INTO `trabajador` (`id`, `numero_trabajador`, `nombre`, `apellido1`, `apellido2`, `activo`) VALUES
(1, 101, 'Juan', 'Pérez', 'García', 1),
(2, 102, 'María', 'López', 'Martínez', 1),
(3, 103, 'Carlos', 'González', 'Fernández', 1),
(4, 104, 'Pedro', 'Martínez', 'López', 1),
(7, 105, 'Usuario', 'Cinco', 'Cinco', 1),
(8, 106, 'Usuario', 'Seis', 'Seis', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador_costes`
--

CREATE TABLE `trabajador_costes` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) NOT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajador_costes`
--

INSERT INTO `trabajador_costes` (`id`, `numero_trabajador`, `precio`, `id_maquina`) VALUES
(11, 101, 5400, 1),
(12, 102, 14000, 2),
(13, 103, 14000, 4),
(14, 104, 10000, 2),
(17, 105, 3000, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte`
--

CREATE TABLE `transporte` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id`, `nombre`, `cantidad`, `precio`) VALUES
(1, 'Viaje 1', 173, 150),
(2, 'Viaje 2', 200, 150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_conexion` timestamp NULL DEFAULT NULL,
  `roles` enum('ADMIN','TRABAJADOR') DEFAULT 'TRABAJADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `numero_trabajador`, `fecha_registro`, `ultima_conexion`, `roles`) VALUES
(6, 'admin@admin.es', '$2b$10$c2Zs3zhkY0gZTaNC5HJHxOZ3nCGvLAWWAq9svtrOnWd3ZBAXPph2a', 101, '2024-05-15 08:16:58', '2024-06-05 15:03:38', 'ADMIN'),
(7, 'usuario2@example.com', '$2b$10$Ee8oqt3iwvpEQphJHpW18..eMXv331Lw.3hJCWvezBAupAaTAPGty', 102, '2024-05-15 08:16:58', '2024-05-29 12:09:43', 'TRABAJADOR'),
(8, 'usuario3@example.com', '$2b$10$xHy1yDJNL09tsQWOCaWFhuKY6SQi2HUdZk.EWW8EipglRlkT9dMZm', 103, '2024-05-15 08:16:58', '2024-05-15 11:36:10', 'TRABAJADOR'),
(9, 'pedro@sueloparaexterior.com', '$2b$10$qvuT493HkvvuTXUhW2MsMO/uhuopby8cuVMeEZvw5jkUXtmoyL.7i', 104, '2024-05-15 08:16:58', '2024-05-29 16:35:23', 'TRABAJADOR'),
(14, 'usuario5@example.com', '$2b$10$6W1EYxVrO4f9El.hSaovsO6XfNGJ9XVwx95Frzq7SBfNJCanpJE4K', 105, '2024-06-05 15:34:15', NULL, 'TRABAJADOR'),
(15, 'usuario6@example.com', '$2b$10$syL3Buxdii8FpOvSQeMBgO2.M0t/9n8jeuyvmWVvMwGXHUBT0i8Ou', 106, '2024-06-05 15:47:35', NULL, 'TRABAJADOR');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consumible`
--
ALTER TABLE `consumible`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `gasto_general`
--
ALTER TABLE `gasto_general`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `maquina`
--
ALTER TABLE `maquina`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `parte_cortabloques`
--
ALTER TABLE `parte_cortabloques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_parte_cortabloques_numero_trabajador` (`numero_trabajador`);

--
-- Indices de la tabla `produccion_maquina`
--
ALTER TABLE `produccion_maquina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_parte` (`id_parte`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_trabajador_UNIQUE` (`numero_trabajador`);

--
-- Indices de la tabla `trabajador_costes`
--
ALTER TABLE `trabajador_costes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`),
  ADD KEY `fk_trabajador_costes_numero_trabajador` (`numero_trabajador`);

--
-- Indices de la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_numero_trabajador` (`numero_trabajador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consumible`
--
ALTER TABLE `consumible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `gasto_general`
--
ALTER TABLE `gasto_general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `maquina`
--
ALTER TABLE `maquina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `parte_cortabloques`
--
ALTER TABLE `parte_cortabloques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `produccion_maquina`
--
ALTER TABLE `produccion_maquina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `trabajador_costes`
--
ALTER TABLE `trabajador_costes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consumible`
--
ALTER TABLE `consumible`
  ADD CONSTRAINT `consumible_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  ADD CONSTRAINT `gasto_energetico_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `parte_cortabloques`
--
ALTER TABLE `parte_cortabloques`
  ADD CONSTRAINT `fk_parte_cortabloques_numero_trabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `trabajador` (`numero_trabajador`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `produccion_maquina`
--
ALTER TABLE `produccion_maquina`
  ADD CONSTRAINT `produccion_maquina_ibfk_1` FOREIGN KEY (`id_parte`) REFERENCES `parte_cortabloques` (`id`);

--
-- Filtros para la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD CONSTRAINT `fk_trabaj_user_numtrabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `user` (`numero_trabajador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `trabajador_costes`
--
ALTER TABLE `trabajador_costes`
  ADD CONSTRAINT `trabajador_costes_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_trabajador_costes_numero_trabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `trabajador` (`numero_trabajador`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
