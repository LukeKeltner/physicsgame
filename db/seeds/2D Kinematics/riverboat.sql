insert into questions(topic, subtopic, question) values
(
    "2D Kinematics",
    "River Boat Problems",
    '{
        "text":"A motorboat traveling at rand0 m/s East is crossing a rand1 m wide river with a current of rand2 m/s North.  How far downstream, in meters, is the boat by the time it gets to the other side of the river?",
        "correct":["rand2*rand1/rand0"],
        "wrong":["rand0*rand1/rand2", "rand1/rand2*1.5", "rand1/rand2*4.3"],
        "random":3,
        "rand0": [1,5,2],
        "rand1": [10,100,0],
        "rand2": [1,5,2]
    }'
),

(
    "2D Kinematics",
    "River Boat Problems",
    '{
        "text":"A motorboat traveling at rand0 m/s South is crossing a river with a current of rand1 m/s West.  If the motorboat ends up rand2 m downstream by the time it gets to the other side of the river, how wide is the river in meters?",
        "correct":["rand0*rand2/rand1"],
        "wrong":["rand1*rand2/rand0", "rand2/rand0*2.3", "rand2/rand1*3.8"],
        "random":3,
        "rand0": [1,5,2],
        "rand1": [1,5,2],
        "rand2": [10,100,0]
    }'
),

(
    "2D Kinematics",
    "River Boat Problems",
    '{
        "text":"A motorboat traveling at rand0 m/s East is crossing a rand1 m wide river with a current of rand2 m/s South.  How far downstream, in meters, is the boat by the time it gets to the other side of the river?",
        "correct":["rand2*rand1/rand0"],
        "wrong":["rand0*rand1/rand2", "rand1/rand2*1.5", "rand1/rand2*4.3"],
        "random":3,
        "rand0": [1,5,2],
        "rand1": [10,100,0],
        "rand2": [1,5,2]
    }'
),

(
    "2D Kinematics",
    "River Boat Problems",
    '{
        "text":"A motorboat traveling at rand0 m/s North is crossing a river with a current of rand1 m/s West.  If the motorboat ends up rand2 m downstream by the time it gets to the other side of the river, how wide is the river in meters?",
        "correct":["rand0*rand2/rand1"],
        "wrong":["rand1*rand2/rand0", "rand2/rand0*2.3", "rand2/rand1*3.8"],
        "random":3,
        "rand0": [1,5,2],
        "rand1": [1,5,2],
        "rand2": [10,100,0]
    }'
),

(
    "2D Kinematics",
    "River Boat Problems",
    '{
        "text":"A motorboat traveling at rand0 m/s South is crossing a rand1 m wide river with a current of rand2 m/s East.  How far downstream, in meters, is the boat by the time it gets to the other side of the river?",
        "correct":["rand2*rand1/rand0"],
        "wrong":["rand0*rand1/rand2", "rand1/rand2*1.5", "rand1/rand2*4.3"],
        "random":3,
        "rand0": [1,5,2],
        "rand1": [10,100,0],
        "rand2": [1,5,2]
    }'
),

(
    "2D Kinematics",
    "River Boat Problems",
    '{
        "text":"A motorboat traveling at rand0 m/s West is crossing a river with a current of rand1 m/s North.  If the motorboat ends up rand2 m downstream by the time it gets to the other side of the river, how wide is the river in meters?",
        "correct":["rand0*rand2/rand1"],
        "wrong":["rand1*rand2/rand0", "rand2/rand0*2.3", "rand2/rand1*3.8"],
        "random":3,
        "rand0": [1,5,2],
        "rand1": [1,5,2],
        "rand2": [10,100,0]
    }'
);