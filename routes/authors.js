const express = require("express")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const {
    Author,
    validateAuthor,
    validatePasswordComplexity
  } = require("../models/author")
const router = express.Router()

router.post("/", async (req, res) => {
  const { error } = validateAuthor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check the passwrod complexity
  const pass = validatePasswordComplexity(req.body.password);
  if (pass.length) {
    return res.status(400).send("The password must have or contain:  " + pass);
  }

  // check to see if the user with the entered email already exists
  try {
    let author = await Author.findOne({ email: req.body.email });
    if (author) return res.status(400).send("User already registered.");
  } catch (ex) {
    console.log(ex.message);
  }

  const authorObj = _.pick(req.body, [
    "first_name",
    "last_name",
    "user_name",
    "email",
    "password",
    "status",
    "role"
  ]);
  author = new Author({ ...authorObj });
  // hash the password
  try {
    const salt = await bcrypt.genSalt(10);
    author.password = await bcrypt.hash(author.password, salt);
  } catch (ex) {
    console.log(ex.message);
  }

  // save the user in DB
  await author.save();

  res.send(
    _.pick(author, ["_id", "first_name", "last_name", "user_name", "email"])
  );
})

module.exports = router;