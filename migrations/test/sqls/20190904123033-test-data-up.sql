/* Replace with your SQL commands */
SET @salt = MD5(rand());
SET @password = SHA2(CONCAT('alicepass', @salt), 256);

INSERT INTO users (email, salt, password) VALUES ('alice@test.net', @salt, @password);

SET @alice_id = LAST_INSERT_ID();

INSERT INTO contacts (owner_id, first_name, last_name, organization) VALUES
  (@alice_id, 'Homer', 'Simpson', '');

SET @contact_id = LAST_INSERT_ID();

INSERT INTO emails (contact_id, email_type, email_address) VALUES
  (@contact_id, 'WORK', 'hsimpson@nuclear.net');

INSERT INTO emails (contact_id, email_type, email_address) VALUES
  (@contact_id, 'PRIV', 'homer.simpson@gmail.com');

INSERT INTO phones (contact_id, phone_type, phone_number) VALUES
  (@contact_id, 'WORK', '+1 555 899 143 145');

INSERT INTO phones (contact_id, phone_type, phone_number) VALUES
  (@contact_id, 'HOME', '+1 555 544 545 122');

INSERT INTO contacts (owner_id, first_name, last_name, organization) VALUES
  (@alice_id, 'Margie', 'Bouvier', '');

SET @contact_id = LAST_INSERT_ID();

INSERT INTO emails (contact_id, email_type, email_address) VALUES
  (@contact_id, 'HOME', 'margie.bouvier@gmail.com');

INSERT INTO phones (contact_id, phone_type, phone_number) VALUES
  (@contact_id, 'HOME', '+1 555 544 545 122');

INSERT INTO phones (contact_id, phone_type, phone_number) VALUES
  (@contact_id, 'MOBI', '+1 555 355 122 153');

SET @salt = MD5(rand());
SET @password = SHA2(CONCAT('bobpass', @salt), 256);

INSERT INTO users (email, salt, password) values ('bob@test.net', @salt, @password);

SET @bob_id = LAST_INSERT_ID();

INSERT INTO contacts (owner_id, first_name, last_name, organization) VALUES
  (@bob_id, 'Bart', 'Simpson', '');

SET @contact_id = LAST_INSERT_ID();

INSERT INTO emails (contact_id, email_type, email_address) VALUES
  (@contact_id, 'HOME', 'bart.simpson@icloud.com');

INSERT INTO emails (contact_id, email_type, email_address) VALUES
  (@contact_id, 'PRIV', 'bart@gmail.com');

INSERT INTO phones (contact_id, phone_type, phone_number) VALUES
  (@contact_id, 'HOME', '+1 555 544 545 122');

INSERT INTO contacts (owner_id, first_name, last_name, organization) VALUES
  (@bob_id, 'Lisa', 'Simpson', '');

SET @contact_id = LAST_INSERT_ID();

INSERT INTO emails (contact_id, email_type, email_address) VALUES
  (@contact_id, 'HOME', 'lisa.simpson@icloud.com');

INSERT INTO phones (contact_id, phone_type, phone_number) VALUES
  (@contact_id, 'HOME', '+1 555 544 545 122');
