const axios = require("axios");
const cheerio = require("cheerio");
const URL = require("../Model/urlModel"); 

const fetchMetaDataBLL = async (urls) => {
    if (!urls || !Array.isArray(urls) || urls.length < 3) {
        throw new Error('Please provide at least 3 URLs');
    }

    const results = await Promise.all(urls.map(async (url) => {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
            const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
            const image = $('meta[property="og:image"]').attr('content') || '';
            const urlDoc = new URL({ url, title, description, image });
try {
    await urlDoc.save();
    console.log(`Successfully saved ${url} to the database`);
} catch (saveError) {
    console.error(`Error saving ${url} to the database:`, saveError);
}

            return { url, title, description, image };
        } catch (error) {
            console.error(`Error fetching metadata for ${url}:`, error);
            return { url, error: 'Failed to fetch metadata' };
        }
    }));

    return results;
};

module.exports = fetchMetaDataBLL;