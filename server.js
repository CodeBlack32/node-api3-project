const express = require("express");
const userdb = require("./users/userDb");
const postdb = require("./posts/postDb");

const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use("/api/posts", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Use Custom Middleware
server.use(logger);
server.use(ValidateID);
server.use(ValidateUser);
server.use(ValidatePost);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()} ${req.method} request to ${req.url} ${req.get(
      "Origin"
    )}`
  );
  next();
}

function ValidateID(req, res, next) {
  const { id } = req.params;

  userdb
    .getByID(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "Invalid user id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failure!", err });
    });
}

const ValidateUser = (req, res, next) => {
  // if not a body or the body equals and empty object then give status message but if not then move to the next middleware (Next())
  if (!req.body || req.body === {}) {
    res.status(400).json({ Message: "missing user data" });
  } else if (!req.name) {
    res.status(400).json({ Message: "missing required name field" });
  } else {
    next();
  }
};

const ValidatePost = (req, res, next) => {
  const enterText = req.name
    ? // if req.name has a value then nameInsert = req.name (:)= but if not, then nameInsert = "" (empty string)
      ` ${req.text}`
    : res.status(400).json({ message: "missing required text field" });
  // if not a body or the body equals and empty object then give status message but if not then move to the next middleware (Next())
  !req.body || req.body === {}
    ? res.status(400).json({ message: "missing post data" })
    : next(enterText);
};

// Endpoints
server.get("/api/posts", (req, res) => {
  userdb
    .getUserPosts(userId)
    .then((posted) => {
      res.status(200).json({ posted });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;
  postdb
    .insert(newPost)
    .then((addPost) => {
      res.status(201).json({ success: true, addPost });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

module.exports = server;
