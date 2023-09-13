Feature: Login

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"

  Scenario: Successfully login with existing user credentials
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        login(loginInput: {
          email: "{{customerEmail}}",
          password: "{{password}}"
        }) {
          accessToken
          refreshToken
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "login": {
            "accessToken": "*",
            "refreshToken": "*"
          }
        }
      }
      """

  Scenario: Login fails with incorrect password
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        login(loginInput: {
          email: "{{customerEmail}}",
          password: "wrongpassword"
        }) {
          accessToken
          refreshToken
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "auth.invalid-credentials",
            "statusCode": 401
          }
        ]
      }
      """

  Scenario: Login fails with non-existent user
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        login(loginInput: {
          email: "nonexistentuser@gmail.com",
          password: "somepassword"
        }) {
          accessToken
          refreshToken
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "auth.invalid-credentials",
            "statusCode": 401
          }
        ]
      }
      """
