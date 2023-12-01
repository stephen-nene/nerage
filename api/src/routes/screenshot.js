const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Define the route
router.post('/screenshot', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL in the request body' });
  }
  // Regular expression to validate a URL format
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  // Check if the URL is in the correct format
  if (!urlRegex.test(url)) {
    return res.status(400).json({ error: 'Invalid URL format. Please provide a valid URL starting with http:// or https://' });
  }

  try {
    // Launch a headless browser
    console.log('🚀 Launching a headless browser...');
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    const page = await browser.newPage();

    // Navigate to the specified URL
    console.log(`🌐 Navigating to: ${url}`);
    await page.goto(url);

    // Get the website title
    const title = await page.title();
    // console.log(`📚 Website title: ${title}`);

    // Generate a timestamp for naming the screenshot
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    // console.log(`🕰️ Generating timestamp: ${timestamp}`);

    // Create a folder to store screenshots if it doesn't exist
    const screenshotsFolder = path.join(__dirname, '../assets/screenshots');
    if (!fs.existsSync(screenshotsFolder)) {
      console.log('📁 Creating screenshots folder...');
      fs.mkdirSync(screenshotsFolder);
    }

    // Name the screenshot based on the title and timestamp
    const imgUrl = `http://localhost:3000/images/screenshots/${title}_${timestamp}.png`
    const screenshotPath = path.join(screenshotsFolder, `${title}_${timestamp}.png`);
    // console.log(`🖼️ Saving screenshot at: ${screenshotPath}`);

    // Take a screenshot
    await page.screenshot({ fullPage: false, path: screenshotPath });

    // Close the browser
    console.log('🔒 Closing the browser...');
    await browser.close();

    // Respond with the path to the saved screenshot
    res.json({ success: true, imgUrl });
    console.log(`🖼️ Screenshot accessible at: ${imgUrl}`);
    // console.log('✅ Request processed successfully.');
  } catch (error) {
    console.error('❌ Error capturing screenshot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
