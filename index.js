const express = require("express");

const app = express();

app.use(logger); 

app.get("/books", logger, logger, logger, (req, res) => {
  return res.send({ route: "/books", role: req.role });
});

app.get("/libraries ", (req, res) => {
  return res.send({ route: "/libraries ", role: req.role });
});



app.get("/authors", loggedIn("authors"), (req, res) => {
  return res.send("permission:", true);
});

function loggedIn(role) {
  return function logger(req, res, next) {
    if (role === "authors") {
      return next();
    }
    return res.send(true);
  };
}

function logger(req, res, next) {
  if (req.path === "/books") {
    req.role = "books";
  } else if (req.path === "/admin") {
    req.role = "admin";
  } else {
    req.role = "somebody";
  }
  console.log("logged");
  next();
}

app.listen(5000, () => {
  console.log("listening on port 5000");
});