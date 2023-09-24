Feature: Update Existing Inventory Record

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

  Scenario: Successfully update an inventory record
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        updateInventory(id: "inv1", updateInventoryInput: {
          inventoryLocations: [{
            locationName: "Updated Warehouse A",
            warehouseAddress: "1234 Main St Updated",
            quantity: 150,
            manager: "Manager A Updated",
            notes: "Primary warehouse updated"
          }]
        }) {
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
          "updateInventory": {
            "_id": "inv1",
            "product": { 
              "_id": "p1" 
            },
            "inventoryLocations": [
              {
                "locationName": "Updated Warehouse A",
                "warehouseAddress": "1234 Main St Updated",
                "quantity": 150,
                "manager": "Manager A Updated",
                "notes": "Primary warehouse updated"
              }
            ]
          }
        }
      }
      """

  Scenario: Attempt to update an inventory record with non-existent ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        updateInventory(id: "nonexistent_inv_id", updateInventoryInput: {
          inventoryLocations: [{
            locationName: "Nonexistent Warehouse",
            quantity: 100
          }]
        }) {
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
            "message": "Field \"InventoryLocationInput.warehouseAddress\" of required type \"String!\" was not provided."
          }
        ]
      }
      """

  Scenario: Attempt to update an inventory record with invalid data format
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        updateInventory(id: "inv1", updateInventoryInput: {
          inventoryLocations: [{
            locationName: "Warehouse A",
            quantity: "invalid_quantity"
          }]
        }) {
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
            "message": "Field \"InventoryLocationInput.warehouseAddress\" of required type \"String!\" was not provided."},{"message":"Int cannot represent non-integer value: \"invalid_quantity\""
          }
        ]
      }
      """
