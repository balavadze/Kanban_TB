const { check } = require("express-validator");
const db = require("../database/setup");
const { compare } = require("bcryptjs");

//password
const password = check("password")
  .isStrongPassword()
  .withMessage("Use a strong password")
  .trim()
  .escape();

//email
const email = check("email")
  .isEmail()
  .withMessage("Please enter a valid email!")
  .trim()
  .escape();

//check if email exists

const emailExists = check("email").custom(async (value) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    value,
  ]);
  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

//login validation

const loginCheck = check("email").custom(async (value, { req }) => {
  // return console.log(req.body);
  const user = await db.query("SELECT * from users WHERE email = $1", [value]);
  // console.log(user);

  // Check if email  exists

  if (!user.rows.length) {
    throw new Error("Email does not exists.");
  }

  console.log(user.rows[0].password);

  //! Check if hash password = inputed pwd

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Wrong password");
  }
  req.user = user.rows[0];
});

// Check if password from PSQL database !== password from inputField - FOR NOT HASHED PWD
//   if (user.rows[0].password !== req.body.password) {
//     // console.log("true");
//     throw new Error("Wrong password");
//   }

//   req.user = user.rows;
// });

module.exports = {
  registerValidation: [email, password, emailExists],

  loginValidation: [loginCheck],
};
