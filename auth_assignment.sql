# Host: localhost  (Version 5.5.47)
# Date: 2017-11-05 23:44:38
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "auth_assignment"
#

DROP TABLE IF EXISTS `auth_assignment`;
CREATE TABLE `auth_assignment` (
  `item_name` varchar(64) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`),
  CONSTRAINT `auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色（权限）表';

#
# Data for table "auth_assignment"
#

INSERT INTO `auth_assignment` VALUES ('2015gzb','157',NULL),('2016gzb','178',NULL),('2017gzb','13',NULL),('admin','252',NULL),('bgs','65',NULL),('cwk','40',NULL),('cznjb','13',NULL),('dck','87',NULL),('jwk','77',NULL),('jys','3',NULL),('rsk','105',NULL),('xsk','150',NULL),('xz','33',NULL),('zcgly','69',NULL),('zwk','161',NULL);
