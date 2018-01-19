# Host: localhost  (Version 5.5.47)
# Date: 2018-01-19 13:06:49
# Generator: MySQL-Front 6.0  (Build 2.20)


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
INSERT INTO `xsgl_xbkc_xk` VALUES (5,1,3),(5,1,3),(5,0,3),(5,0,0),(3,4,0),(5,0,0),(5,1,3),(5,1,3),(5,2,1);
/*!40000 ALTER TABLE `xsgl_xbkc_xk` ENABLE KEYS */;
