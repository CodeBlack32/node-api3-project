const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
  const newPost = req.body;
  db.insert(newPost)
    .then((post) => {
      res.status(201).json({ success: true, post });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  router.get("/", (req, res) => {
    db.get()
      .then((posts) => {
        res.status(200).json({ posts });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const newInfo = req.body;

  db.update(id, newInfo)
    .then((updated) => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
