CREATE TABLE IF NOT EXISTS user2 (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
INSERT INTO user2 (username, email)
VALUES ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com'),
    ('bob_jones', 'bob@example.com');
SELECT *
FROM users;
INSERT INTO user2 (username, email)
VALUES (
        'username:character varying',
        'email@gmail.com'
    );