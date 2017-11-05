# Host: localhost  (Version 5.5.47)
# Date: 2017-11-05 23:45:01
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "auth_item_child"
#

DROP TABLE IF EXISTS `auth_item_child`;
CREATE TABLE `auth_item_child` (
  `parent` varchar(64) NOT NULL,
  `child` varchar(64) NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`),
  CONSTRAINT `auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_ibfk_2` FOREIGN KEY (`child`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限关联表';

#
# Data for table "auth_item_child"
#

INSERT INTO `auth_item_child` VALUES ('2015gzb','bmfzr'),('2016gzb','bmfzr'),('2017gzb','bmfzr'),('admin','cwpt/*'),('admin','grbg/*'),('admin','index/*'),('admin','xtsz/*'),('admin','zcgl/*'),('bgs','bmfzr'),('bmfzr','grbg/bmkqjl_get'),('cwk','bmfzr'),('cznjb','bmfzr'),('dck','bmfzr'),('default','grbg/*'),('default','index/*'),('jwk','bmfzr'),('jys','bmfzr'),('rsk','bmfzr'),('xsk','bmfzr'),('xz','cwpt/sjfx_cknd_htgz'),('xz','cwpt/sjfx_cknd_tggz'),('xz','cwpt/sjfx_ckny_htgz'),('xz','cwpt/sjfx_ckny_tggz'),('xz','cwpt/sjfx_jsxm_htgz'),('xz','cwpt/sjfx_jsxm_tggz'),('zcgly','zcgl/*'),('zwk','bmfzr');
