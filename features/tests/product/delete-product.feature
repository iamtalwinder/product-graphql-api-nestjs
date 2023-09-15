Feature: Delete an Existing Product

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
    Given I load fixture from the file "fixtures/products.fixture"
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

  Scenario: Successfully delete a product
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        deleteProduct(id: "p1")
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "deleteProduct": true
        }
      }
      """

  Scenario: Attempt to delete a product with non-existent ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        deleteProduct(id: "nonexistent_id")
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "product.not-found",
            "statusCode": 404
          }
        ]
      }
      """
