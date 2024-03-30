const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jwtSecret = "salgjjhslfisgdjfhgsgfshhfkhsufyeuiysdggfhgsdbsdhg";
router.post(
  "/createuser",
  [
    body("email", "invalid Email").isEmail(),
    body("name", "Must contain atleast 5 characters").isLength({ min: 5 }),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
      }).then(res.json({ success: true }));
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Login with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Try Login with correct credentials" });
      }
      const data = {
        user:{
            id: userData.id,
        }
      }

      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true, authToken:authToken});
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
