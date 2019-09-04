/* Replace with your SQL commands */
CREATE TABLE users(id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                   email VARCHAR(128) NOT NULL UNIQUE,
                   salt CHAR(64) NOT NULL,
                   password CHAR(64) NOT NULL);

ALTER TABLE users AUTO_INCREMENT = 1000;