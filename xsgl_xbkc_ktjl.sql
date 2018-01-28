# Host: localhost  (Version 5.5.47)
# Date: 2018-01-28 20:12:33
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "xsgl_xbkc_ktjl"
#

DROP TABLE IF EXISTS `xsgl_xbkc_ktjl`;
CREATE TABLE `xsgl_xbkc_ktjl` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `kc_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '课程Id',
  `sj` date NOT NULL DEFAULT '0000-00-00',
  `kq_yd` smallint(6) NOT NULL DEFAULT '0' COMMENT '应到',
  `kq_sd` smallint(6) NOT NULL DEFAULT '0' COMMENT '实到',
  `kq_qj` smallint(6) NOT NULL DEFAULT '0' COMMENT '请假',
  `kq_cd` smallint(6) NOT NULL DEFAULT '0' COMMENT '迟到',
  `kq_kc` smallint(6) NOT NULL DEFAULT '0' COMMENT '旷课',
  `xjpj` tinyint(3) NOT NULL DEFAULT '0' COMMENT '星级评价',
  `ktqk` varchar(255) NOT NULL DEFAULT '' COMMENT '课堂情况',
  `user_id` mediumint(9) NOT NULL DEFAULT '0' COMMENT '记录教师',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='课堂记录';

#
# Data for table "xsgl_xbkc_ktjl"
#

/*!40000 ALTER TABLE `xsgl_xbkc_ktjl` DISABLE KEYS */;
INSERT INTO `xsgl_xbkc_ktjl` VALUES (1,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(2,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(3,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(4,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(5,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(6,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(7,4,'2018-01-27',128,128,0,0,0,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(8,4,'2018-01-27',128,116,5,4,3,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(9,4,'2018-01-27',128,116,5,4,3,0,'阿斯蒂芬发斯蒂芬阿斯蒂芬',252),(10,4,'2018-01-03',128,125,1,1,1,0,'aasdasdsadas',252),(11,4,'2018-01-03',128,128,0,0,0,5,'aasdasdsadas',252);
/*!40000 ALTER TABLE `xsgl_xbkc_ktjl` ENABLE KEYS */;
