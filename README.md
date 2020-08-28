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
POST /sessions/create

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
