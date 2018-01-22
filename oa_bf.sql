﻿# Host: localhost  (Version 5.5.53)
# Date: 2018-01-22 10:07:53
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

#
# Structure for table "xsgl_czjl_wj"
#

DROP TABLE IF EXISTS `xsgl_czjl_wj`;
CREATE TABLE `xsgl_czjl_wj` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sfzh` bigint(20) NOT NULL DEFAULT '0' COMMENT '身份证号',
  `sj` date NOT NULL DEFAULT '0000-00-00' COMMENT '时间',
  `ms` varchar(255) DEFAULT NULL COMMENT '描述',
  `user_id_czr` smallint(6) NOT NULL DEFAULT '0' COMMENT '操作人',
  `czsj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间',
  `lhxf` smallint(6) DEFAULT NULL COMMENT '量化学分',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='学生成长记录——违纪';

#
# Data for table "xsgl_czjl_wj"
#

/*!40000 ALTER TABLE `xsgl_czjl_wj` DISABLE KEYS */;
INSERT INTO `xsgl_czjl_wj` VALUES (1,123,'0000-00-00','12312312',252,'2017-12-28 14:25:21',NULL),(2,123,'2017-01-02','12312312',252,'2017-12-28 14:30:40',NULL),(3,123,'2018-01-01','123123',252,'2017-12-28 16:02:45',NULL),(4,123,'2017-12-28','123123',252,'2017-12-28 16:13:24',NULL),(5,123,'2017-12-28','121312',252,'2017-12-28 16:30:37',NULL),(6,123,'2017-12-28','1123123',252,'2017-12-28 16:32:07',NULL),(7,123,'2017-12-28','1123123',252,'2017-12-28 16:32:35',NULL),(8,123,'2018-01-09','你这么犯错误了\n',252,'2018-01-09 15:27:48',1);
/*!40000 ALTER TABLE `xsgl_czjl_wj` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_bj"
#

DROP TABLE IF EXISTS `xsgl_jcxx_bj`;
CREATE TABLE `xsgl_jcxx_bj` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '班级名称',
  `njb_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属年级部',
  `user_id_bzr` smallint(6) NOT NULL DEFAULT '0' COMMENT '班主任',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='班级信息';

#
# Data for table "xsgl_jcxx_bj"
#

/*!40000 ALTER TABLE `xsgl_jcxx_bj` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_bj` VALUES (4,'一班',7,0),(5,'二班',8,0),(6,'三班',7,0),(7,'四班',5,252),(8,'五班',7,0),(9,'六班',6,0),(10,'七班',7,0),(11,'八班',6,0);
/*!40000 ALTER TABLE `xsgl_jcxx_bj` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_njb"
#

DROP TABLE IF EXISTS `xsgl_jcxx_njb`;
CREATE TABLE `xsgl_jcxx_njb` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '年级部名称',
  `user_id_fzr` smallint(6) NOT NULL DEFAULT '0' COMMENT '年级部负责人id',
  `user_id_xtgly` smallint(6) NOT NULL DEFAULT '0' COMMENT '系统管理员id',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='年级部信息';

#
# Data for table "xsgl_jcxx_njb"
#

/*!40000 ALTER TABLE `xsgl_jcxx_njb` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_njb` VALUES (5,'初中年级部',13,13),(6,'2017级高中部',0,1),(7,'2016级高中部',0,252),(8,'2015级高中部',0,0);
/*!40000 ALTER TABLE `xsgl_jcxx_njb` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_ss_cw"
#

DROP TABLE IF EXISTS `xsgl_jcxx_ss_cw`;
CREATE TABLE `xsgl_jcxx_ss_cw` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL DEFAULT '' COMMENT '床位名',
  `fj_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '房间Id',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='床位';

#
# Data for table "xsgl_jcxx_ss_cw"
#

/*!40000 ALTER TABLE `xsgl_jcxx_ss_cw` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_ss_cw` VALUES (6,'1',2),(7,'2',2),(8,'3',2),(9,'4',2),(10,'5',2),(11,'6',2);
/*!40000 ALTER TABLE `xsgl_jcxx_ss_cw` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_ss_fj"
#

DROP TABLE IF EXISTS `xsgl_jcxx_ss_fj`;
CREATE TABLE `xsgl_jcxx_ss_fj` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '房间名',
  `lc_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属楼层id',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='宿舍房间';

#
# Data for table "xsgl_jcxx_ss_fj"
#

/*!40000 ALTER TABLE `xsgl_jcxx_ss_fj` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_ss_fj` VALUES (2,'301',3),(3,'302',3),(4,'303',3),(5,'304',3);
/*!40000 ALTER TABLE `xsgl_jcxx_ss_fj` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_ss_lc"
#

DROP TABLE IF EXISTS `xsgl_jcxx_ss_lc`;
CREATE TABLE `xsgl_jcxx_ss_lc` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '楼层名称',
  `ly_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属楼宇Id',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='宿舍楼层';

#
# Data for table "xsgl_jcxx_ss_lc"
#

/*!40000 ALTER TABLE `xsgl_jcxx_ss_lc` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_ss_lc` VALUES (1,'一楼',1),(2,'二楼',1),(3,'三楼',1),(4,'四楼',1),(6,'五楼',1);
/*!40000 ALTER TABLE `xsgl_jcxx_ss_lc` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_ss_ly"
#

DROP TABLE IF EXISTS `xsgl_jcxx_ss_ly`;
CREATE TABLE `xsgl_jcxx_ss_ly` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL COMMENT '楼宇名称',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='宿舍楼宇';

#
# Data for table "xsgl_jcxx_ss_ly"
#

/*!40000 ALTER TABLE `xsgl_jcxx_ss_ly` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_ss_ly` VALUES (1,'男生公寓B座'),(8,'女生公寓A座');
/*!40000 ALTER TABLE `xsgl_jcxx_ss_ly` ENABLE KEYS */;

