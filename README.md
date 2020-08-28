# jwt-authentication
NodeJS JWT Authentication sample

This is a NodeJS API that supports username and password authentication with JWTs and has APIs that return Chuck Norris phrases. How awesome is that?
Available APIs
User APIs
POST /login

You can do a POST to /login to validate the user.

The body must have:

    username: The username
    password: The password

It returns the following:

{
  "username":{username},
  "jwtToken": {jwt},
  "refreshToken": {jwt}
}

The jwtToken and refreshToken are signed with the secret key. The jwtToken will contain the username and the extra information sent, while the refreshToken will used for regenerate the token.
POST /refresh-token

You can do a POST to /refresh-token to get refresh token.

The body must have:

    username: The username
    refreshToken: The refresh token vlaue

It returns the following:

{
  "jwtToken": {jwt}
}

 The jwtToken will contain the username and the extra information sent.
Quotes API
post /user-data
The header must have:

    x-auth: {jwt token}

It returns the sample data.

-------------------------------------------------------------------------------------------------------------------------------------------------------------
Heroku URL details
-------------------------------------------------------------------------------------------------------------------------------------------------------------
1) https://jwt-authentication-node.herokuapp.com/login
2) https://jwt-authentication-node.herokuapp.com/refresh-token
3) https://jwt-authentication-node.herokuapp.com/user-data

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Use Postman

Postman provides a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing

Here is a [small collection](https://documenter.getpostman.com/view/3232248/auth0-nodejs-jwt-auth/7LnAi4o) to highlight the features of this sample API.

[![Run NodeJS JWT Authentication in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c57ddc507592c436662c)

