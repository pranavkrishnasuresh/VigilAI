const express = require('express');
const bodyParser = require('body-parser');
const transcriptionController = require('./controllers/transcriptionController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/transcribe', async (req, res) => {
  try {
    const gcsUri = req.body.gcsUri;
    const transcription = await transcriptionController.transcribeSpeech(gcsUri);

    console.log(`Transcription: \n${transcription}`);
    res.status(200).json({ transcription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
