-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 14-04-2024 a las 15:08:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */


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
(1, 'Martillo neumático', 51),
(2, 'Broca de diamante', 20),
(3, 'Disco de corte', 15),
(4, 'Martillo de mano', 10),
(5, 'Guantes de seguridad', 5),
(6, 'consumible100', 12),
(7, 'consu200', 12),
(8, 'consu300', 12),
(9, 'consu400', 12),
(10, 'Categoría 5', 13),
(11, 'cat1000', 12),
(12, 'consu3000', 12234),
(13, 'cat4000', 43),
(14, 'cat5000', 434),
(15, 'Categoría 5444', 12),
(16, 'otromas', 12),
(17, 'qwdqwdqd', 123),
(18, 'Categoría 5099', 9789),
(19, 'Categoría 53', 123);

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
('DoctrineMigrations\\Version20240320182511', '2024-03-20 19:25:18', 53),
('DoctrineMigrations\\Version20240320185526', '2024-03-20 19:55:37', 41);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_energetico`
--

CREATE TABLE `gasto_energetico` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gasto_energetico`
--

INSERT INTO `gasto_energetico` (`id`, `nombre`, `precio`) VALUES
(1, 'Mantenimiento de maquinaria', 502),
(2, 'Electricidad', 300),
(3, 'Suministros de oficina', 100),
(4, 'Publicidad', 200),
(5, 'Servicios públicos', 400),
(6, 'Felipe', 2342342);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_energetico_maquina`
--

CREATE TABLE `gasto_energetico_maquina` (
  `gasto_energetico_id` int(11) NOT NULL,
  `maquina_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gasto_energetico_maquina`
--

INSERT INTO `gasto_energetico_maquina` (`gasto_energetico_id`, `maquina_id`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`) VALUES
(1, 'admin@admin.es', 'ADMIN', '$2b$10$bu39a53AzdNMb7aMzEqkoexMG00i1TUxfOsoiDvEdBllv1z5dEaaa'),
(2, 'dev@admin.es', 'ADMIN', '$2b$10$vY6RIyxOFp.1PilHUz2P4ekMZWX8goawNKffoG44.aUXiZMhgaG5W'),
(3, 'prueba@admin.es', 'ADMIN', '$2b$10$9zaX.JSmJx47OiQal28vYOxjKAeBjFP/umFaRRc638HJ2ZhBJUv6e'),
(4, 'prueba2@admin.es', 'ADMIN', '$2b$10$xIIxcEgw12JXqabfrUvRYuIXYH1DqQnlbL6Lcpc7LfgZxUrglg6K6'),
(5, 'prueba3@admin.es', 'USER', '$2b$10$ehk3IXnvrhpQcn4yq.RbpuXKJBYYznoMNTip2mWz2LRT8421JyAe2'),
(6, 'prueba5@admin.es', 'USER', '$2b$10$1FQsyifXlpKsiml0PaY0ZukfWlmLfpmhRrCPjiB7zKJN4p87ygNSu'),
(7, 'prueba6@admin.es', 'USER', '$2b$10$b8WpAb8h9o/LtavsliZXFO8vZnVvFn1lDMwQ.lrdyFQmR4pdB1.Ie'),
(8, 'prueba10@admin.es', 'USER', '$2b$10$eN/Gli9PEH2.lIzCAMzrMeeOuDo/dEW2.uU3JjTeisqFt06mGZ.am'),
(9, 'prueba11@admin.es', 'USER', '$2b$10$Jfy2rnpBl7zPUmiZwEX.fOzHg.YAeTVW.Lbdu/Q6PAFRgsWVAKqYa'),
(10, 'prueba21@admin.es', 'USER', '$2b$10$XaaHTUEvDUGrJ8Na2ooWCO7gsk3FvXXbAFstSqQZ.0aVgCNkhZpKe'),
(11, 'prueba22@admin.es', 'USER', '$2b$10$7AvFQCvszCu/P./G52c/V..IRCdN9V2kZ0hy0wBESql/rw7hWIOYC'),
(12, 'prueba23@admin.es', 'USER', '$2b$10$oFWyYJmfVTn2ELEP5fPtKeVP2pw1reN5fOHOytMVZOumqt96j.s4C'),
(13, 'prueba26@admin.es', 'USER', '$2b$10$ygkrccybhmJjIFWnc9X1u.CUV4vLoCurizfgCj1WkNf6LaOdRNOd.');

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
-- Indices de la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gasto_energetico_maquina`
--
ALTER TABLE `gasto_energetico_maquina`
  ADD PRIMARY KEY (`gasto_energetico_id`,`maquina_id`),
  ADD KEY `IDX_E7EDB15BBD6D563C` (`gasto_energetico_id`),
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
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consumible`
--
ALTER TABLE `consumible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- Filtros para la tabla `gasto_energetico_maquina`
--
ALTER TABLE `gasto_energetico_maquina`
  ADD CONSTRAINT `FK_E7EDB15B41420729` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_E7EDB15BBD6D563C` FOREIGN KEY (`gasto_energetico_id`) REFERENCES `gasto_energetico` (`id`) ON DELETE CASCADE;

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
