-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-03-2024 a las 19:43:11
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
-- Base de datos: `proyecto-tfg`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consumible`
--

CREATE TABLE `consumible` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `consumible`
--

INSERT INTO `consumible` (`id`, `nombre`, `precio`) VALUES
(1, 'Martillo neumático', 50),
(2, 'Broca de diamante', 20),
(3, 'Disco de corte', 15),
(4, 'Martillo de mano', 10),
(5, 'Guantes de seguridad', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consumible_maquina`
--

CREATE TABLE `consumible_maquina` (
  `consumible_id` int(11) NOT NULL,
  `maquina_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `consumible_maquina`
--

INSERT INTO `consumible_maquina` (`consumible_id`, `maquina_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 5),
(4, 1),
(4, 3),
(5, 3),
(5, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240318174131', '2024-03-18 18:42:00', 24),
('DoctrineMigrations\\Version20240318175046', '2024-03-18 18:51:47', 14),
('DoctrineMigrations\\Version20240318175231', '2024-03-18 18:53:50', 11),
('DoctrineMigrations\\Version20240318184503', '2024-03-18 19:46:37', 27),
('DoctrineMigrations\\Version20240320174547', '2024-03-20 18:47:21', 43),
('DoctrineMigrations\\Version20240320175008', '2024-03-20 18:50:13', 19),
('DoctrineMigrations\\Version20240320180252', '2024-03-20 19:02:57', 153),
('DoctrineMigrations\\Version20240320181029', '2024-03-20 19:15:19', 23),
('DoctrineMigrations\\Version20240320181513', '2024-03-20 19:16:57', 71),
('DoctrineMigrations\\Version20240320182249', '2024-03-20 19:22:54', 67),
('DoctrineMigrations\\Version20240320182511', '2024-03-20 19:25:18', 53);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_general`
--

CREATE TABLE `gasto_general` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gasto_general`
--

INSERT INTO `gasto_general` (`id`, `nombre`, `precio`) VALUES
(1, 'Mantenimiento de maquinaria', 500),
(2, 'Electricidad', 300),
(3, 'Suministros de oficina', 100),
(4, 'Publicidad', 200),
(5, 'Servicios públicos', 400);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_general_maquina`
--

CREATE TABLE `gasto_general_maquina` (
  `gasto_general_id` int(11) NOT NULL,
  `maquina_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gasto_general_maquina`
--

INSERT INTO `gasto_general_maquina` (`gasto_general_id`, `maquina_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquina`
--

CREATE TABLE `maquina` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `produccion_m2` double DEFAULT NULL,
  `energia_consumida` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `maquina`
--

INSERT INTO `maquina` (`id`, `nombre`, `produccion_m2`, `energia_consumida`) VALUES
(1, 'Telar', 0, 0),
(2, 'Trituradora de piedra', 100, 10),
(3, 'Horno rotatorio', 50, 5),
(4, 'Mezcladora de cemento', 75, 8),
(5, 'Prensa hidráulica', 80, 7),
(6, 'Cortadora de bloques', 120, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_prima`
--

CREATE TABLE `materia_prima` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `coste_total` double DEFAULT NULL,
  `cantidad_m3` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `materia_prima`
--

INSERT INTO `materia_prima` (`id`, `nombre`, `coste_total`, `cantidad_m3`) VALUES
(1, 'Piedra caliza', 50, 100),
(2, 'Arena', 30, 150),
(3, 'Cemento', 40, 120),
(4, 'Agua', 20, 80),
(5, 'Aditivos', 10, 90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) NOT NULL,
  `precio` double DEFAULT NULL,
  `produccion` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `trabajador`
--

INSERT INTO `trabajador` (`id`, `nombre`, `apellido1`, `apellido2`, `precio`, `produccion`) VALUES
(1, 'Arfonfo', 'Sanchez', 'Costa', 0, 0),
(2, 'Juan', 'Pérez', 'González', 15, 50),
(3, 'María', 'López', 'Sánchez', 18, 60),
(4, 'Carlos', 'Martínez', 'Rodríguez', 20, 70),
(5, 'Ana', 'García', 'Fernández', 17, 55),
(6, 'Pedro', 'Díaz', 'Martínez', 16, 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador_maquina`
--

CREATE TABLE `trabajador_maquina` (
  `trabajador_id` int(11) NOT NULL,
  `maquina_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `trabajador_maquina`
--

INSERT INTO `trabajador_maquina` (`trabajador_id`, `maquina_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte`
--

CREATE TABLE `transporte` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `unidades_mes` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id`, `nombre`, `unidades_mes`, `precio`) VALUES
(1, 'Envío de piedra caliza', 100, 200),
(2, 'Envío de arena', 150, 250),
(3, 'Envío de cemento', 120, 220),
(4, 'Envío de agua', 200, 300),
(5, 'Envío de aditivos', 180, 280);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte_materia_prima`
--

CREATE TABLE `transporte_materia_prima` (
  `transporte_id` int(11) NOT NULL,
  `materia_prima_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `transporte_materia_prima`
--

INSERT INTO `transporte_materia_prima` (`transporte_id`, `materia_prima_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consumible`
--
ALTER TABLE `consumible`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `consumible_maquina`
--
ALTER TABLE `consumible_maquina`
  ADD PRIMARY KEY (`consumible_id`,`maquina_id`),
  ADD KEY `IDX_2DFD25099AA59506` (`consumible_id`),
  ADD KEY `IDX_2DFD250941420729` (`maquina_id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `gasto_general`
--
ALTER TABLE `gasto_general`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gasto_general_maquina`
--
ALTER TABLE `gasto_general_maquina`
  ADD PRIMARY KEY (`gasto_general_id`,`maquina_id`),
  ADD KEY `IDX_E7EDB15BBD6D563C` (`gasto_general_id`),
  ADD KEY `IDX_E7EDB15B41420729` (`maquina_id`);

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
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajador_maquina`
--
ALTER TABLE `trabajador_maquina`
  ADD PRIMARY KEY (`trabajador_id`,`maquina_id`),
  ADD KEY `IDX_5BAEF7AEEC3656E` (`trabajador_id`),
  ADD KEY `IDX_5BAEF7AE41420729` (`maquina_id`);

--
-- Indices de la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transporte_materia_prima`
--
ALTER TABLE `transporte_materia_prima`
  ADD PRIMARY KEY (`transporte_id`,`materia_prima_id`),
  ADD KEY `IDX_66BC5E924FC919A` (`transporte_id`),
  ADD KEY `IDX_66BC5E934282814` (`materia_prima_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consumible`
--
ALTER TABLE `consumible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `gasto_general`
--
ALTER TABLE `gasto_general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `maquina`
--
ALTER TABLE `maquina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consumible_maquina`
--
ALTER TABLE `consumible_maquina`
  ADD CONSTRAINT `FK_2DFD250941420729` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_2DFD25099AA59506` FOREIGN KEY (`consumible_id`) REFERENCES `consumible` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `gasto_general_maquina`
--
ALTER TABLE `gasto_general_maquina`
  ADD CONSTRAINT `FK_E7EDB15B41420729` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_E7EDB15BBD6D563C` FOREIGN KEY (`gasto_general_id`) REFERENCES `gasto_general` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `trabajador_maquina`
--
ALTER TABLE `trabajador_maquina`
  ADD CONSTRAINT `FK_5BAEF7AE41420729` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_5BAEF7AEEC3656E` FOREIGN KEY (`trabajador_id`) REFERENCES `trabajador` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `transporte_materia_prima`
--
ALTER TABLE `transporte_materia_prima`
  ADD CONSTRAINT `FK_66BC5E924FC919A` FOREIGN KEY (`transporte_id`) REFERENCES `transporte` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_66BC5E934282814` FOREIGN KEY (`materia_prima_id`) REFERENCES `materia_prima` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
