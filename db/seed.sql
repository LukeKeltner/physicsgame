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
    primary key(id)
);

create table questionlookup
(
    id int(50) not null auto_increment,
    userid INT(50) not null,
    FOREIGN KEY (userid)
            REFERENCES users(id)
            ON DELETE CASCADE,
    questionid INT(50) not null,
    foreign key (questionid)
            references questions(id)
            on delete cascade
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
    "Distance and Displacement",
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

select distinct subtopic from questions where topic = "1D Kinematics";


