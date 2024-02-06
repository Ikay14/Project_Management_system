const User = require('../models/users');
const { CustomAPIError, createCustomError } = require('../errors/custom-errors');
const asyncWrapper = require('../middleware/async');
const utils = require('../utils/bcryptic');
const { generateToken } = require('../utils/jwtUtils');

const registerUser = asyncWrapper(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(createCustomError('User already exists', 400));
    }

    const newUser = await User.create({ username, email, password });

    if (!newUser) {
        return next(createCustomError('User not created', 500));
    }
    res.status(201).json({ msg: 'User registered successfully', user: newUser });
});

const loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(createCustomError('User not found', 404));
    }
    const passwordsMatch = await utils.bcryptUtils.comparePasswords(password, user.password);

    if (!passwordsMatch) {
        return next(createCustomError('Incorrect Password', 401));
    }

    const token = generateToken(user.userId);
    res.status(200).json({ msg: 'Login successful', user, token });
});

const userProfile = asyncWrapper(async (req, res, next) => {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
        return next(createCustomError('User not found', 404));
    }
    res.status(200).json({ msg: 'User profile retrieved successfully', user });
});

module.exports = {
    registerUser,
    loginUser,
    userProfile
};
