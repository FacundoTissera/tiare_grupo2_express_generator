-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: tiare_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Remeras y Camisas'),(2,'Abrigos'),(3,'Pantalones y Shorts'),(4,'Faldas y Vestidos'),(5,'Accesorios');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Blanco'),(2,'Negro'),(3,'Tostado'),(4,'Gris'),(5,'Rojo'),(6,'Azul'),(7,'Rosa'),(8,'Verde'),(9,'Coral'),(10,'Celeste');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'En carrito'),(2,'Pagado'),(3,'Enviado'),(4,'Entregado'),(5,'En proceso de devolución'),(6,'Devuelto a tienda');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ammount` int NOT NULL,
  `order_date` date NOT NULL,
  `order_status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e2c126c9-5736-4524-ab08-d875a97e6d34` (`order_status`),
  KEY `id_user` (`user_id`),
  CONSTRAINT `FK_e2c126c9-5736-4524-ab08-d875a97e6d34` FOREIGN KEY (`order_status`) REFERENCES `order_status` (`id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_detail`
--

DROP TABLE IF EXISTS `orders_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_detail` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `stock_id` int NOT NULL,
  `items` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_45daa870-5d22-4b95-a597-837302d6dce5` (`order_id`),
  KEY `FK_306d87fe-e748-4a1e-97b4-05bac4d69cd0` (`stock_id`),
  CONSTRAINT `FK_306d87fe-e748-4a1e-97b4-05bac4d69cd0` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`),
  CONSTRAINT `FK_45daa870-5d22-4b95-a597-837302d6dce5` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_detail`
--

