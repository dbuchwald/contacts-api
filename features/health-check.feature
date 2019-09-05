Feature: Health check
  In order to check environment sanity
  As a tester
  I want to probe simple healthcheck endpoint

  Scenario: Simple probe
    Given Contacts API URL is configured
    When Health check is invoked
    Then The response should be 'OK'
