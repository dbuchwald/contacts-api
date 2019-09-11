Feature: List all contacts
  In order to review list of my contacts
  As a user
  I want to be able to fetch all my contacts

  Background:
    Given Contacts API URL is configured
      And Application is running
      And User 'alice@test.net' is logged in with password 'alicepass'

  Scenario: Successful fetch operation
   Given Valid session id is used
    When User lists all her contacts
    Then Fetch is successful
     And Contact is found with first name 'Homer', last name 'Simpson' 
     And Contact is found with first name 'Margie', last name 'Bouvier' 

  Scenario: Unsuccessful fetch operation
   Given Invalid session id is used
    When User lists all her contacts
    Then Access is denied
