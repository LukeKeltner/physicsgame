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
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    token varchar(255),
    leaderboard bit not null,
    coins int(50) default 100,
    currentquestion int(50) default 0,
    currentgamble int(50) default 0,
    teacher varchar(255) not null,
    section varchar(255),
    headercolor varchar(255) default "#6400a8",
    icon varchar(255) default "default.svg",
    challengetokens int(50) default 0,
    challenging bit default 0,
    currentchallenger int(50) default 0,
    currentchallengeid int(50) default 0,
    totalcoins int(50) default 100,
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
    coins int(50) not null,
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
    coins int(50) not null,
    primary key(id)
);

create table challengelookup
(
    id int(50) not null auto_increment,
    challengedid INT(50) not null,
    FOREIGN KEY (challengedid)
            REFERENCES users(id)
            ON DELETE CASCADE,
    challengerid INT(50) not null,
    FOREIGN KEY (challengerid)
            REFERENCES users(id)
            ON DELETE CASCADE,
    questionid INT(50) not null,
    foreign key (questionid)
            references questions(id)
            on delete cascade,
    primary key(id)
);