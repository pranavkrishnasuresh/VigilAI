// officerAuthRoutes.js

const express = require('express');
const admin = require('../config/firebase-config');
const db = admin.firestore();

const router = express.Router();

// Signup logic for officer users
router.post('/officer/signup', async (req, res) => {
    try {
        const { name, email, password, stationID } = req.body;

        // Create the user in Firebase Authentication
        const userCredential = await admin.auth().createUser({
            email,
            password,
        });

        // Additional data to be stored in Firestore for the officer user
        const userData = {
            name,
            email,
            badge_num: "hui",
            calibration_clip: null,
            my_reports: [],
            my_quizes: [],
            stationID,
        };

        // Save user data to Firestore in the 'officers' collection
        await db.collection('officers').doc(userCredential.uid).set(userData);

        res.status(200).send({ message: 'Officer user created successfully', user: userCredential.user });
    } catch (error) {
        res.status(400).send(error);
    }
});


// Signin logic for officer users
router.post('/officer/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Middleware for officer authentication verification
const authenticateOfficerUser = async (req, res, next) => {
    const idToken = req.headers.authorization;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
};

// Endpoint accessible only to authenticated officer users
router.get('/officer/protected-route', authenticateOfficerUser, (req, res) => {
    res.status(200).send('Access granted to officer user');
});


module.exports = router;