#
# Structure for table "xsgl_jcxx_xs_jbxx"
#

DROP TABLE IF EXISTS `xsgl_jcxx_xs_jbxx`;
CREATE TABLE `xsgl_jcxx_xs_jbxx` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '姓名',
  `cz_xjh` bigint(20) NOT NULL DEFAULT '0' COMMENT '学籍号',
  `xb` varchar(6) NOT NULL DEFAULT '' COMMENT '性别',
  `sfzh` bigint(20) NOT NULL DEFAULT '0' COMMENT '身份证号',
  `sg` varchar(6) NOT NULL DEFAULT '' COMMENT '身高',
  `tz` varchar(6) NOT NULL DEFAULT '' COMMENT '体重',
  `mz` varchar(6) NOT NULL DEFAULT '' COMMENT '民族',
  `jg` varchar(24) NOT NULL DEFAULT '' COMMENT '籍贯',
  `jtzz` varchar(64) DEFAULT NULL COMMENT '家庭住址',
  `bj_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '所在班级',
  `sfzx` varchar(6) NOT NULL DEFAULT '' COMMENT '是否住校',
  `ss_cw_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '所在宿舍',
  `gx_1` varchar(16) NOT NULL DEFAULT '' COMMENT '关系1',
  `xm_1` varchar(24) DEFAULT NULL COMMENT '姓名1',
  `zzmm_1` varchar(16) NOT NULL DEFAULT '' COMMENT '政治面貌1',
  `gzdw_1` varchar(64) NOT NULL DEFAULT '' COMMENT '工作单位1',
  `lxfs_1` varchar(24) NOT NULL DEFAULT '' COMMENT '联系方式1',
  `gx_2` varchar(16) DEFAULT '' COMMENT '关系2',
  `xm_2` varchar(24) DEFAULT '' COMMENT '姓名2',
  `zzmm_2` varchar(16) DEFAULT '' COMMENT '政治面貌2',
  `gzdw_2` varchar(64) DEFAULT '' COMMENT '工作单位2',
  `lxfs_2` varchar(24) DEFAULT NULL COMMENT '联系方式2',
  `password` varchar(24) DEFAULT NULL COMMENT '登录密码',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=130 DEFAULT CHARSET=utf8 COMMENT='学生基本信息';

