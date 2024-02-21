const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

const path = require('path');
const fs = require('fs');

// const {insertOdds} = require('../app/controller/database');

const startBrowser = async () => {
  const userDataDir = path.join(__dirname, '../assets/user_dir');

  console.log('🚀 Launching a headless browser...');
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: userDataDir,
  });
  return browser;
}



// Define the route
const urls = [
  'https://www.betika.com',
  'https://www.betika.com/en-ke/s/table-tennis',
  'https://www.betika.com/en-ke/s/cricket',
  'https://www.betika.com/en-ke/s/tennis',
  'https://www.betika.com/en-ke/s/volleyball',
  'https://www.betika.com/en-ke/s/darts',
  'https://www.betika.com/en-ke/s/bowls'
];

router.get('/betika', async (req, res) => {

  const url = 'https://www.betika.com/en-ke/s/table-tennis'

  try {
    // Start the browser
    const browser = await startBrowser();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    console.log(`🌐 Navigating to: ${url}`);
    await page.goto(url);


    // Wait for the modal container to appear
    // console.log('⌛ Waiting for modal container...');
    // await page.waitForSelector('.modal__container');


    // Click the "x" button
    // console.log('⌛ Waiting for "x" button...');
    // const xButton = await page.$('.modal__x');
    // if (!xButton) {
    //   console.error('❌ "x" button not found.');
    //   return;
    // }

    // Wait for the odds container to load
    console.log('⌛ Waiting for odds container...');
    await page.waitForSelector('.prebet-match');
    console.log('✅ Odds container loaded.');

    // Extract odds information for all games
    const odds = await page.evaluate(() => {
      const matches = document.querySelectorAll('.prebet-match');
      const formattedOdds = [];

      matches.forEach((match) => {
        // Extract time
        const time = match.querySelector('.time').textContent.trim();

        // Extract teams
        const teamsContainer = match.querySelector('.prebet-match__teams');
        const homeTeam = teamsContainer.querySelector('.prebet-match__teams__home').textContent.trim();
        const awayTeam = teamsContainer.querySelector('.prebet-match__teams span:last-child').textContent.trim();

        // Extract odds values
      const oddsValues = Array.from(match.querySelectorAll('.prebet-match__odd__odd-value.bold')).map((odd) => odd.textContent.trim());

        formattedOdds.push({
          time: time,
          teams: {
            home: homeTeam,
            away: awayTeam,
          },
          '1': oddsValues[0],
          '2': oddsValues[1],
        });

      });

      return formattedOdds;
    });


    // insertOdds(odds);

    // Save the odds to a CSV file
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const filename = `betika_${timestamp}.csv`;
    const filePath = path.join(__dirname, '..', 'db', filename);


    // Write CSV content
    const csvContent = odds.map((match) => `${match.teams.home},${match.teams.away},${match['1']},${match['2']}`).join('\n');
    fs.writeFileSync(filePath, `Home,Away,1,2\n${csvContent}`, 'utf-8');


    // Close the browser
    console.log('🔒 Closing the browser...');
    await browser.close();

    // Send the formatted odds as JSON
    res.json({ odds });

    console.log('✅ Request processed successfully.');
  } catch (error) {
    console.error('❌ Error capturing odds:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sportpesa', async (req, res) => {

})
router.get('/sportpesa', async (req, res) => {

})

module.exports = router;
