const express = require('express');
const router = express.Router();


router.get('/getAllOfficers', async (req, res) => {
    const id = req.body
    try {
    
    } catch (error) {
      console.error('Error:', error.message);
      res.status(700).json({ error: 'Internal Server Error' });
    }
  });


  module.exports = router;