#
# Data for table "xsgl_jcxx_xs_jbxx"
#

/*!40000 ALTER TABLE `xsgl_jcxx_xs_jbxx` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_xs_jbxx` VALUES (5,'张三网',123,'男',1234,'168','60','汉','东昌府区','123',5,'是',7,'父亲','你好','党员','聊城','135','123','1233','12333','12333','123333','123'),(6,'猪八戒',123123,'123123',123123123,'123123','123123','123123','1231','3123123',6,'是',7,'123','123','123','123','123','','','','','',NULL),(7,'孙悟空',123,'123',123,'123','123','123','123','123',7,'是',7,'123','123','123','123','123','','','','','',NULL),(8,'任贤齐',123,'123',123,'123','123','123','123','123',7,'是',7,'123','123','123','123','123','','','','','',NULL),(9,'123',0,'123',0,'123','123','123','123','123',0,'123',123,'','','','','','','','','','',NULL),(10,'',456,'',123,'','','','','',0,'',0,'','','','','','','','','','',NULL),(11,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(12,'456',0,'123',0,'','','','','',0,'',0,'','','','','','','','','','',NULL),(13,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(14,'456',0,'123',0,'','','','','',0,'',0,'','','','','','','','','','',NULL),(15,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(16,'456',0,'123',0,'','','','','',0,'',0,'','','','','','','','','','',NULL),(17,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(18,'456',0,'123',0,'','','','','',0,'',0,'','','','','','','','','','',NULL),(19,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(20,'456',0,'123',0,'','','','','',0,'',0,'','','','','','','','','','',NULL),(21,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(22,'456',0,'123',0,'','','','','',0,'',0,'','','','','','','','','','',NULL),(23,'123',123,'',123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(24,'456',0,'123',123,'','','','','',0,'',0,'','','','','','','','','','',NULL),(25,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(26,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(27,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(28,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(29,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(30,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(31,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(32,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(33,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(34,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(35,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(36,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(37,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(38,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(39,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(40,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(41,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(42,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(43,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(44,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(45,'456',0,'123',123123123123123123,'','','','','',0,'',0,'','','','','','','','','','',NULL),(46,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(47,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(48,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(49,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(50,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(51,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(52,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(53,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(54,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(55,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(56,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(57,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(58,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(59,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(60,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(61,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(62,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(63,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(64,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(65,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(66,'456',0,'123',123123123123123123,'','','','','',0,'',0,'','','','','','','','','','',NULL),(67,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(68,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(69,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(70,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(71,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(72,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(73,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(74,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(75,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(76,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(77,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(78,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(79,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(80,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(81,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(82,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(83,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(84,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(85,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(86,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(87,'456',0,'123',123123123123123123,'','','','','',0,'',0,'','','','','','','','','','',NULL),(88,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(89,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(90,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(91,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(92,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(93,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(94,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(95,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(96,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(97,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(98,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(99,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(100,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(101,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(102,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(103,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(104,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(105,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(106,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(107,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(108,'456',0,'123',123123123123123123,'','','','','',0,'',0,'','','','','','','','','','',NULL),(109,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(110,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(111,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(112,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(113,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(114,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(115,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(116,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(117,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(118,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(119,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(120,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(121,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(122,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(123,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(124,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(125,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(126,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(127,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(128,'123',123,'',123123123123123123,'123','123','123','123','',123,'否',0,'456','','','','','','','','','',NULL),(129,'456',0,'123',123123123123123123,'','','','','',0,'',0,'','','','','','','','','','',NULL);
/*!40000 ALTER TABLE `xsgl_jcxx_xs_jbxx` ENABLE KEYS */;

#
# Structure for table "xsgl_xbkc_mx"
#

