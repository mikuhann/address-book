const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const asyncMiddleware = require('../utils/asyncMiddleware');
const authMiddleware = require('../utils/authMiddleware');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET /api/contacts
// @desc    Get all users contacts
// @access  Private

router.get('/', authMiddleware, asyncMiddleware(async (req, res) => {
  const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
  res.json(contacts);
}));

// @route   POST /api/contacts
// @desc    add new contact
// @access  Private

router.post('/', [authMiddleware, [
  check('name', 'Name field is required').not().isEmpty(),
  check('email', 'Email field is required').not().isEmpty()
]] , asyncMiddleware(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {name, email, phone, type} = req.body;
  const newContact = new Contact({
    name,
    email,
    phone,
    type,
    user: req.user.id
  });
  const contact = await newContact.save();
  res.json(contact);
}));

// @route   PUT /api/contacts/:id
// @desc    update contact
// @access  Private

router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   DELETE /api/contacts/:id
// @desc    delete contact
// @access  Private

router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
