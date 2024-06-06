-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-06-2024 a las 21:43:17
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
(1, 'Consumible 1', 1200.51, 1),
(2, 'Consumible 2', 4500, 1),
(3, 'Consumible 3', 4500, 7);

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
(1, 'Electricidad', 10500, 6),
(2, 'Gas', 5500, 1),
(3, 'Agua', 7000, 2);

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
(1, 'Gasto General 1', 5000),
(2, 'Gasto General 2', 5000),
(3, 'Gasto General 3', 5000),
(4, 'Marketing', 30000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MAQUINA`
--

CREATE TABLE `MAQUINA` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `produccion_m2` float DEFAULT NULL,
  `porcentaje_desperdicio` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `MAQUINA`
--

INSERT INTO `MAQUINA` (`id`, `nombre`, `produccion_m2`, `porcentaje_desperdicio`) VALUES
(1, 'Telar', 28520, 7),
(2, 'Pulidora', 28000, 1),
(4, 'Discopuente', 35000, 30),
(5, 'Monohilo', 310, 10),
(6, 'Cortabloques', 600, 30),
(7, 'Linea losa', 400, 10),
(8, 'Multidisco', 500, 40);

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
(1, 'Bloque de primera', 1426.7, 260),
(2, 'Bloque de segunda', 1576.61, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PARTE_CORTABLOQUES`
--

CREATE TABLE `PARTE_CORTABLOQUES` (
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
-- Volcado de datos para la tabla `PARTE_CORTABLOQUES`
--

INSERT INTO `PARTE_CORTABLOQUES` (`id`, `fecha_inicio`, `fecha_fin`, `hora_inicio`, `hora_fin`, `observaciones`, `numero_trabajador`, `numero_bloque`, `bis`, `retal`) VALUES
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
-- Estructura de tabla para la tabla `PRODUCCION_MAQUINA`
--

CREATE TABLE `PRODUCCION_MAQUINA` (
  `id` int(11) NOT NULL,
  `id_parte` int(11) DEFAULT NULL,
  `largo` float DEFAULT NULL,
  `ancho` float DEFAULT NULL,
  `grosor` float DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `PRODUCCION_MAQUINA`
--

INSERT INTO `PRODUCCION_MAQUINA` (`id`, `id_parte`, `largo`, `ancho`, `grosor`, `cantidad`) VALUES
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
-- Estructura de tabla para la tabla `TRABAJADOR`
--

CREATE TABLE `TRABAJADOR` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido1` varchar(255) DEFAULT NULL,
  `apellido2` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TRABAJADOR`
--

INSERT INTO `TRABAJADOR` (`id`, `numero_trabajador`, `nombre`, `apellido1`, `apellido2`, `activo`) VALUES
(1, 101, 'Juan', 'Pérez', 'García', 1),
(2, 102, 'María', 'López', 'Martínez', 1),
(3, 103, 'Carlos', 'González', 'Fernández', 1),
(4, 104, 'Pedro', 'Martínez', 'López', 1);

--
-- Disparadores `TRABAJADOR`
--
DELIMITER $$
CREATE TRIGGER `after_trabajador_update` AFTER UPDATE ON `TRABAJADOR` FOR EACH ROW BEGIN
    IF NEW.activo = FALSE THEN
        DELETE FROM TRABAJADOR_COSTES WHERE numero_trabajador = NEW.numero_trabajador;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRABAJADOR_COSTES`
--

CREATE TABLE `TRABAJADOR_COSTES` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) NOT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TRABAJADOR_COSTES`
--

INSERT INTO `TRABAJADOR_COSTES` (`id`, `numero_trabajador`, `precio`, `id_maquina`) VALUES
(11, 101, 5400, 1),
(12, 102, 14000, 2),
(13, 103, 14000, 4),
(14, 104, 10000, 8);

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
(1, 'Viaje 1', 173, 150),
(2, 'Viaje 2', 200, 150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USER`
--

CREATE TABLE `USER` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_conexion` timestamp NULL DEFAULT NULL,
  `roles` enum('ADMIN','TRABAJADOR') DEFAULT 'TRABAJADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `USER`
--

INSERT INTO `USER` (`id`, `email`, `password`, `numero_trabajador`, `fecha_registro`, `ultima_conexion`, `roles`) VALUES
(6, 'admin@admin.es', '$2b$10$hNHZCQY2IcDUWRmzv2sHUe5tXTti0O/dawCDeFH9pZwcE8gE3UXj6', 101, '2024-05-15 08:16:58', '2024-06-03 14:50:19', 'ADMIN'),
(7, 'usuario2@example.com', '$2b$10$Ee8oqt3iwvpEQphJHpW18..eMXv331Lw.3hJCWvezBAupAaTAPGty', 102, '2024-05-15 08:16:58', '2024-05-29 12:09:43', 'TRABAJADOR'),
(8, 'usuario3@example.com', '$2b$10$xHy1yDJNL09tsQWOCaWFhuKY6SQi2HUdZk.EWW8EipglRlkT9dMZm', 103, '2024-05-15 08:16:58', '2024-05-15 11:36:10', 'TRABAJADOR'),
(9, 'pedro@sueloparaexterior.com', '$2b$10$qvuT493HkvvuTXUhW2MsMO/uhuopby8cuVMeEZvw5jkUXtmoyL.7i', 104, '2024-05-15 08:16:58', '2024-05-29 16:35:23', 'TRABAJADOR');

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
-- Indices de la tabla `PARTE_CORTABLOQUES`
--
ALTER TABLE `PARTE_CORTABLOQUES`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_parte_cortabloques_numero_trabajador` (`numero_trabajador`);

--
-- Indices de la tabla `PRODUCCION_MAQUINA`
--
ALTER TABLE `PRODUCCION_MAQUINA`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_parte` (`id_parte`);

--
-- Indices de la tabla `TRABAJADOR`
--
ALTER TABLE `TRABAJADOR`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_trabajador_UNIQUE` (`numero_trabajador`);

--
-- Indices de la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`),
  ADD KEY `fk_trabajador_costes_numero_trabajador` (`numero_trabajador`);

--
-- Indices de la tabla `TRANSPORTE`
--
ALTER TABLE `TRANSPORTE`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_numero_trabajador` (`numero_trabajador`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `MAQUINA`
--
ALTER TABLE `MAQUINA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `MATERIA_PRIMA`
--
ALTER TABLE `MATERIA_PRIMA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `PARTE_CORTABLOQUES`
--
ALTER TABLE `PARTE_CORTABLOQUES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `PRODUCCION_MAQUINA`
--
ALTER TABLE `PRODUCCION_MAQUINA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `TRABAJADOR`
--
ALTER TABLE `TRABAJADOR`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `TRANSPORTE`
--
ALTER TABLE `TRANSPORTE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `USER`
--
ALTER TABLE `USER`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `CONSUMIBLE`
--
ALTER TABLE `CONSUMIBLE`
  ADD CONSTRAINT `CONSUMIBLE_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`);

--
-- Filtros para la tabla `GASTO_ENERGETICO`
--
ALTER TABLE `GASTO_ENERGETICO`
  ADD CONSTRAINT `GASTO_ENERGETICO_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`);

--
-- Filtros para la tabla `PARTE_CORTABLOQUES`
--
ALTER TABLE `PARTE_CORTABLOQUES`
  ADD CONSTRAINT `fk_parte_cortabloques_numero_trabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `TRABAJADOR` (`numero_trabajador`);

--
-- Filtros para la tabla `PRODUCCION_MAQUINA`
--
ALTER TABLE `PRODUCCION_MAQUINA`
  ADD CONSTRAINT `PRODUCCION_MAQUINA_ibfk_1` FOREIGN KEY (`id_parte`) REFERENCES `PARTE_CORTABLOQUES` (`id`);

--
-- Filtros para la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  ADD CONSTRAINT `TRABAJADOR_COSTES_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`),
  ADD CONSTRAINT `fk_trabajador_costes_numero_trabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `TRABAJADOR` (`numero_trabajador`);

--
-- Filtros para la tabla `USER`
--
ALTER TABLE `USER`
  ADD CONSTRAINT `USER_ibfk_1` FOREIGN KEY (`numero_trabajador`) REFERENCES `TRABAJADOR` (`numero_trabajador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;