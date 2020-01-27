SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
DROP USER IF EXISTS 'admin'; 
CREATE USER 'admin'@'%'; 
CREATE DATABASE IF NOT EXISTS order_service; 
GRANT ALL ON order_service.* TO 'admin'@'%' IDENTIFIED BY '123456';
CREATE DATABASE IF NOT EXISTS order_service_test; 
GRANT ALL ON order_service_test.* TO 'admin'@'%' IDENTIFIED BY '123456';

USE `order_service`;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_latitude` varchar(255) DEFAULT NULL,
  `start_longitude` varchar(255) DEFAULT NULL,
  `end_latitude` varchar(255) DEFAULT NULL,
  `end_longitude` varchar(255) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

USE `order_service_test`;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_latitude` varchar(255) DEFAULT NULL,
  `start_longitude` varchar(255) DEFAULT NULL,
  `end_latitude` varchar(255) DEFAULT NULL,
  `end_longitude` varchar(255) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
