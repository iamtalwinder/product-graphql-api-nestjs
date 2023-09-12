Feature: Register

  Background: 
    Given I store the key "customerEmail" with the value "customer@gmail.com"
    Given I store the key "password" with the value "{{password}}"

  Scenario: Successfully register a new user
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        register(registerInput: {
          email: "{{customerEmail}}",
          password: "{{password}}",
          firstName: "Talwinder",
          lastName: "Singh"
        }) {
          accessToken
          refreshToken
        }
      }
      """
    And the response should contain JSON:
      """
      {
        "data": {
          "register": {
            "accessToken": "*",
            "refreshToken": "*"
          }
        }
      }
      """
    When I findOne in model "User" with JSON:
      """
      { "email": "{{customerEmail}}" }
      """
    And the result should contain JSON:
      """
      { "_id": "*", "email": "{{customerEmail}}", "password": "*" }
      """

  Scenario: Should throw an error when email is taken
    Given I load fixture from the file "fixtures/users.fixture"
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        register(registerInput: {
          email: "{{customerEmail}}",
          password: "{{password}}",
          firstName: "Talwinder",
          lastName: "Singh"
        }) {
          accessToken
          refreshToken
        }
      }
      """
    And the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "auth.email-already-exists",
            "statusCode": 400
          }
        ]
      }
      """
