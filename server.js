import express from 'express';
import cors from 'cors';  // Import the cors package
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors()); // This will allow requests from all domains

// Serve the file when the client sends a request to '/download'
app.get('/download', (req, res) => {
  const { prompt } = req.query;  // Capture the 'prompt' query parameter from the request
  console.log('Received prompt:', prompt);  // Log the prompt value for debugging

  // Handle the case when prompt is missing or empty
  if (!prompt) {
    return res.status(400).send('Missing prompt parameter');
  }

  const filePath = path.join(__dirname, 'Templated_Presentation.pptx');
  console.log('File path:', filePath);  // Log the file path for debugging

  // Send the file to the client
  res.sendFile(filePath, (err) => {
    if (err) {
      // Log detailed error information for debugging
      console.error('Error sending file:', err);
      
      // Return different error messages based on the error
      if (err.code === 'ENOENT') {
        return res.status(404).send('File not found');
      } else {
        return res.status(500).send('Internal Server Error');
      }
    }
    console.log('File sent successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
