# Host: localhost  (Version 5.5.53)
# Date: 2018-03-03 14:43:25
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "home_ssb"
#

DROP TABLE IF EXISTS `home_ssb`;
CREATE TABLE `home_ssb` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nr` varchar(255) DEFAULT NULL COMMENT '建议内容',
  `xs_id` smallint(6) DEFAULT NULL COMMENT '学生id',
  `tjsj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='平台建议';

#
# Data for table "home_ssb"
#

/*!40000 ALTER TABLE `home_ssb` DISABLE KEYS */;
INSERT INTO `home_ssb` VALUES (1,'12312312312312',5,'2018-01-20 17:42:06'),(3,'123123123123',252,'2018-01-01 10:16:16'),(4,'阿斯顿发生的法师打发斯蒂芬',252,'2018-02-01 10:34:43');
/*!40000 ALTER TABLE `home_ssb` ENABLE KEYS */;
