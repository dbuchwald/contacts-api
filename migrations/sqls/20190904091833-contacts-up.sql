/* Replace with your SQL commands */
CREATE TABLE contacts(id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      owner_id INTEGER NOT NULL,
                      first_name VARCHAR(128),
                      last_name VARCHAR(128),
                      organization VARCHAR(128),
                      FOREIGN KEY(owner_id) REFERENCES users(id));

ALTER TABLE contacts AUTO_INCREMENT = 1000;