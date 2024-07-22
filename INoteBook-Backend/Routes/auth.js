const express = require('express')
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_Secret = 'Baljeetisagoodb$oy';

//Route 1: Create a user using: POST "/api/auth/createuser". No Login required 
router.post('/createuser',
    // Data validators set by body function of express; on error, show msg => body(..., this one on error).isLength...........
    [
        body('name', "Enter a valid Name").isLength({ min: 3 }),
        body('email', "Enter a valid Email").isEmail(),
        body('password', "Password must be greater than 4 characters").isLength({ min: 4 })
    ],
    // If there are errors, return Bad response and the errors
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        // Check Email Repetition
        try {
            let existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);
            // Create a New user
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass // Storing password as Hash
            });
            // Provide a Token to User
            const data = {
                user: {
                    id: user.id
                }
            }
            const AuthToken = jwt.sign(data, JWT_Secret);
            success=true;
            res.json({success, AuthToken });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

// 6.15 version of express provide this express-validator

//Route 2: Authenticate a user using: POST "/api/auth/login". No Login required 
router.post('/login',
    // Data validators set by body function of express; on error, show msg
    [
        body('email', "Enter a valid Email").isEmail(),
        body('password', "Password must be greater than 4 characters").exists()
    ],
    // If there are errors, return Bad response and the errors
    async (req, res) => {
        const errors = validationResult(req);
        let success=false;
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, error: "Please try to login with valid credentials" });
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ success, error: "Please try to login with valid credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, JWT_Secret);
            success=true;
            res.json({success, authToken });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Route 3: Get a user Details using: POST "/api/auth/getuser".  Login required 
router.get('/getuser',fetchuser,
    // If there are errors, return Bad response and the errors
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
           const  userid=req.user.id
            const user = await User.findById(userid).select('-password')
            res.send(user)
        }catch (err) {
            console.error(err.message);
            res.status(500).send(' Internal Server Error');
        }
    })
module.exports = router;