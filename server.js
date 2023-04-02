const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json()); // แปลง json ให้เป็น Object
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,FETCH, PATCH"
  );
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "week13",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL", err);
    return;
  }
  console.log("My SQL successfuly connected!");
});

//insert
app.post("/create", async (req, res) => {
  const { id, name, email } = req.body;
  try {
    connection.query(
      "INSERT INTO students(id, name, email) VALUES(?,?,?)",
      [id, name, email],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting a user into the database", err);
          return res.status(400).send();
        }
        return res.status(201).json({ message: "New user successfully" });
      }
    );
  } catch (err) {
    console.log("Connection Error", err);
    return res.status(500).send();
  }
});

//select *
// read all user
app.get("/read", async (req, res) => {
  try {
    connection.query("SELECT * FROM students", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//select specific
// read single
app.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  try {
    connection.query(
      "SELECT * FROM students where id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//update
app.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const newname = req.body.name;
  const newemail = req.body.email;
  try {
    connection.query(
      "UPDATE students SET name = ?, email = ? where id= ?",
      [newname, newemail, id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json({ message: "name Updated" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    connection.query(
      "DELETE FROM students WHERE id = ? ",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }

        res.status(200).json({ message: "Deleted!!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.listen(3000, () => console.log("server is running on port 3000"));
