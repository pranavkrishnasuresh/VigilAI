const express = require('express');
const router = express.Router();
const { SpeechClient } = require('@google-cloud/speech').v1p1beta1;

// Install the transformers library
// npm install @huggingface/tokenizers
// npm install @huggingface/model



const { BertTokenizer, BertForSequenceClassification } = require("@huggingface/model");

// Load pre-trained BERT model and tokenizer for emotion analysis
const modelName = "nlptown/bert-base-multilingual-uncased-emotion";
const tokenizer = BertTokenizer.fromPretrained(modelName);
const model = BertForSequenceClassification.fromPretrained(modelName);

// Create a function for emotion analysis
function analyzeEmotion(text) {
  const inputs = tokenizer.encode(text, { return_tensors: "tf" });
  const outputs = model.predict(inputs);
  const prediction = outputs.logits.argMax().dataSync()[0];

  // Map the numeric labels to emotion categories
  const emotionLabels = ["happy", "distressed", "angry", "professional"];
  const emotion = emotionLabels[prediction];

  return emotion;
}

// Example usage
const textToAnalyze = "I love using Hugging Face and BERT for emotion analysis!";
const result = analyzeEmotion(textToAnalyze);
console.log(`Emotion: ${result}`);

router.post('/transcribe', async (req, res) => {
    console.log(req.body)
    try {
    
    
      // Assuming client is passed to your controller function
      const client = new SpeechClient(); // You need to define/get your SpeechClient
  
      // Call your existing controller function passing req, res, and client
    } catch (error) {
      console.error('Error:', error.message);
      res.status(700).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;
