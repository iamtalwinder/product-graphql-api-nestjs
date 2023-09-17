Feature: Retrieve Product Details by ID

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

  Scenario: Successfully retrieve a product by its ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getProductById(id: "p1") {
          _id
          name
          sku
          price
          description
          category
          images
          tags
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getProductById": {
            "_id": "p1",
            "name": "*",
            "sku": "*",
            "price": "*",
            "description": "*",
            "category": "*",
            "images": "*",
            "tags": "*"
          }
        }
      }
      """

  Scenario: Attempt to retrieve a product with a non-existent ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      query {
        getProductById(id: "nonexistent_id") {
          _id
          name
          sku
          price
          description
          category
          images
          tags
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

