# Host: hdm373779265.my3w.com  (Version 5.1.73)
# Date: 2018-01-31 14:46:58
# Generator: MySQL-Front 6.0  (Build 2.20)


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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='班级信息';

#
# Data for table "xsgl_jcxx_bj"
#

/*!40000 ALTER TABLE `xsgl_jcxx_bj` DISABLE KEYS */;
INSERT INTO `xsgl_jcxx_bj` VALUES (1,'一班',3,34),(2,'二班',3,19),(3,'三班',3,184),(4,'四班',3,121),(5,'五班',3,187),(6,'六班',3,57),(7,'七班',3,181),(8,'八班',3,36),(9,'九班',3,182),(10,'十班',3,84);
/*!40000 ALTER TABLE `xsgl_jcxx_bj` ENABLE KEYS */;
