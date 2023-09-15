Feature: Create a New Product

  Background:
    Given I load key-value pairs from the JSON file "constants.json"
    Given I load fixture from the file "fixtures/users.fixture"
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

  Scenario: Successfully create a new product
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createProduct(createProductInput: {
          name: "New Product",
          sku: "NP1001",
          description: "A description of the new product",
          price: 50.0,
          category: "General",
          images: ["image1.jpg", "image2.jpg"],
          tags: ["new", "sale"]
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
          "createProduct": {
            "_id": "*",
            "name": "New Product",
            "sku": "NP1001",
            "price": 50.0,
            "description": "A description of the new product",
            "category": "General",
            "images": ["image1.jpg", "image2.jpg"],
            "tags": ["new", "sale"]
          }
        }
      }
      """

  Scenario: Attempt to create a product with missing mandatory fields
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createProduct(createProductInput: {
          sku: "NP1002",
          price: 50.0
        }) {
          _id
          name
          sku
          price
          description
          category
          images
          tags
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
            "message": "Field \"CreateProductInput.name\" of required type \"String!\" was not provided."
          }
        ]
      }
      """

  Scenario: Attempt to create a product with invalid data format
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        createProduct(createProductInput: {
          name: "New Product",
          sku: "NP1003",
          description: "A description of the new product",
          price: "invalid_price",
          category: "General",
          images: ["image1.jpg", "image2.jpg"],
          tags: ["new", "sale"]
        }) {
          _id
          name
          sku
          price
          description
          category
          images
          tags
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
            "message": "Float cannot represent non numeric value: \"invalid_price\""
          }
        ]
      }
      """
