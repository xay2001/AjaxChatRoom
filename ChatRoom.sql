
CREATE DATABASE `ChatRoom`

USE `ChatRoom`;

/*chat公共聊天室表格创建 */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `username` varchar(20) DEFAULT NULL,
  `yu` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

set names utf8;

/*chat表插入数据 */

insert  into `chat`(`username`,`yu`) values ('小许','很高兴认识大家'),('小蔡','欢迎欢迎！');

/*私密聊天室表格创建*/

DROP TABLE IF EXISTS `chat1`;

CREATE TABLE `chat1` (
  `fasong` varchar(20) DEFAULT NULL,
  `jieshou` varchar(20) DEFAULT NULL,
  `yu` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `chat1` */

insert  into `chat1`(`fasong`,`jieshou`,`yu`) values ('小许','0','你好呀'),('小蔡','0','我不好');


/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `userpwd` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `authority` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`userpwd`,`email`,`authority`) values (1,'admin','123','123@qq.com',1),(2,'XAY','123','12345@qq.com',0),(3,'TEST','12345','abc@qq.com',0),(4,'CMJ','123','12379@qq.com',0);

/*Table structure for table `user1` */
