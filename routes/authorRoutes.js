const express = require("express");
const Author = require("../models/authorModel");

const router = express.Router();

// GET /authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /authors/:id
router.get("/:id", async (req, res) => {
  const authorId = req.params.id;

  try {
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /authors
router.post("/", async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "Please provide first_name, and last_name" });
    }
    const newAuthor = await Author.create({ first_name, last_name });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /authors/:id
router.put("/:id", async (req, res) => {
  const authorId = req.params.id;
  const { first_name, last_name } = req.body;

  try {
    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "Please provide first_name, and last_name" });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { first_name, last_name },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /authors/:id
router.delete('/:id', async (req, res) => {
    const authorId = req.params.id;
  
    try {
      const deletedAuthor = await Author.findByIdAndDelete(authorId);
  
      if (!deletedAuthor) {
        return res.status(404).json({ error: 'Author not found' });
      }
  
      res.json(deletedAuthor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
