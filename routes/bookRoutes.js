const express = require("express");
const Book = require("../models/bookModel");
const Author = require("../models/authorModel");

const router = express.Router();
const mongoose = require("mongoose");

// GET /books
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  try {
    const totalBooks = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit).populate("author");

    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      books,
      page,
      limit,
      totalBooks,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
});

// GET /books/:id
router.get("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId).populate("author");

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
});

// POST /books
router.post("/", async (req, res) => {
  const { name, isbn, authorId } = req.body;

  try {
    if (!name || !isbn || !authorId) {
      return res
        .status(400)
        .json({ error: "Please provide name, isbn, and authorId" });
    }
    if (!mongoose.isValidObjectId(authorId)) {
      return res.status(400).json({ error: "Invalid authorId" });
    }
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const newBook = await Book.create({ name, isbn, author: authorId });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
});

// PUT /books/:id
router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const { name, isbn, authorId } = req.body;

  try {
    if (!name || !isbn || !authorId) {
      return res
        .status(400)
        .json({ error: "Please provide name, isbn, and authorId" });
    }
    if (!mongoose.isValidObjectId(authorId)) {
      return res.status(400).json({ error: "Invalid authorId" });
    }
    const author = await Author.findById(authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { name, isbn, author: authorId },
      { new: true } // Return the updated document
    ).populate("author");

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
});

// DELETE /books/:id
router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
