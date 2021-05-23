-- SET UP SCHEMA HERE
CREATE DATABASE badmovies;

USE badmovies;

-- CREATE TABLE users (
--   id int NOT NULL AUTO_INCREMENT,
--   username varchar(25) NOT NULL,
--   PRIMARY KEY (userId)
-- );

CREATE TABLE movies (
  id int NOT NULL,
  title varchar(150),
  PRIMARY KEY (id)
);