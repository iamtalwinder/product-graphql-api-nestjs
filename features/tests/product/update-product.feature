Feature: Update Existing Product

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

  Scenario: Successfully update a product
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        updateProduct(id: "p1", updateProductInput: {
          name: "Updated Product Name",
          price: 60.0,
          description: "Updated description"
        }) {
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
          "updateProduct": {
            "_id": "p1",
            "name": "Updated Product Name",
            "sku": "*",
            "price": 60.0,
            "description": "Updated description",
            "category": "*",
            "images": "*",
            "tags": "*"
          }
        }
      }
      """

  Scenario: Attempt to update a product with non-existent ID
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        updateProduct(id: "nonexistent_id", updateProductInput: {
          name: "Nonexistent Product",
          price: 70.0
        }) {
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

  Scenario: Attempt to update a product with invalid data format
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        updateProduct(id: "p1", updateProductInput: {
          price: "invalid_price"
        }) {
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
            "message":"Float cannot represent non numeric value: \"invalid_price\""
          }
        ]
      }
      """
