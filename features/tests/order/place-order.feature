Feature: Place a New Order

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
    Given I load fixture from the file "fixtures/products.fixture"
    Given I load fixture from the file "fixtures/inventory.fixture"
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

  Scenario: Successfully place a new order
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        placeOrder(placeOrderInput: {
          items: [{
            productId: "p1",
            quantity: 2
          }],
          shippingAddress: "1234 Main St"
        }) {
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
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "placeOrder": {
            "_id": "*",
            "user": {
              "_id": "*",
              "email": "customer@gmail.com"
            },
            "products": [
              {
                "quantity": 2,
                "price": "*"
              }
            ],
            "shippingAddress": "1234 Main St",
            "status": "*"
          }
        }
      }
      """

  Scenario: Attempt to place an order with incomplete details
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        placeOrder(placeOrderInput: {
          items: [{
            productId: "p1",
            quantity: 2
          }]
        }) {
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
          createdAt
          updatedAt
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "Field \"PlaceOrderInput.shippingAddress\" of required type \"String!\" was not provided."
          }
        ]
      }
      """
