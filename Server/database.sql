-- -- on the terminal: psql -f wardrobe.sql
 -- DROP DATABASE IF EXISTS finalproject;
 -- -- -- Create database
 -- CREATE DATABASE finalproject;
 -- \c mywardrobe;
 -- DROP TABLE IF EXISTS users;
 -- users table

CREATE TABLE users (user_id SERIAL PRIMARY KEY,
                                           email VARCHAR(250) UNIQUE NOT NULL,
                                                                     password VARCHAR(250) NOT NULL);