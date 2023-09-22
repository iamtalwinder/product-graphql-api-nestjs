Feature: Delete an Existing Inventory Record

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
    Given I load fixture from the file "fixtures/inventory.fixture"
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

  Scenario: Successfully delete an inventory record
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        deleteInventory(id: "inv1")
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "deleteInventory": true
        }
      }
      """

  Scenario: Attempt to delete an inventory record with non-existent ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        deleteInventory(id: "nonexistent_inv_id")
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "inventory.not-found",
            "statusCode": 404
          }
        ]
      }
      """