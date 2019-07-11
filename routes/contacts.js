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

router.post('/', (req, res) => {
  res.send('Add new contact');
});

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
