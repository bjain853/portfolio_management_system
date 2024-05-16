CREATE USER "test@localhost" IDENTIFIED BY 'password';
DROP Database IF EXISTS Portfolio_management;
GRANT ALL ON Portfolio_management.* TO test@localhost;
CREATE Database IF NOT EXISTS Portfolio_management;
USE Portfolio_management;

CREATE TABLE IF NOT EXISTS advisor (
    id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(255),
    hashed_password VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE  IF NOT EXISTS client (
    id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    advisor_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (advisor_id) REFERENCES advisor(id)
);

CREATE TABLE IF NOT EXISTS portfolio (
    id VARCHAR(255) NOT NULL,
    client_id INT NOT NULL, -- might be equal to advisor id in case client leaves so advisor becomes client
    creation_time_stamp TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);

CREATE TABLE IF NOT EXISTS securities (
   id VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL,
   category VARCHAR(255) NOT NULL,
   date DATETIME NOT NULL,
   open DECIMAL(10,2) NOT NULL,
   high DECIMAL(10,2) NOT NULL,
   low DECIMAL(10,2) NOT NULL,
   close DECIMAL(10,2) NOT NULL,
   adj_close DECIMAL(10,2) NOT NULL,
   volume FLOAT NOT NULL,
   PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS transactions(
  id VARCHAR(255) NOT NULL,
  security_name VARCHAR(255) NOT NULL,
  quantity FLOAT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  date TIMESTAMP NOT NULL,
  transaction_type VARCHAR(255) NOT NULL,
  portfolio_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY security_name REFERENCES securities(name)
  );
