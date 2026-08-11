import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
    jsonBodyMiddleware,
);

// automatic content-type became in json
app.get("/", (req, res) => {
    res.send({ message: "Test express library" });
});

const db = {
    courses: [
        {
            id: 1,
            title: "course 1",
        },
        {
            id: 2,
            title: "course 2",
        },
        {
            id: 3,
            title: "course 3",
        },
        {
            id: 4,
            title: "course 4",
        },
        {
            id: 5,
            title: "course 5",
        },
    ],
};

// when we do get request, we'll send this object with data
app.get("/courses", (req, res) => {
    let foundCoursesQuery = db.courses;

    if (req.query.title) {
        foundCoursesQuery = foundCoursesQuery.filter(
            (course) => course.title.indexOf(req.query.title as string) > -1,
        );
    }

    if (!foundCoursesQuery.length) {
        res.sendStatus(404);
        return;
    }

    res.json(foundCoursesQuery);
});

// when we do this request, we'll get specific array with data(from ID)
app.get("/courses/:id", (req, res) => {
    const foundCourses = db.courses.find(
        (course) => course.id === +req.params.id,
    );

    if (!foundCourses) {
        res.sendStatus(404);
        return;
    }

    res.json(foundCourses);
});

// this way is so poor, it's learning way
app.post("/courses", (req, res) => {
    // this practice
    // const createdNewCourse = {
    //     id: +new Date(),
    //     title: "unknown",
    // };

    const createdNewCourse = {
        id: +new Date(),
        title: req.body.title,
    };
    db.courses.push(createdNewCourse);
    console.log(createdNewCourse); // undefined 

    res.json(createdNewCourse);
});

app.listen(port, () => {
    console.log(`Test app listening on port ${port}`);
});
