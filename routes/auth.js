const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const asyncMiddleware = require('../utils/asyncMiddleware');
const authMiddleware = require('../utils/authMiddleware');

const User = require('../models/User');

// @route   GET /api/auth
// @desc    Get logged in user
// @access  Private

router.get('/', authMiddleware, asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
}));

// @route   POST /api/auth
// @desc    Auth user and get token back
// @access  Public

router.post('/', [
  check('email', 'Please, input a valid email').isEmail(),
  check('password', 'Please, input password').exists()
], asyncMiddleware(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {email, password} = req.body;
  let user = await User.findOne({email});
  if (!user) {
    return res.status(400).json({msg: 'Invalid credentials'});
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({msg: 'Invalid credentials'});
  }
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
  })
}));

module.exports = router;
