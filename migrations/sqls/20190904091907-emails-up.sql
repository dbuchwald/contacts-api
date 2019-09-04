/* Replace with your SQL commands */
CREATE TABLE email_types(email_type CHAR(5) NOT NULL PRIMARY KEY,
                         email_type_description VARCHAR(256));

CREATE TABLE emails(id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    contact_id INTEGER NOT NULL,
                    email_type CHAR(5) NOT NULL,
                    email_address VARCHAR(256) NOT NULL,
                    FOREIGN KEY(contact_id) REFERENCES contacts(id),
                    FOREIGN KEY(email_type) REFERENCES email_types(email_type));

ALTER TABLE emails AUTO_INCREMENT = 1000;

INSERT INTO email_types(email_type, email_type_description) values ('WORK', 'Work e-mail');
INSERT INTO email_types(email_type, email_type_description) values ('HOME', 'Home e-mail');
INSERT INTO email_types(email_type, email_type_description) values ('PRIV', 'Private e-mail');
