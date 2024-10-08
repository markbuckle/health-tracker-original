server/: Contains all the backend code.

    middleware/: Custom middleware functions.   

    models/: Database models/schemas, separated by database type.

    routes/: Express routes for the API.

    server.js: Main server file.

    services/: Service layers for database interactions.

**Routes** define the endpoints of your API and use the services to handle
requests.

**Services** are where you'll implement the business logic for interacting with
your database. They act as an intermediary between your routes and your database
models.

A **model** is a blueprint for a table in your database, defining its structure,
constraints, and behavior. It helps you manage and interact with your data in a
structured and consistent way. It defines the structure of the table, including
the columns and their data types, as well as any relationships with other
tables. Models ensure that the structure and constraints of your database tables
are consistently enforced. They also provide an abstraction layer, allowing you
to interact with the database using high-level operations rather than raw SQL
queries. Lastly, by defining the schema, validation, and relationships in one
place, models make your codebase easier to maintain and understand.
