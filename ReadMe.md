## install all modules

```
 npm i express mongoose nodemon bcrypt jsonwebtoken

```

- bcrypt :
  - it is used for encrypt the password to store into database.
- jsonwebtoken:
  - it is used for creating the token value which is helps for login/signup etc..

### jsonwebtoken:-

- sing for response a token when you have to login
- verify again and agian whenever you want to access the others data.
  Example: -- you logged In get a token whenever you visit another page you got the error if did not pass correct authorization in header.

### bcrypt:-
- To encypt the password as singup and decrpt as in login 