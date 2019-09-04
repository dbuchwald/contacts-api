DROP DATABASE IF EXISTS contacts;
DROP USER IF EXISTS 'contacts_api'@'%';
FLUSH PRIVILEGES;
CREATE DATABASE contacts CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'contacts_api'@'%' IDENTIFIED BY 'contacts_api_password';
GRANT ALL PRIVILEGES ON contacts.* TO 'contacts_api'@'%';
GRANT GRANT OPTION ON contacts.* TO 'contacts_api'@'%';
FLUSH PRIVILEGES;
