Feature: Issue Anonymous Token

  Scenario: Successfully issue an anonymous token
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        issueAnonymousToken {
          accessToken
          refreshToken
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "issueAnonymousToken": {
            "accessToken": "*",
            "refreshToken": "*"
          }
        }
      }
      """

  Scenario: Anonymous token has limited access
    Given I send a GraphQL request to "/product" with the payload:
      """
      mutation {
        issueAnonymousToken {
          accessToken
          refreshToken
        }
      }
      """
    And I store the key "accessToken" with the value from the response at path "body.data.issueAnonymousToken.accessToken"
    And I set the request header "Authorization" to "Bearer {{accessToken}}"
    When I send a GraphQL request to "/product" with the payload:
      """
      query {
        getUserOrders {
          documents {
            _id
            status
          }
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "errors": [
          {
            "message": "auth.insufficient-permission",
            "statusCode": 401
          }
        ]
      }
      """
