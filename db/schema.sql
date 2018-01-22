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
    name varchar(255),
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

insert into questions(topic, subtopic, question) values
(
    "1D Kinematics",
    "Scalar and Vectors",
    '{
        "text":"This is the first question",
        "correct":["Correct 1"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "1D Kinematics",
    "Scalar and Vectors",
    '{
        "text":"This is the second question",
        "correct":["Correct 1", "Correct 2"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "1D Kinematics",
    "Scalar and Vectors",
    '{
        "text":"This is the first question",
        "correct":["Correct 1"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3", "Wrong 4"]
    }'
),

(
    "1D Kinematics",
    "Distance and Displacement",
    '{
        "text":"This is the first question",
        "correct":["Correct 1", "Correct 2", "Correct 3"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "1D Kinematics",
    "Distance and Displacement",
    '{
        "text":"This is the first question",
        "correct":["Correct 1", "Correct 2", "Correct 3"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "1D Kinematics",
    "General Relativity",
    '{
        "text":"This is the first question",
        "correct":["Correct 1", "Correct 2", "Correct 3"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "Momentum",
    "Basics",
    '{
        "text":"This is the first question",
        "correct":["Correct 1", "Correct 2", "Correct 3"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "Momentum",
    "Basics",
    '{
        "text":"This is another basic momnentum question",
        "correct":["Correct 1", "Correct 2", "Correct 3"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
),

(
    "Momentum",
    "Advanced",
    '{
        "text":"This is the first question",
        "correct":["Correct 1", "Correct 2", "Correct 3"],
        "wrong":["Wrong 1", "Wrong 2", "Wrong 3"]
    }'
);

insert into users(name) values
(
    "Luke"
);

insert into correctlookup(userid, questionid) values
(1, 1),
(1, 7),
(1, 3);

insert into wronglookup(userid, questionid) values
(1, 2),
(1, 6);

select * from questions where topic="1D Kinematics" and subtopic="Scalar and Vectors" and questions.id not in (select questionid from correctlookup where userid=1) and questions.id not in (select questionid from wronglookup where userid=1);


