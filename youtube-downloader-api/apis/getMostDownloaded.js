const path = require('path');
const fs = require('fs').promises;

async function getMostDownloaded(req, res) {
    try {
        const filePath = path.join(__dirname, '../db/mostDownloaded.json');
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to read or parse the data' });
    }
}

module.exports = getMostDownloaded;
