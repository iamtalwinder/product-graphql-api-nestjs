Feature: Retrieve Products List

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/products.fixture"
    Given I load fixture from the file "fixtures/users.fixture"
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

  Scenario: Retrieve all products without filters
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getProducts {
          documents {
            _id
            name
            sku
            price
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getProducts": {
            "documents": "*",
            "totalCount": 2
          }
        }
      }
      """
    
  Scenario Outline: Retrieve products with specific filters
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getProducts(filter: {
          <FilterKey>: "<FilterValue>"
        }) {
          documents {
            _id
            name
            sku
            price
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getProducts": {
            "documents": <ExpectedDocuments>,
            "totalCount": <ExpectedCount>
          }
        }
      }
      """

    Examples:
      | FilterKey | FilterValue    | ExpectedDocuments                           | ExpectedCount |
      | category  | Electronics    | [{ "_id": "p1", "name": "Laptop Pro" }]     | 1             |
      | name      | Smartphone Max | [{ "_id": "p2" }]                           | 1             |


  Scenario: Attempt to retrieve products with invalid filter
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getProducts(filter: {
          category: "UnknownCategory"
        }) {
          documents {
            _id
            name
            sku
            price
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getProducts": {
            "documents": [],
            "totalCount": 0
          }
        }
      }
      """

  Scenario: Retrieve products with pagination
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getProducts(page: 2, limit: 1) {
          documents {
            _id
            name
            sku
            price
          }
          totalCount
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getProducts": {
            "documents": [{ "_id": "p2" }],
            "totalCount": 2
          }
        }
      }
      """
