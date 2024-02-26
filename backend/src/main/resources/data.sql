INSERT INTO advisor (first_name,last_name,address,phone,email)  VALUES ("Adrian","Delgado"
,"433 Sunny Glen Lane Cleveland, OH 44115","216-737-2649","A.delgado@agmail.com");

INSERT INTO advisor (first_name,last_name,address,phone,email)  VALUES ("Kris","Bailey",
"633 Sunny Glen Lane Cleveland, OH 44115","216-767-2698","KrisJBailey@aoutlooky.com");


INSERT INTO client (first_name,last_name,advisor_id) VALUES ("Ryan","Adams",1);
INSERT INTO client (first_name,last_name,advisor_id) VALUES ("Bryan","Johnston",1);
INSERT INTO client (first_name,last_name,advisor_id) VALUES ("Florence","Pugh",1);
INSERT INTO client (first_name,last_name,advisor_id) VALUES ("Roy","Malcom",2);
INSERT INTO client (first_name,last_name,advisor_id) VALUES ("Leroy","Musk",2);

INSERT INTO portfolio (client_id,creationTimeStamp) VALUES (1,CURRENT_TIMESTAMP);
INSERT INTO portfolio (client_id,creationTimeStamp) VALUES (2,CURRENT_TIMESTAMP);
INSERT INTO portfolio (client_id,creationTimeStamp) VALUES (3,CURRENT_TIMESTAMP);
INSERT INTO portfolio (client_id,creationTimeStamp) VALUES (4,CURRENT_TIMESTAMP);
INSERT INTO portfolio (client_id,creationTimeStamp) VALUES (5,CURRENT_TIMESTAMP);


--INSERT INTO security (name,category,portfolio_id,purchase_price,purchase_date,quantity) VALUES ("RealEstate",1,10.43,
--CURRENT_TIMESTAMP,4);
--INSERT INTO security  (name,category,portfolio_id,purchase_price,purchase_date,quantity)  VALUES ("RealEstate",1,5.67,
--CURRENT_TIMESTAMP,6);
--INSERT INTO security  (name,category,portfolio_id,purchase_price,purchase_date,quantity)  VALUES ("RealEstate",2,78.98,
--CURRENT_TIMESTAMP,7);
--INSERT INTO security  (name,category,portfolio_id,purchase_price,purchase_date,quantity)  VALUES ("MutualFunds",2,100.00,
--CURRENT_TIMESTAMP,10);
--INSERT INTO security  (name,category,portfolio_id,purchase_price,purchase_date,quantity)  VALUES ("MutualFunds",1,45.80,
--CURRENT_TIMESTAMP,23);
--INSERT INTO security  (name,category,portfolio_id,purchase_price,purchase_date,quantity)  VALUES ("MutualFunds",4,34.60,
--CURRENT_TIMESTAMP,100);
--INSERT INTO security (name,category,portfolio_id,purchase_price,purchase_date,quantity) VALUES ("MutualFunds",4,54.79,
--CURRENT_TIMESTAMP,5);
--INSERT INTO security  (name,category,portfolio_id,purchase_price,purchase_date,quantity) VALUES ("RealEstate",3,23.54,
--CURRENT_TIMESTAMP,25);
--INSERT INTO security (name,category,portfolio_id,purchase_price,purchase_date,quantity)  VALUES ("RealEstate",5,86.90,
--CURRENT_TIMESTAMP,23.6);

