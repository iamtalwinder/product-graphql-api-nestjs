Feature: Create a New Inventory Record

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

  Scenario: Successfully create a new inventory record
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createInventory(createInventoryInput: {
          product: "p1",
          inventoryLocations: [{
            locationName: "New Warehouse",
            warehouseAddress: "7890 New St",
            quantity: 100,
            manager: "New Manager",
            notes: "New inventory location"
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
          "createInventory": {
            "_id": "*",
            "product": { 
              "_id": "p1" 
            },
            "inventoryLocations": [
              {
                "locationName": "New Warehouse",
                "warehouseAddress": "7890 New St",
                "quantity": 100,
                "manager": "New Manager",
                "notes": "New inventory location"
              }
            ]
          }
        }
      }
      """

  Scenario: Attempt to create an inventory record with missing mandatory fields
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createInventory(createInventoryInput: {
          product: "p1",
          inventoryLocations: [{
            locationName: "Incomplete Warehouse"
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
            "message": "Field \"InventoryLocationInput.warehouseAddress\" of required type \"String!\" was not provided."},{"message":"Field \"InventoryLocationInput.quantity\" of required type \"Int!\" was not provided."
          }
        ]
      }
      """

  Scenario: Attempt to create an inventory record with invalid product ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createInventory(createInventoryInput: {
          product: "invalid_product_id",
          inventoryLocations: [{
            locationName: "Warehouse",
            warehouseAddress: "1234 Main St",
            quantity: 100,
            manager: "Manager",
            notes: "Primary warehouse"
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
            "message": "product.not-found",
            "statusCode": 404
          }
        ]
      }
      """