DROP TABLE IF EXISTS `xsgl_xbkc_mx`;
CREATE TABLE `xsgl_xbkc_mx` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(48) NOT NULL DEFAULT '' COMMENT '课程名',
  `js` varchar(255) NOT NULL DEFAULT '' COMMENT '课程介绍',
  `user_id` smallint(6) DEFAULT NULL COMMENT '讲师id',
  `jsjs` varchar(255) NOT NULL DEFAULT '' COMMENT '讲师介绍',
  `rs` smallint(6) DEFAULT NULL COMMENT '人数上限',
  `kssj` date DEFAULT '0000-00-00' COMMENT '开始时间',
  `jssj` date NOT NULL DEFAULT '0000-00-00' COMMENT '结束时间',
  `zt` tinyint(3) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='校本课程 明细';

#
# Data for table "xsgl_xbkc_mx"
#

/*!40000 ALTER TABLE `xsgl_xbkc_mx` DISABLE KEYS */;
INSERT INTO `xsgl_xbkc_mx` VALUES (1,'123123','123123123',3,'123123123123123',10,'0000-00-00','0000-00-00',1),(2,'123123123123','123123123123',7,'123123123123',30,'1970-01-01','1970-01-01',3),(3,'123123123123','123123123123',13,'123123123123',23,'0000-00-00','0000-00-00',1),(4,'456789','1231231231',10,'123123123123',43,'0000-00-00','0000-00-00',1),(5,'1234','12341234',4,'123412341234',23,'0000-00-00','0000-00-00',1),(6,'123','12312312\"3123',3,'12313213123213',20,'0000-00-00','0000-00-00',1),(7,'心理健康','阿斯蒂芬阿斯蒂芬阿什顿发斯蒂芬阿斯蒂芬阿斯蒂芬按时》《》？、‘“\'\"\"”’/..,/!@$#^%$&%^*)(*)  ',13,'阿斯蒂芬阿斯蒂芬阿什顿发斯蒂芬阿斯蒂芬阿斯蒂芬按时》《》？、‘“\'\"\"”’/..,/!@$#^%$&%^*)(*)  ',60,'2018-01-02','2018-02-23',3),(8,'职业生涯规划','阿什顿发山东发斯蒂芬阿斯蒂芬发斯蒂芬娃儿请问人情味工会经费就人体艺术地方her6t法规回复活动忽然问题 ！@#%￥……&%*&（）&*：“，。、《》，。、；‘【、=-0·~】’？”',7,'阿什顿发山东发斯蒂芬阿斯蒂芬发斯蒂芬娃儿请问人情味工会经费就人体艺术地方her6t法规回复活动忽然问题 ！@#%￥……&%*&（）&*：“，。、《》，。、；‘【、=-0·~】’？”',60,'2018-03-23','2018-04-20',2);
/*!40000 ALTER TABLE `xsgl_xbkc_mx` ENABLE KEYS */;

#
# Structure for table "xsgl_xbkc_xk"
#

DROP TABLE IF EXISTS `xsgl_xbkc_xk`;
CREATE TABLE `xsgl_xbkc_xk` (
  `xs_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '学生id',
  `kc_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '课程id',
  `zt` tinyint(3) NOT NULL DEFAULT '0' COMMENT '状态'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='选课结果';

#
# Data for table "xsgl_xbkc_xk"
#

/*!40000 ALTER TABLE `xsgl_xbkc_xk` DISABLE KEYS */;
INSERT INTO `xsgl_xbkc_xk` VALUES (5,1,1),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(2,1,1),(2,1,1),(3,1,1),(2,1,1),(6,1,1),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0),(0,1,0);
/*!40000 ALTER TABLE `xsgl_xbkc_xk` ENABLE KEYS */;

#
# Structure for table "xspt_home_ssb"
#

DROP TABLE IF EXISTS `xspt_home_ssb`;
CREATE TABLE `xspt_home_ssb` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nr` varchar(255) DEFAULT NULL COMMENT '建议内容',
  `xs_id` smallint(6) DEFAULT NULL COMMENT '学生id',
  `tjsj` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='平台建议';

#
# Data for table "xspt_home_ssb"
#

/*!40000 ALTER TABLE `xspt_home_ssb` DISABLE KEYS */;
INSERT INTO `xspt_home_ssb` VALUES (1,'12312312312312',5,'2018-01-20 17:42:06');
/*!40000 ALTER TABLE `xspt_home_ssb` ENABLE KEYS */;
