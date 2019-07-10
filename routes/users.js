const express = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const asyncMiddleware = require('../utils/asyncMiddleware');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();


const User = require('../models/User');

// @route   POST /api/users
// @desc    Register a user
// @access  Public

router.post('/', [
  check('name', 'Please, enter a name').not().isEmpty(),
  check('email', 'Please, input a valid email').isEmail(),
  check('password', 'Please, enter a password with 6 and more characters').isLength({min: 6})
], asyncMiddleware(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {name, email, password} = req.body;
  let user = await User.findOne({email});
  if (user) {
    return res.status(400).json({msg: 'User already exists'});
  }
  user = new User({
    name,
    email,
    password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  const payload = {
    user: {
      id: user.id
    }
  };
  const jwtSecret = config.get('jwtSecret');
  const jwtOptions = {
    expiresIn: 3600
  };
  jwt.sign(payload, jwtSecret, jwtOptions, (err, token) => {
    if (err) throw err;
    res.json({token});
  });
}));
module.exports = router;
