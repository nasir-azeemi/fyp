CREATE DATABASE  IF NOT EXISTS `doxa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `doxa`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: doxa
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `ideducation` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Degree` varchar(255) DEFAULT NULL,
  `Institute` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Starting_Year` varchar(255) DEFAULT NULL,
  `Ending_Year` varchar(255) DEFAULT NULL,
  `About` varchar(10000) DEFAULT NULL,
  `user_candidate_fk` int NOT NULL,
  PRIMARY KEY (`ideducation`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Undergraduate','Bachelors in Computer Science','Habib University','Karachi','2010','2015','shitty uni',1);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_candidate`
--

DROP TABLE IF EXISTS `user_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_candidate` (
  `iduser_candidate` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Contact_Number` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Job_Title` varchar(255) DEFAULT NULL,
  `Position` varchar(255) DEFAULT NULL,
  `About_Me` varchar(10000) DEFAULT NULL,
  `Facebook_Link` varchar(255) DEFAULT NULL,
  `Twitter_Link` varchar(255) DEFAULT NULL,
  `Instagram_Link` varchar(255) DEFAULT NULL,
  `Linkedin_Link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iduser_candidate`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_candidate`
--

LOCK TABLES `user_candidate` WRITE;
/*!40000 ALTER TABLE `user_candidate` DISABLE KEYS */;
INSERT INTO `user_candidate` VALUES (1,'salman','salman.younus512@gmail.com','1','03353394033','Male','Sexman','SexKing','i like pie','123','','','');
/*!40000 ALTER TABLE `user_candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `idwork_experience` int NOT NULL AUTO_INCREMENT,
  `Designation` varchar(255) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL,
  `Starting_Year` varchar(255) DEFAULT NULL,
  `Ending_Year` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Job_Responsibilities` varchar(10000) DEFAULT NULL,
  `user_candidate_fk` int NOT NULL,
  PRIMARY KEY (`idwork_experience`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (1,'Web Dev','ABC Company','2018','2021','Los Angeles','To poop',1),(2,'Wordpress Dev','DEF Company','2015','2018','Karachi','to eatt',1);
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-12 19:41:53
