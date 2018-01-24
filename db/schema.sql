DROP DATABASE IF EXISTS physicsgame;
CREATE DATABASE physicsgame;
USE physicsgame;

create table questions
(
    id int(50) not null auto_increment,
    topic varchar(255),
    subtopic varchar(255),
    question nvarchar(8000),
    totalcorrect int (50) default 0,
    totalwrong int(50) default 0,
    primary key(id)
);

create table users
(
    id int(50) not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    token varchar(255),
    leaderboard bit not null,
    coins int(50) default 100,
    currentquestion int(50) default 0,
    currentgamble int(50) default 0,
    primary key(id)
);

create table correctlookup
(
    id int(50) not null auto_increment,
    userid INT(50) not null,
    FOREIGN KEY (userid)
            REFERENCES users(id)
            ON DELETE CASCADE,
    questionid INT(50) not null,
    foreign key (questionid)
            references questions(id)
            on delete cascade,
    primary key(id)
);

create table wronglookup
(
    id int(50) not null auto_increment,
    userid INT(50) not null,
    FOREIGN KEY (userid)
            REFERENCES users(id)
            ON DELETE CASCADE,
    questionid INT(50) not null,
    foreign key (questionid)
            references questions(id)
            on delete cascade,
    primary key(id)
);
