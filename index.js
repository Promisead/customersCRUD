const express = require("express");
const app = express();

app.use(express.json());
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Welcome Back");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    //400 Bad Request
    res.status(404).send("Name is required and should be minimum 3 characters");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given Id was not found");

  if (!req.body.name || req.body.name.length < 3) {
    //400 Bad Request
    return res
      .status(404)
      .send("Name is required and should be minimum 3 characters");
  }
  //update course
  course.name = req.body.name;
  //return the updated course
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //look up the course
  // return invalid if not available
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given Id was not found");

  //Delete if available
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //return same course
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on ${port}...`);
});
