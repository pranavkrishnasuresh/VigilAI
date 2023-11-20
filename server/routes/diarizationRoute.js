const express = require('express');
const router = express.Router();
const diarizationController = require('../controller/diarizationController')

router.post('/transcribe', async (req, res) => {
    console.log(req.body)
    try {
      // Call your existing controller function passing req, res, and client
      await diarizationController(req, res);

    } catch (error) {
      console.error('Error:', error.message);
      res.status(700).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;

