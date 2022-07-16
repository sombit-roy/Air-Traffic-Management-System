ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS air_traffic_db;
CREATE DATABASE air_traffic_db;
USE air_traffic_db;

CREATE TABLE pilot (
  pilot_id INT NOT NULL,
  pilot_name VARCHAR(45) NOT NULL,
  PRIMARY KEY (pilot_id)
);

CREATE TABLE flight (
  flight_no VARCHAR(8) NOT NULL,
  airline VARCHAR(25) NOT NULL,
  PRIMARY KEY (flight_no)
);

CREATE TABLE arrival (
  date_time DATETIME NOT NULL,
  from_city VARCHAR(25) NOT NULL,
  pilot_id INT NOT NULL,
  flight_no VARCHAR(8) NOT NULL,
  PRIMARY KEY (date_time),
  CONSTRAINT flight_no FOREIGN KEY (flight_no) REFERENCES flight (flight_no) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT pilot_id FOREIGN KEY (pilot_id) REFERENCES pilot (pilot_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE VIEW invalid_timing AS 
SELECT (date_time - INTERVAL 5 MINUTE) AS previous, (date_time + INTERVAL 5 MINUTE) AS later FROM arrival;

DELIMITER $$
CREATE TRIGGER flight_clash BEFORE INSERT ON arrival FOR EACH ROW BEGIN
  DECLARE flight_time_previous DATETIME;
  DECLARE flight_time_later DATETIME;
  DECLARE done INT DEFAULT FALSE;
  DECLARE cursor_i CURSOR FOR SELECT previous, later FROM invalid_timing;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  OPEN cursor_i;
  read_loop: LOOP
    FETCH cursor_i INTO flight_time_previous, flight_time_later;
    IF done THEN
      LEAVE read_loop;
	ELSEIF NEW.date_time BETWEEN flight_time_previous AND flight_time_later THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ERROR: Flight within 5 minutes of another';
    END IF;
  END LOOP; 
  CLOSE cursor_i;
END$$
DELIMITER ;