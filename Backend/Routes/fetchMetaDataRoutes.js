const express = require('express');
const router = express.Router();
const fetchMetaDataBLL = require('../BLL/fetchMetaDataBLL')

router.post('/fetch-metadata', async (req, res) => {
    try {
        const urls = req.body.urls;
        if (!urls) {
            return res.status(400).json({ error: 'Please provide URLs in the request body' });
        }

        const results = await fetchMetaDataBLL(urls);
        res.json(results);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;