const Joi = require("joi");
const mongoose = require("mongoose");

// author schema
const authorSchema = new mongoose.Schema({
  author_firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  author_lastName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  author_userName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
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

// user validator by Joi
function validateAuthor(user) {
  const schema = {
    author_firstName: Joi.string()
      .min(4)
      .max(255)
      .required(),
    author_lastName: Joi.string()
      .min(4)
      .max(255)
      .required(),
    author_userName: Joi.string()
      .min(4)
      .max(255)
      .required(),
    author_email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    author_password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    author_role: Joi.number().required(),
    author_status: Joi.number().required()
  };

  return Joi.validate(user, schema);
}

// password complexity validator
function validatePasswordComplexity(pass) {
  var passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(6) // Minimum length 8
    .is()
    .max(255) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols() // Must have symbols
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
  return passwordSchema.validate(pass, { list: true });
}

// author model
const Author = mongoose.model("Author", authorSchema);

exports.Author = Author;
exports.validateAuthor = validateAuthor;
exports.validatePasswordComplexity = validatePasswordComplexity;
