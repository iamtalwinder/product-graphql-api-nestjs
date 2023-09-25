Feature: Retrieve All Orders

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
    Given I load fixture from the file "fixtures/orders.fixture"
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

  Scenario: Successfully retrieve all orders as admin
    Given I set the request header "Authorization" to "Bearer {{adminAccessToken}}"
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getAllOrders {
          documents {
            _id
            user {
              _id
              email
            }
            products {
              quantity
              price
            }
            shippingAddress
            status
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getAllOrders": {
            "documents": "*",
            "totalCount": 2
          }
        }
      }
      """

  Scenario: Retrieve all orders with pagination as admin
    Given I set the request header "Authorization" to "Bearer {{adminAccessToken}}"
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getAllOrders(page: 2, limit: 1) {
          documents {
            _id
            status
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getAllOrders": {
            "documents": [{"_id": "order2"}],
            "totalCount": 2
          }
        }
      }
      """

  Scenario: Access denied for non-admin users
    Given I set the request header "Authorization" to "Bearer {{customerAccessToken}}"
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getAllOrders {
          documents {
            _id
          }
          totalCount
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
