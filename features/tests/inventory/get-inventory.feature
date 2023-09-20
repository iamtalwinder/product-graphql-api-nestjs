Feature: Retrieve Inventory Records

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

  Scenario: Successfully retrieve all inventory records without filters
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getInventory {
          documents {
            _id
            product {
              _id
              name
            }
            inventoryLocations {
              locationName
              quantity
            }
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getInventory": {
            "documents": "*",
            "totalCount": 2
          }
        }
      }
      """
    
  Scenario: Retrieve inventory records with specific filters
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getInventory(filter: {
          product: "p1"
        }) {
          documents {
            _id
            product {
              _id
              name
            }
            inventoryLocations {
              locationName
              quantity
            }
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getInventory": {
            "documents": [{ "product": { "_id": "p1" } }],
            "totalCount": 1
          }
        }
      }
      """

  Scenario: Attempt to retrieve inventory with invalid filter
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getInventory(filter: {
          product: "nonexistent_product"
        }) {
          documents {
            _id
            product {
              _id
              name
            }
            inventoryLocations {
              locationName
              quantity
            }
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getInventory": {
            "documents": [],
            "totalCount": 0
          }
        }
      }
      """

  Scenario: Retrieve inventory records with pagination
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getInventory(page: 2, limit: 1) {
          documents {
            _id
            product {
              _id
              name
            }
            inventoryLocations {
              locationName
              quantity
            }
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getInventory": {
            "documents": "*",
            "totalCount": 2
          }
        }
      }
      """
