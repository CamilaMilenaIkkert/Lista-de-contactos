DROP TABLE IF EXISTS `empleados`;
CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  PRIMARY KEY (`id_empleado`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `empleados` WRITE;
INSERT INTO `empleados` (`nombre`, `apellido`, `dni`, `mail`) VALUES 
('Camila','Ikkert',12345678,'camila@example.com'),
('Juan','Pérez',23456789,'juan@example.com'),
('María','López',34567890,'maria@example.com'),
('Matias','Rodriguez',45678901,'matias@example.com');
UNLOCK TABLES;

