-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-05-2024 a las 19:01:56
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
(1, 'Consumible 1', 1250, 1),
(2, 'Consumible 2', 4500, 2),
(3, 'Consumible 3', 4500, 4);

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
(1, 'Electricidad', 10500, 1),
(2, 'Gas', 5500, 2),
(3, 'Agua', 7000, 4);

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
(3, 'Multihilo', 200, 7),
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
  `numero_trabajador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `PARTE_CORTABLOQUES`
--

INSERT INTO `PARTE_CORTABLOQUES` (`id`, `fecha_inicio`, `fecha_fin`, `hora_inicio`, `hora_fin`, `observaciones`, `numero_trabajador`)
VALUES
    (1, '2024-05-01', '2024-05-01', '08:00:00', '12:00:00', 'Operación normal sin incidentes', 101),
    (2, '2024-05-02', '2024-05-02', '09:00:00', '13:00:00', 'Revisión de máquina antes de iniciar', 102),
    (3, '2024-05-03', '2024-05-03', '10:00:00', '14:00:00', 'Se presentaron problemas menores', 103),
    (4, '2024-05-04', '2024-05-04', '08:00:00', '11:00:00', 'Cambio de cuchillas', 104),
    (5, '2024-05-05', '2024-05-05', '07:30:00', '12:30:00', 'Mantenimiento preventivo realizado', 105),
    (6, '2024-05-06', '2024-05-06', '08:15:00', '13:15:00', 'Todo en orden', 106),
    (7, '2024-05-07', '2024-05-07', '09:00:00', '12:00:00', 'Capacitación de nuevos empleados', 107),
    (8, '2024-05-08', '2024-05-08', '08:45:00', '11:45:00', 'Falla eléctrica, reanudado trabajo a las 10:00', 108),
    (9, '2024-05-09', '2024-05-09', '10:30:00', '14:30:00', 'Inspección de seguridad realizada', 109),
    (10, '2024-05-10', '2024-05-10', '07:00:00', '11:00:00', 'Producción alcanzada sin inconvenientes', 110);


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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRABAJADOR`
--

CREATE TABLE `TRABAJADOR` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido1` varchar(255) DEFAULT NULL,
  `apellido2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TRABAJADOR`
--

INSERT INTO `TRABAJADOR` (`id`, `numero_trabajador`, `nombre`, `apellido1`, `apellido2`) VALUES
(1, 101, 'Juan', 'Pérez', 'García'),
(2, 102, 'María', 'López', 'Martínez'),
(3, 103, 'Carlos', 'González', 'Fernández'),
(4, 104, 'Pedro', 'Martínez', 'López'),
(5, 105, 'Ana', 'García', 'Hernández'),
(6, 106, 'Sara', 'Rodríguez', 'Gómez'),
(7, 107, 'Luis', 'Fernández', 'Pérez'),
(8, 108, 'Elena', 'Martín', 'González'),
(9, 109, 'Diego', 'Jiménez', 'Díaz'),
(10, 110, 'Laura', 'Díaz', 'Martínez');

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
(14, 104, 10000, 1),
(15, 105, 6000, 3),
(16, 106, 8000, 5),
(17, 107, 12000, 6),
(18, 108, 7500, 7),
(19, 109, 9500, 8);

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
(6, 'admin@admin.es', '$2b$10$hNHZCQY2IcDUWRmzv2sHUe5tXTti0O/dawCDeFH9pZwcE8gE3UXj6', 101, '2024-05-15 14:16:58', '2024-05-15 16:20:06', 'ADMIN'),
(7, 'usuario2@example.com', '$2b$10$Ee8oqt3iwvpEQphJHpW18..eMXv331Lw.3hJCWvezBAupAaTAPGty', 102, '2024-05-15 14:16:58', '2024-05-15 16:19:48', 'TRABAJADOR'),
(8, 'usuario3@example.com', 'password3', 103, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(9, 'usuario4@example.com', 'password4', 104, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(10, 'usuario5@example.com', 'password5', 105, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(11, 'usuario6@example.com', 'password6', 106, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(12, 'usuario7@example.com', 'password7', 107, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(13, 'usuario8@example.com', 'password8', 108, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(14, 'usuario9@example.com', 'password9', 109, '2024-05-15 14:16:58', NULL, 'TRABAJADOR'),
(15, 'usuario10@example.com', 'password10', 110, '2024-05-15 14:16:58', NULL, 'TRABAJADOR');

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `PARTE_CORTABLOQUES`
--
ALTER TABLE `PARTE_CORTABLOQUES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `PRODUCCION_MAQUINA`
--
ALTER TABLE `PRODUCCION_MAQUINA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `TRABAJADOR`
--
ALTER TABLE `TRABAJADOR`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `TRANSPORTE`
--
ALTER TABLE `TRANSPORTE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `USER`
--
ALTER TABLE `USER`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
-- Filtros para la tabla `PRODUCCION_MAQUINA`
--
ALTER TABLE `PRODUCCION_MAQUINA`
  ADD CONSTRAINT `produccion_maquina_ibfk_1` FOREIGN KEY (`id_parte`) REFERENCES `PARTE_CORTABLOQUES` (`id`);

--
-- Filtros para la tabla `TRABAJADOR`
--
ALTER TABLE `TRABAJADOR`
  ADD CONSTRAINT `fk_user_numero_trabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `USER` (`numero_trabajador`);

--
-- Filtros para la tabla `TRABAJADOR_COSTES`
--
ALTER TABLE `TRABAJADOR_COSTES`
  ADD CONSTRAINT `fk_trabajador_costes_numero_trabajador` FOREIGN KEY (`numero_trabajador`) REFERENCES `TRABAJADOR` (`numero_trabajador`),
  ADD CONSTRAINT `trabajador_costes_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `MAQUINA` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
