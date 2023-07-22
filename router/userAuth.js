const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../dbModels/userModel');

const router = express.Router();

router.post('/mainAdminlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.jwtSecret, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    // Check if the user already exists with the same username or email
    const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same username or email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await User.create({ username: username, email: email, password: hashedPassword });

    // Generate a token for the new user
    const newUser = await User.findOne({ where: { username: username } });
    const token = jwt.sign({ userId: newUser.id }, process.env.jwtSecret, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (err) {
    console.error('Error during user registration:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
