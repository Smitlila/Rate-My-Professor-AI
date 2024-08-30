const express = require('express');
// const { scrapeRateMyProfessor } = require('../services/scraper');
const { scrapeRateMyProfessor } = require('../components/SubmitURLForm')
const router = express.Router();

router.post('/scrape-url', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required.' });
  }

  try {
    const data = await scrapeRateMyProfessor(url);
    // Insert data into Pinecone (we'll handle this in the next steps)
    await insertDataIntoPinecone(data);
    res.status(200).json({ message: 'Data scraped and inserted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to scrape data.' });
  }
});

module.exports = router;
