const Joi = require("joi");
const mongoose = require("mongoose");
const passwordValidator = require("password-validator");

// author schema
const authorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  last_name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  user_name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    unique: true
  },
  status: {
    type: Number,
    required: true
  },
  role: [Number]
});

// user validator by Joi
function validateAuthor(user) {
  const schema = {
    first_name: Joi.string()
      .min(4)
      .max(255)
      .required(),
    last_name: Joi.string()
      .min(4)
      .max(255)
      .required(),
    user_name: Joi.string()
      .min(4)
      .max(255)
      .required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    role: Joi.number().required(),
    status: Joi.number().required()
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
