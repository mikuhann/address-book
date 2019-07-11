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

router.get('/', authMiddleware, asyncMiddleware(async (req, res, next) => {
  const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
  res.json(contacts);
}));

// @route   POST /api/contacts
// @desc    add new contact
// @access  Private

router.post('/', [authMiddleware, [
  check('name', 'Name field is required').not().isEmpty(),
  check('email', 'Email field is required').not().isEmpty()
]] , asyncMiddleware(async (req, res, next) => {
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

router.put('/:id', authMiddleware, asyncMiddleware(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {name, email, phone, type} = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  let contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(400).json({msg: 'Contact not found'});
  }
  if (contact.user.toString() !== req.user.id) {
    return res.status(401).json({msg: 'Not authorized'});
  }
  contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {$set: contactFields},
    {new: true}
  );
  res.json(contact);
}));

// @route   DELETE /api/contacts/:id
// @desc    delete contact
// @access  Private

router.delete('/:id', authMiddleware, asyncMiddleware(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({msg: 'Contact not found'});
  }
  if (contact.user.toString() !== req.user.id) {
    return res.status(401).json({msg: 'Not authorized'});
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.json({msg: 'Contact removed'});
})) ;

module.exports = router;
