Feature: Create User

  Background: 
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"

  Scenario: Admin successfully creates a new user
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        login(loginInput: {
          email: "admin@gmail.com",
          password: "{{password}}"
        }) {
          accessToken
        }
      }
      """
    And I store the key "adminAccessToken" with the value from the response at path "body.data.login.accessToken"
    And I set the request header "Authorization" to "Bearer {{adminAccessToken}}"
    When I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createUser(createUserInput: {
          email: "newuser@gmail.com",
          password: "NewUser@123",
          firstName: "New",
          lastName: "User",
          role: customer
        }) {
          _id
          email
          firstName
          lastName
          role
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "createUser": {
            "email": "newuser@gmail.com",
            "firstName": "New",
            "lastName": "User",
            "role": "customer"
          }
        }
      }
      """

  Scenario: Non-admin user cannot create a new user
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        login(loginInput: {
          email: "customer@gmail.com",
          password: "{{password}}"
        }) {
          accessToken
        }
      }
      """
    And I store the key "customerAccessToken" with the value from the response at path "body.data.login.accessToken"
    And I set the request header "Authorization" to "Bearer {{customerAccessToken}}"
    When I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createUser(createUserInput: {
          email: "unauthorizeduser@gmail.com",
          password: "UnauthUser@123",
          firstName: "Unauthorized",
          lastName: "User",
          role: customer
        }) {
          _id
          email
          firstName
          lastName
          role
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "auth.insufficient-permission",
            "statusCode": 401
          }
        ]
      }
      """
