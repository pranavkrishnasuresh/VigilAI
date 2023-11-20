const express = require('express');
const videoAnnotationController = require('./videoAnnotationController');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(express.json());

app.post('/annotateVideo', async (req, res) => {
  try {
    const { inputUri, keyFilePath } = req.body;
    
    // Validate input
    if (!inputUri || !keyFilePath) {
      return res.status(400).json({ error: 'Bad Request', details: 'Missing inputUri or keyFilePath' });
    }

    const results = await videoAnnotationController.annotateVideo(inputUri, keyFilePath);
    res.json({ results });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});