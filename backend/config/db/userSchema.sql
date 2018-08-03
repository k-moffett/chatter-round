DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int AUTO_INCREMENT, 
    username VARCHAR(50), 
    email VARCHAR(80),
    dateOfBirth VARCHAR(12),
    password VARCHAR(16), 
    sessid VARCHAR(30), 
    PRIMARY KEY (id)
);

