const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
},{
    timestamps:true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
