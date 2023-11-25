const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const screenshotRoute = require('./src/routes/screenshot');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Serve images from the 'src/assets' directory
app.use('/images', express.static(path.join(__dirname, 'src/assets')));


// Routes
app.use('/api', screenshotRoute);

// Start the server
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
