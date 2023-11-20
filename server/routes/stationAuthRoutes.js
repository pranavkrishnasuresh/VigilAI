const express = require('express');
const admin = require('../config/firebase-config');

const router = express.Router();

// Access Firestore from Firebase Admin
const db = admin.firestore();

// Signup logic for station users
router.post('/station/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Create the user in Firebase Authentication
        const user = await admin.auth().createUser({
            email,
            password,
        });

        // Additional data to be stored in Firestore for the user
        const userData = {
            email: user.email,
            name: name, 
            cops: [],
        };

        // Save user data to Firestore
        await db.collection('station').doc(user.uid).set(userData);

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
