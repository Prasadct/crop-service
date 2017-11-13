CREATE TABLE audit_reqs
(
id int NOT NULL AUTO_INCREMENT,
croptype varchar(255) ,
generatedfrom varchar(255),
generatedfromid varchar(255),
datetime datetime,
PRIMARY KEY (id)
)