/* Replace with your SQL commands */
DELETE FROM phones 
 WHERE contact_id IN 
  (SELECT contacts.id FROM contacts, users
    WHERE users.email in ('alice@test.net', 'bob@test.net')
      AND contacts.owner_id = users.id);

DELETE FROM emails 
 WHERE contact_id IN 
  (SELECT contacts.id FROM contacts, users
    WHERE users.email in ('alice@test.net', 'bob@test.net')
      AND contacts.owner_id = users.id);

DELETE FROM contacts 
 WHERE id IN 
  (SELECT contacts.id FROM contacts, users
    WHERE users.email in ('alice@test.net', 'bob@test.net')
      AND contacts.owner_id = users.id);

DELETE FROM users
 WHERE email in ('alice@test.net', 'bob@test.net');