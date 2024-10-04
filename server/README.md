server/: Contains all the backend code.

    middleware/: Custom middleware functions.   

    models/: Database models/schemas, separated by database type.

    routes/: Express routes for the API.

    server.js: Main server file.

    services/: Service layers for database interactions.

Routes define the endpoints of your API and use the services to handle requests.

Services are where you'll implement the business logic for interacting with your
database. They act as an intermediary between your routes and your database
models.