LOCK TABLES `orders_detail` WRITE;
/*!40000 ALTER TABLE `orders_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(1255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sale` tinyint NOT NULL,
  `category_id` int NOT NULL,
  `discount` double DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `FK_618e2a0b-0986-4a47-9784-332c32c3bf08` (`category_id`),
  CONSTRAINT `FK_618e2a0b-0986-4a47-9784-332c32c3bf08` FOREIGN KEY (`category_id`) REFERENCES `categories` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Camisa Suiza',5000,'Camisa manga larga en algodón con spandex, entallada.','camisa1_1.jpeg',1,1,0.1),(2,'Sweater Paris',4500,'Sweater amplio, cuello tortuga. Cómodo, lindo y calentito.','sweater1_1.jpeg',1,2,0),(3,'Buzo Francia',3000,'Buzo en morley, mangas largas oversize. 100% polyester.','buzo1_1.jpeg',1,2,0),(4,'Blusa España',2900,'Camisa clásica, mangas anchas, super larga. Puede usarse como vestido camisero y llevarla con toda la onda.','blusa1_1.jpeg',1,1,0),(5,'Sweater Madrid',4500,'Sweater en escote en V, tejido buclé. Talle único oversize.','sweater2_1.jpeg',1,1,0.15),(6,'Pantalón Viena',4500,'Pantalón palazzo en lanilla, con pinzas y cintura elastizada.','pantalon1_1.jpeg',1,3,0),(7,'Campera Berlin',5500,'Práctica campera abrigadísima pero con mucha onda. ','camperaBerlin1.jpeg',1,1,0),(8,'Vestido Vietnam',4900,'Vestido semi-entallado, para todas las ocasiones.','vestidoVietnam2.jpg',1,4,0),(9,'Pantalón Varsovia',4500,'Un pantalón muy cómodo, estilo Jogger.','pantalonVarsovia1.jpg',1,3,0),(10,'Vestido Montreal',4000,'Vestido supercómodo. Clásico','vestidoVietnam3.jpg',1,4,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Cliente');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(25) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'Unico'),(2,'XS'),(3,'S'),(4,'M'),(5,'L'),(6,'XL'),(7,'XXL');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Buenos Aires'),(2,'Buenos Aires-GBA'),(3,'Capital Federal'),(4,'Catamarca'),(5,'Chaco'),(6,'Chubut'),(7,'Córdoba'),(8,'Corrientes'),(9,'Entre Ríos'),(10,'Formosa'),(11,'Jujuy'),(12,'La Pampa'),(13,'La Rioja'),(14,'Mendoza'),(15,'Misiones'),(16,'Neuquén'),(17,'Río Negro'),(18,'Salta'),(19,'San Juan'),(20,'San Luis'),(21,'Santa Cruz'),(22,'Santa Fe'),(23,'Santiago del Estero'),(24,'Tierra del Fuego'),(25,'Tucumán');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `size_id` int NOT NULL,
  `color_id` int NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7a4a9b75-0467-4e9a-994b-8450b68690f5` (`size_id`),
  KEY `FK_1a966d39-980b-44d6-81f1-55e65860efee` (`color_id`),
  KEY `FK_f23550e6-7ca6-477f-b765-a6c8ed650046` (`product_id`),
  CONSTRAINT `FK_1a966d39-980b-44d6-81f1-55e65860efee` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  CONSTRAINT `FK_7a4a9b75-0467-4e9a-994b-8450b68690f5` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`Id`),
  CONSTRAINT `FK_f23550e6-7ca6-477f-b765-a6c8ed650046` FOREIGN KEY (`product_id`) REFERENCES `products` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,1,4,9,2),(2,1,5,9,1),(3,1,4,1,2),(4,1,5,9,2),(5,2,1,1,1),(6,2,1,2,2),(7,2,1,8,2),(8,3,1,10,2),(9,3,1,2,2),(12,4,3,1,2),(13,4,4,1,2),(14,4,5,2,2),(15,5,1,3,2),(16,6,4,8,1),(17,6,6,8,1),(18,7,1,10,2),(19,7,1,2,2),(20,8,2,3,2),(21,8,4,3,1),(22,9,3,3,1),(23,9,4,3,1),(24,9,3,2,1),(25,9,5,2,1),(26,9,4,5,1),(27,9,6,6,1),(28,10,3,7,1),(29,10,4,7,1),(30,10,3,2,1);
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `number` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `state_id` int NOT NULL,
  `postalCode` int NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` varchar(200) NOT NULL,
  `acepTerms` tinyint NOT NULL,
  `role_id` int,
  PRIMARY KEY (`id`),
  KEY `FK_639615f2-e250-40b7-9d3e-b42dfb2dc31e` (`state_id`),
  KEY `FK_b5c10322-842b-4473-8986-dd9b611e3241` (`role_id`),
  CONSTRAINT `FK_639615f2-e250-40b7-9d3e-b42dfb2dc31e` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`),
  CONSTRAINT `FK_b5c10322-842b-4473-8986-dd9b611e3241` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 i;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Facundo Tissera','Pasteur',3333,'Villa Maria',7,22222,123123123,'facundotiss3333asorribas@hotmail.com','$2a$10$/BrRHcdifTt/4ZmMyO2YkuvHCfrDivzPZbaJxKJT799seuL0SLMv2','1630091072130_img.jpeg',1,1),(2,'Lucas Rivero','Cullen',81,'Moron',2,1708,1133172824,'lucas.rivero93@gmail.com','$2a$10$UjfCFw60CyZw6alP0UHflurm2lDT.c0A3dUsGRivFwZWHZPdBi3X6','1630776266699_img.jpg',1,1),(3,'Beatriz Hambeck','Juramento',4389,'Villa Urquiza',1,1430,1157003426,'bhambeck@gmail.com','2a$10$tEJkjxY.X4oACRh6KumvluXFEmohNTMRwf6bWmIxhTd.FGxMCmnNy','1630782162350_img.jpeg',1,1),(4,'Ariel Barreiro','Juramento',4389,'Villa Urquiza',1,1430,123456789,'abarrei@gmail.com','$2a$10$8FPco9pXaLbKNPlDGu.ZmOc4TTOTI4eH5QBbFb31a38fO2Nx4.MBe','1630796891230_img.jpeg',1,2),(5,'Duque el Perro','San Martin',1234,'Una Ciudad',12,33333,23445672,'duque@gmail.com','$2a$10$.je9idvhMSvg3/HQ3MJDzOW1ntNuKuxws8YppbvIrX62rXSL1Fh4K','1632018788607_img.jpeg',1,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tiare_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-23 22:33:53
