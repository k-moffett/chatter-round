DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int AUTO_INCREMENT, 
    userName VARCHAR(50), 
    email VARCHAR(80),
    dateOfBirth VARCHAR(12),
    password VARCHAR(150), 
    sessid VARCHAR(150), 
    PRIMARY KEY (id)
);

