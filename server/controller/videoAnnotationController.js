const { VideoIntelligenceServiceClient } = require('@google-cloud/video-intelligence');

async function annotateVideo(inputUri, keyFilePath) {
  try {
    // Validate input
    if (!inputUri || !keyFilePath) {
      throw new Error('Missing inputUri or keyFilePath');
    }

    const client = new VideoIntelligenceServiceClient({
      keyFilename: keyFilePath,
    });

    const features = ['LABEL_DETECTION'];

    const request = {
      inputUri: inputUri,
      features: features,
    };

    const [operation] = await client.annotateVideo(request);
    const [operationResult] = await operation.promise();

    const annotations = operationResult.annotationResults;
    const results = annotations.map(annotation => ({
      description: annotation.displayName,
      segments: annotation.segments.map(segment => ({
        startTime: segment.startTimeOffset.seconds + '.' + segment.startTimeOffset.nanos / 1e9,
        endTime: segment.endTimeOffset.seconds + '.' + segment.endTimeOffset.nanos / 1e9,
      })),
    }));

    return results;
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
}

module.exports = {
  annotateVideo,
};