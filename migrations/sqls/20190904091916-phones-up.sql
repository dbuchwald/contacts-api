/* Replace with your SQL commands */
CREATE TABLE phone_types(phone_type CHAR(5) NOT NULL PRIMARY KEY,
                         phone_type_description VARCHAR(256));

CREATE TABLE phones(id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    contact_id INTEGER NOT NULL,
                    phone_type CHAR(5) NOT NULL,
                    phone_number VARCHAR(256) NOT NULL,
                    FOREIGN KEY(contact_id) REFERENCES contacts(id),
                    FOREIGN KEY(phone_type) REFERENCES phone_types(phone_type));

ALTER TABLE phones AUTO_INCREMENT = 1000;

INSERT INTO phone_types(phone_type, phone_type_description) values ('WORK', 'Office phone');
INSERT INTO phone_types(phone_type, phone_type_description) values ('HOME', 'Home phone');
INSERT INTO phone_types(phone_type, phone_type_description) values ('MOBI', 'Mobile');