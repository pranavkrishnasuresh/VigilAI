const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech').v1p1beta1;
const axios = require('axios');
const OpenAI = require("openai").OpenAI;
require('dotenv').config();




const diarizationController = async (req, res) => {
  try {
    // const {name, videoLink, copId } = req.body;
    const finalInfoToBePushedToFirestore = {
      name: "", 
      id: "", 
      videoLink: "",
      copId: "",
      chats: [],
      mistakes: []
    }

    const { uri } = req.body;


    // Output path for the extracted audio
    const path = require('path')
    const cwd = path.join(__dirname, '..')
    const destFileName = path.join(cwd, 'downloaded.mp4')
    const outputFileName = path.join(cwd, 'brooklyn.flac')


    // Configure Google Cloud Storage
    const storage = new Storage();
    const bucketName = 'atlanta_pd';
    const fileName = 'Billy/BillyPDBeat.mp4';
    const client = new speech.SpeechClient(); // You need to define/get your SpeechClient


    console.log("Do I get here")

    // Download the video from Google Cloud Storage

    const config = {
      encoding: 'FLAC',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      enableSpeakerDiarization: true,
      model: 'default',
      enableWordTimeOffsets: true, // Enable word-level timestamps

    };

    const audio = {
      uri: uri,
    };

    const request = {
      config: config,
      audio: audio,

    }

    const [operation] = await client.longRunningRecognize(request);

    const [response] = await operation.promise();


    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    const result = response.results[0];
    const wordsInfo = result.alternatives[0].words;

    const speakerInfo = wordsInfo.map(a => ({
      word: a.word,
      speakerTag: a.speakerTag,
      startTime: parseInt(a.startTime.seconds) + a.startTime.nanos / 1e9,
      endTime: parseInt(a.endTime.seconds) + a.endTime.nanos / 1e9,
    }));

    const finalString = speakerInfo.map(item => {
      return `Word: ${item.word}, Speaker Tag: ${item.speakerTag}`;
    }).join('\n');


    const prompt = "You will only return me a single number, nothing more. Under no conditions will you return more than a single number. You are not allowed to return a word to me. Below is a concatenation of the words spoken either by 1 individual or 2 individuals in a conversation in a string format. Below that is an array that first includes the word spoken and then the speakertag. The number depicts an individual. Every individual has one and only one speakertag. There are two individuals in this conversation, a police officer and a suspect. Tell me which speakertag you think corresponds to the police officer." + finalString;

    const openai = new OpenAI();

    console.log(speakerInfo)
    
    const GPTresponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        }
      ],
      max_tokens: 5, 
    });

const copSpeaker = parseInt(GPTresponse.choices[0].message.content);
let currentSpeaker = speakerInfo[0].speakerTag;
console.log('Type of currentSpeaker:', typeof currentSpeaker);


let sentence = '';
let start = 0;
let currentSentence = ["", 0, 0, ""];

for (let i = 0; i < speakerInfo.length; i++) {
  const word = speakerInfo[i].word;
  const speakerTag = speakerInfo[i].speakerTag;
  const startTime = speakerInfo[i].startTime;
  const endTime = speakerInfo[i].endTime;

  if (speakerTag === currentSpeaker) {
    if (sentence === '') {
      start = startTime;
    }
    sentence += word + ' ';
  } else {
    if (sentence !== '') {
      currentSentence[0] = sentence.trim();
      currentSentence[1] = start;
      currentSentence[2] = endTime;
      currentSentence[3] = currentSpeaker === copSpeaker ? 'Cop' : 'Suspect';
      finalInfoToBePushedToFirestore.chats.push({ ...currentSentence });
      sentence = '';
    }
    currentSpeaker = speakerTag;
    i--; // Re-check the current index as it may belong to the new speaker
  }
}

// Push the last sentence if not already added
if (sentence !== '') {
  currentSentence[0] = sentence.trim();
  currentSentence[1] = start;
  currentSentence[2] = speakerInfo[speakerInfo.length - 1].endTime;
  currentSentence[3] = currentSpeaker === copSpeaker ? 'Cop' : 'Suspect';
  finalInfoToBePushedToFirestore.chats.push(currentSentence);
}

  res.status(200).json(finalInfoToBePushedToFirestore.chats);


  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = diarizationController;