# Host: localhost  (Version 5.5.53)
# Date: 2018-01-22 10:06:16
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "xsgl_czjl_ry"
#

DROP TABLE IF EXISTS `xsgl_czjl_ry`;
CREATE TABLE `xsgl_czjl_ry` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sfzh` bigint(20) NOT NULL DEFAULT '0' COMMENT '身份证号',
  `sj` date NOT NULL DEFAULT '0000-00-00' COMMENT '时间',
  `ms` varchar(255) DEFAULT NULL COMMENT '描述',
  `user_id_czr` smallint(6) NOT NULL DEFAULT '0' COMMENT '操作人',
  `czsj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间',
  `lhxf` smallint(6) DEFAULT NULL COMMENT '量化分',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='学生成长记录——违纪';

#
# Data for table "xsgl_czjl_ry"
#

/*!40000 ALTER TABLE `xsgl_czjl_ry` DISABLE KEYS */;
INSERT INTO `xsgl_czjl_ry` VALUES (1,123,'0000-00-00','12312312',252,'2017-12-28 14:25:21',NULL),(2,123,'2017-01-02','12312312',252,'2017-12-28 14:30:40',NULL),(3,123,'2018-01-01','123123',252,'2017-12-28 16:02:45',NULL),(4,123,'2017-12-28','123123',252,'2017-12-28 16:13:24',NULL),(5,123,'2017-12-28','123123',252,'2017-12-28 16:30:59',NULL),(6,123,'2017-12-31','123123',252,'2017-12-31 21:57:22',123),(7,123,'2017-12-31','2017年,中国天气网号召全国10个大城市的小伙伴加入蓝天日记拍摄计划,经过近1年的坚持,记录下了北京、呼和浩特、沈阳、郑州、南京、合肥、武汉、长沙、重庆、南宁... ',252,'2017-12-31 22:18:04',10),(8,123,'2018-01-09','阿斯蒂芬阿斯蒂芬',252,'2018-01-09 15:25:36',1);
/*!40000 ALTER TABLE `xsgl_czjl_ry` ENABLE KEYS */;
