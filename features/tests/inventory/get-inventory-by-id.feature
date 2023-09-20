Feature: Retrieve Specific Inventory Record by ID

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
    Given I load fixture from the file "fixtures/products.fixture"
    Given I load fixture from the file "fixtures/inventory.fixture"
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

  Scenario: Successfully retrieve a specific inventory record by ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getInventoryById(id: "inv1") {
          _id
          product {
            _id
          }
          inventoryLocations {
            locationName
            warehouseAddress
            quantity
            manager
            notes
          }
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getInventoryById": {
            "_id": "inv1",
            "product": { 
              "_id": "p1"
            },
            "inventoryLocations": [
              {
                "locationName": "*",
                "warehouseAddress": "*",
                "quantity": "*",
                "manager": "*",
                "notes": "*"
              }
            ]
          }
        }
      }
      """

  Scenario: Attempt to retrieve an inventory record with a non-existent ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getInventoryById(id: "nonexistent_inv_id") {
          _id
          product {
            _id
          }
          inventoryLocations {
            locationName
            warehouseAddress
            quantity
            manager
            notes
          }
        }
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
