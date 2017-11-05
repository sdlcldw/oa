# Host: localhost  (Version 5.5.47)
# Date: 2017-11-05 23:45:27
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "data_bm"
#

DROP TABLE IF EXISTS `data_bm`;
CREATE TABLE `data_bm` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` smallint(6) NOT NULL DEFAULT '0' COMMENT '父Id',
  `name` varchar(24) DEFAULT NULL COMMENT '名称',
  `order` smallint(6) DEFAULT NULL COMMENT '排序',
  `userid` smallint(6) DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='学校部门';

#
# Data for table "data_bm"
#

/*!40000 ALTER TABLE `data_bm` DISABLE KEYS */;
INSERT INTO `data_bm` VALUES (1,20,'校长',NULL,NULL),(2,2,'副校长',NULL,NULL),(3,2,'副校长',NULL,NULL),(5,2,'副校长',NULL,NULL),(6,2,'副校长',NULL,NULL),(7,0,'学生科',NULL,NULL),(8,0,'教务科',NULL,NULL),(9,0,'总务科',NULL,NULL),(10,0,'督查科',NULL,NULL),(11,1,'财务科',NULL,NULL),(12,0,'工会',NULL,NULL),(13,0,'办公室',NULL,NULL),(14,0,'人事科',NULL,NULL),(15,0,'教研室',NULL,NULL),(16,0,'2017级高中部',NULL,NULL),(17,0,'2016级高中部',NULL,NULL),(18,0,'2015级高中部',NULL,NULL),(19,0,'初中年级部',NULL,NULL),(20,0,'校领导',NULL,NULL);
/*!40000 ALTER TABLE `data_bm` ENABLE KEYS */;
