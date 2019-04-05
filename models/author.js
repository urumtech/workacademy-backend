const mongoose = require("mongoose");

// author schema
const authorSchema = new mongoose.Schema({
  author_firstName: { type: String, required: true, minlength: 4, maxlength: 255 },
  author_lastName: { type: String, required: true, minlength: 4, maxlength: 255 },
  author_userName: { type: String, required: true, minlength: 4, maxlength: 255 },
  author_email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  author_password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    unique: true
  },
  author_status: {
    type: Number,
    required: true
  },
  author_role: [Number]
});

// author model
const Author = mongoose.model("Author", authorSchema);

exports.Author = Author;