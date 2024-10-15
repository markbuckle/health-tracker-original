## Setup Express Server

Note this folder is just to test the express and passport login configuration before implementing into our other code.

Create a new folder (i.e. nodeLogin). In your terminal, initialize your json:

```pwsh
npm init -y
```

Update your json to work with npm start and npm dev, then run the dependencies
for express.js:

```pwsh
npm i express
```

Nodemon is a library that automatically refreshes the server anytime we make
changes to any files. Run the dependencies for nodemon:

```pwsh
npm i -D nodemon
```

Test the local connection with npm run dev (localhost:4000)

Next install dependencies for EJS. EJS is the template view engine. It allows us
to render ejs files which can be coded as html. This allows us to pass variables
(i.e. usernames) to our frontend files. EJS files must be stored in a /views
folder.

Create environment variables and postgres library with:

```pwsh
npm i dotenv pg
```

Install the bcryprt package to hash passwords:

```pwsh
npm i bcrypt
```

Install the express session and flash packages:

```pwsh
npm install express-session
npm install express-flash
```

Install passport. Passport will allow us to store session details into a browser
cookie so that they can use the app as an authenticated user:

```pwsh
npm i passport passport-local
```
