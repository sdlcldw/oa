# Host: localhost  (Version 5.5.53)
# Date: 2017-11-01 11:21:21
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(32) NOT NULL DEFAULT '0' COMMENT '用户名',
  `sfzhm` varchar(22) NOT NULL DEFAULT '' COMMENT '身份证号',
  `password` char(64) NOT NULL DEFAULT '0' COMMENT '密码',
  `email` varchar(50) NOT NULL DEFAULT '0' COMMENT '邮箱',
  `icon` varchar(60) NOT NULL DEFAULT '0' COMMENT '头像',
  `logintime` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '登录时间',
  `loginip` bigint(20) NOT NULL DEFAULT '0' COMMENT '登录IP',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `sex` varchar(8) DEFAULT NULL COMMENT '性别',
  `phone` varchar(16) DEFAULT NULL COMMENT '手机号码',
  `phone_d` varchar(16) DEFAULT NULL COMMENT '手机短号',
  `phone_bg` varchar(16) DEFAULT NULL COMMENT '办公电话',
  `xk` varchar(26) DEFAULT NULL COMMENT '学科',
  `up_time` timestamp NULL DEFAULT NULL COMMENT '最后在线时间',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `username` (`username`,`password`),
  UNIQUE KEY `username_2` (`username`,`email`),
  UNIQUE KEY `username_3` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=261 DEFAULT CHARSET=utf8;
