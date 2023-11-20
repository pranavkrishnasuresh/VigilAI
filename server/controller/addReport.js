const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');

const storage = new Storage(); // Initialize Google Cloud Storage
const firestore = admin.firestore(); // Initialize Firestore
const bucket = storage.bucket('your-bucket-name'); // Replace 'your-bucket-name' with your actual bucket name

const addReport = async (req, res) => {
  try {
    const file = req.file; // Assuming req.file directly contains the uploaded file data

    // Upload the file to Google Cloud Storage
    console.log(file)
    const fileUpload = bucket.file(`videos/${file.originalname}`); // Set the destination path in your bucket

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Set the content type of the file
      },
    });

    stream.on('error', (err) => {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Error uploading file to Google Cloud Storage' });
    });

    stream.on('finish', async () => {
      // After the file is uploaded, continue with Firestore operations
      const { name, date, number } = req.body; // Get other data from the request body

      // Save data to Firestore
      const reportRef = await firestore.collection('reports').add({
        name: name,
        date: date,
        num_incidents: parseInt(number),
        videoUri: `gs://your-bucket-name/videos/${file.originalname}`, // Update with your bucket name
        // Add other fields as needed
      });

      console.log('Report added with ID:', reportRef.id);

      res.status(200).json({ message: 'File uploaded and report created successfully!' });
    });

    // Pipe the file data to the stream
    stream.end(file.buffer); // Assuming the file data is directly available in req.file.buffer
  } catch (error) {
    console.error('Error uploading file and creating report:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = addReport;
