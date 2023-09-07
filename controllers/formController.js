const Form = require('../models/FormSchema');

// Create a new user
exports.createForm = async (req, res) => {
  try {
    const newUser = new Form(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

// Fetch all users
exports.getAllForm = async (req, res) => {
  try {
    const users = await Form.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Fetch a user by ID
exports.getFormById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Form.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update a user by ID
exports.updateFormById = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await Form.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by ID
exports.deleteFormById = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await Form.findByIdAndRemove(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
