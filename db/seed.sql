insert into questions(topic, subtopic, question) values
(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Who is this character?",
        "correct":["Harry Potter"],
        "wrong":["Hermione Granger", "Ron Weasley", "Professor Snape", "Dolores Umbridge"],
        "img":"harrypotter.jpg"
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Who is this character?",
        "correct":["Ron Weasley"],
        "wrong":["Hermione Granger", "Harry Potter", "Professor Snape", "Dolores Umbridge"],
        "img":"ron.jpg"
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Who is this character?",
        "correct":["Hermione Granger"],
        "wrong":["Ron Weasley", "Harry Potter", "Professor Snape", "Dolores Umbridge"],
        "img":"hermione.jpg"
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Who is this character?",
        "correct":["Dolores Umbridge"],
        "wrong":["Ron Weasley", "Harry Potter", "Professor Snape", "Hermione Granger"],
        "img":"dolores.jpg"
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Who is this character?",
        "correct":["Professor Snape"],
        "wrong":["Hermione Granger", "Ron Weasley", "Harry Potter", "Dolores Umbridge"],
        "img":"snape.jpg"
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"In Beauty and the Beast, Mrs. Potts is the mother of which personified household object?",
        "correct":["A teacup named Chip"],
        "wrong":["A candlestick named Lumiere", "A clock named Cogsworth", "A footstool named Sultan"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Which of the following Disney characters were born into royalty?",
        "correct":["Hercules", "Simba", "Ariel"],
        "wrong":["Aladdin", "Belle"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"Which Disney Princess owned a pet tiger named Raja?",
        "correct":["Jasmine"],
        "wrong":["Snow White", "Cinderella", "Nala", "Ariel"],
        "img":"raja.jpg"
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"In The Sword in the Stone, what does Merlin call The Greatest Force on Earth?",
        "correct":["Love"],
        "wrong":["Happiness", "Power", "Courage", "Money"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"In the Lion King, where does Mufasa and his family live?",
        "correct":["Pride Rock"],
        "wrong":["Bikini Bottom", "Camelot", "The Upside Down", "Hogwarts", "Middle Earth"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 2+2?",
        "correct":["4"],
        "wrong":["1", "2", "3", "5"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 14+6?",
        "correct":["20"],
        "wrong":["10", "30", "40"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 300+14?",
        "correct":["314"],
        "wrong":["315", "209", "340", "460"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 3+3?",
        "correct":["6"],
        "wrong":["7", "8", "9", "5"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 2+6?",
        "correct":["8"],
        "wrong":["13", "29", "11", "10"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 2x6?",
        "correct":["12"],
        "wrong":["13", "29", "11", "10"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 4x6?",
        "correct":["24"],
        "wrong":["23", "29", "21", "20"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"x squared equals 4, what is x?",
        "correct":["+2", "-2"],
        "wrong":["+4", "-4", "+1", "-1", "0"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is 11x2?",
        "correct":["22"],
        "wrong":["23", "29", "21", "20"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"What is i squared?",
        "correct":["-1"],
        "wrong":["1", "0", "2", "-2"]
    }'
),

(
    "Just for Fun",
    "Random Questions",
    '{
        "text":"An object is launched at rand0 degrees from the horizontal at an initial speed of rand1 m/s on a horizontal surface.  Using g = 10 m/s/s, how far does the object travel by the time it hits the ground?",
        "correct":["rand1*rand1*sin(2*rand0*pi/180)/10"],
        "wrong":["rand0-rand1", "rand0*rand1", "rand0/rand1"],
        "random":2,
        "rand0": [10,80,0],
        "rand1":  [1,10,2]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a rand0 m cliff with an initial velocity of rand1 m/s. How far in meters from the base of the cliff does the ball get by the time it hits the water?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["rand1*sqrt(rand0/5)"],
        "wrong":["5*(rand1/rand0)^2", "sqrt(5/rand0)*rand1", "rand0*sqrt(rand1/5)"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [10,100,0],
        "rand1": [1,10,2]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a cliff with an initial velocity of rand0 m/s. The ball ends up rand1 m away from the base of the cliff.  How high is the cliff in meters?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["5*(rand1/rand0)^2"],
        "wrong":["rand1*sqrt(rand0/5)", "sqrt(5/rand0)*rand1", "5*(rand0/rand1)^2"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [1,10,2],
        "rand1": [30,100,0]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a rand0 m cliff with some initial velocity. The ball ends up rand1 m away from the base of the cliff.  What must have been the initial velocity of the ball in meters per second?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["sqrt(5/rand0)*rand1"],
        "wrong":["rand1*sqrt(rand0/5)", "5*(rand1/rand0)^2", "sqrt(5/rand1)*rand0"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [10,100,0],
        "rand1": [10,50,2]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a rand0 m cliff with an initial velocity of rand1 m/s. How far in meters from the base of the cliff does the ball get by the time it hits the water?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["rand1*sqrt(rand0/5)"],
        "wrong":["5*(rand1/rand0)^2", "sqrt(5/rand0)*rand1", "rand0*sqrt(rand1/5)"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [10,100,0],
        "rand1": [1,10,2]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a cliff with an initial velocity of rand0 m/s. The ball ends up rand1 m away from the base of the cliff.  How high is the cliff in meters?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["5*(rand1/rand0)^2"],
        "wrong":["rand1*sqrt(rand0/5)", "sqrt(5/rand0)*rand1", "5*(rand0/rand1)^2"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [1,10,2],
        "rand1": [30,100,0]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a rand0 m cliff with some initial velocity. The ball ends up rand1 m away from the base of the cliff.  What must have been the initial velocity of the ball in meters per second?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["sqrt(5/rand0)*rand1"],
        "wrong":["rand1*sqrt(rand0/5)", "5*(rand1/rand0)^2", "sqrt(5/rand1)*rand0"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [10,100,0],
        "rand1": [10,50,2]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a rand0 m cliff with an initial velocity of rand1 m/s. How far in meters from the base of the cliff does the ball get by the time it hits the water?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["rand1*sqrt(rand0/5)"],
        "wrong":["5*(rand1/rand0)^2", "sqrt(5/rand0)*rand1", "rand0*sqrt(rand1/5)"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [10,100,0],
        "rand1": [1,10,2]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a cliff with an initial velocity of rand0 m/s. The ball ends up rand1 m away from the base of the cliff.  How high is the cliff in meters?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["5*(rand1/rand0)^2"],
        "wrong":["rand1*sqrt(rand0/5)", "sqrt(5/rand0)*rand1", "5*(rand0/rand1)^2"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [1,10,2],
        "rand1": [30,100,0]
    }'
),

(
    "2D Kinematics",
    "Horizontal Projectiles",
    '{
        "text":"A ball is launched completely horizontally off a rand0 m cliff with some initial velocity. The ball ends up rand1 m away from the base of the cliff.  What must have been the initial velocity of the ball in meters per second?  Use the acceleration due to gravity to be 10 m/s/s.",
        "correct":["sqrt(5/rand0)*rand1"],
        "wrong":["rand1*sqrt(rand0/5)", "5*(rand1/rand0)^2", "sqrt(5/rand1)*rand0"],
        "img":"horizontalprojectile.jpg",
        "random":2,
        "rand0": [10,100,0],
        "rand1": [10,50,2]
    }'
);

wharr@hawken.edu
21royris@hawken.edu
21obrmai@hawken.edu
21allfis@hawken.edu
21katchl@hawken.edu
21drolau@hawken.edu