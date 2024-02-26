DROP Database IF EXISTS Portfolio_management;
CREATE Database IF NOT EXISTS Portfolio_management;
USE Portfolio_management;

CREATE TABLE IF NOT EXISTS advisor (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE  IF NOT EXISTS client (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    advisor_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (advisor_id) REFERENCES advisor(id)
);

CREATE TABLE IF NOT EXISTS portfolio (
    id INT NOT NULL AUTO_INCREMENT,
    client_id INT NOT NULL,
    creation_time_stamp TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);

CREATE TABLE IF NOT EXISTS security (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   category VARCHAR(255) NOT NULL,
   portfolio_id INT,
   purchase_price DOUBLE,
   purchase_date TIMESTAMP,
   quantity FLOAT,
   PRIMARY KEY (id),
   FOREIGN KEY (portfolio_id) REFERENCES portfolio(id)
);


