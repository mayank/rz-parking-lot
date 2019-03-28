DROP TABLE IF EXISTS parking_lot;

CREATE TABLE parking_lot (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(64) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
) ENGINE=InnoDB AUTO_INCREMENT=13 ;

DROP TABLE IF EXISTS parking_slot;
 
CREATE TABLE parking_slot (
  id int(11) NOT NULL AUTO_INCREMENT,
  plid int(11) DEFAULT NULL,
  state tinyint(4) DEFAULT NULL,
  vid int(11) DEFAULT NULL,
  floor int(11) DEFAULT NULL,
  distance int(11) DEFAULT NULL,
  slotno int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY vid (vid),
  UNIQUE KEY plid (plid,floor,slotno)
) ENGINE=InnoDB AUTO_INCREMENT=21 ;

DROP TABLE IF EXISTS ticket;

CREATE TABLE ticket (
  id int(11) NOT NULL AUTO_INCREMENT,
  vid int(11) DEFAULT NULL,
  slotid int(11) DEFAULT NULL,
  entry_time timestamp NULL DEFAULT NULL,
  exit_time timestamp NULL DEFAULT NULL,
  state tinyint(4) DEFAULT NULL,
  plid int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 ;

DROP TABLE IF EXISTS vehicle;

CREATE TABLE vehicle (
  id int(11) NOT NULL AUTO_INCREMENT,
  vno varchar(16) DEFAULT NULL,
  color varchar(8) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY vno (vno)
) ENGINE=InnoDB AUTO_INCREMENT=5 ;