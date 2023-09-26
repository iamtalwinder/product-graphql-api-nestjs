Feature: Retrieve Orders Placed by a User

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
    Given I load fixture from the file "fixtures/orders.fixture"
    Given I load fixture from the file "fixtures/products.fixture"
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

  Scenario: Successfully retrieve orders for the logged-in user
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getUserOrders {
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
          "getUserOrders": {
            "documents": "*",
            "totalCount": 2
          }
        }
      }
      """

  Scenario: Retrieve orders with pagination
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getUserOrders(page: 2, limit: 1) {
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
          "getUserOrders": {
            "documents": [{"_id": "order2"}],
            "totalCount": 2
          }
        }
      }
      """
