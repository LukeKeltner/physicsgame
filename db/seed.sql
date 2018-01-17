DROP DATABASE IF EXISTS physicsgame;
CREATE DATABASE physicsgame;
USE physicsgame;

create table questions
(
    id int(50) not null auto_increment,
    name varchar(255),
    question nvarchar(8000),
    primary key(id)
);

insert into questions(name, question) values
(
    "Luke",
    '{
        "text":"Hey there!",
        "correct":["rand0+rand1"],
        "wrong":["This is wrong", "So is this"]
    }'
);
