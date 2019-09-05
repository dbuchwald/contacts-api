Feature: User Login
  In order to be recognized by the application
  As a user
  I want to be able to log into the system with my credentials

  Background:
    Given Contacts API URL is configured
      And Application is running
      And User 'alice@test.net' exists
      And User 'alice@test.net' has password 'alicepass'

  Scenario: Successful login
    When User 'alice@test.net' logs in with password 'alicepass'
    Then Login is successful

  Scenario: Incorrect password
    When User 'alice@test.net' logs in with password 'incorrect'
    Then Login is not successful
