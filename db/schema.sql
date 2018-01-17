DROP DATABASE IF EXISTS moodrooms;

CREATE DATABASE moodrooms;

USE moodrooms;

CREATE TABLE users (
id INT(50) auto_increment not null,
name VARCHAR(255) not null,
email VARCHAR(255) not null,
password VARCHAR(255) not null,
age INT(50) not null,
token VARCHAR(255), -- put token in session storage in browser --
current_room VARCHAR(255),
listening bit default 0,
speaking bit default 0,
waiting bit default 0,
likes INT(50) default 0,
primary key(id)
);

CREATE TABLE happy_chats (
id INT(50) auto_increment not null,
userid INT(50) not null,
FOREIGN KEY (userid)
        REFERENCES users(id)
        ON DELETE CASCADE,
message VARCHAR(255) not null,
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key(id)
);

CREATE TABLE sad_chats (
id INT(50) auto_increment not null,
userid INT(50) not null,
FOREIGN KEY (userid)
        REFERENCES users(id)
        ON DELETE CASCADE,
message VARCHAR(255) not null,
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key(id)
);

CREATE TABLE likeslookup(
id INT(50) auto_increment not null,
likerid INT(50),
likeyid INT(50),
primary key(id)
);
