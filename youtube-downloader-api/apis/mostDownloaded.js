const path = require('path');

const fs = require('fs').promises;

async function mostDownloaded(req, res){ 
    console.log('most download added'); 
    try {
        const dbFile = path.join(__dirname, '..', 'db/mostDownloaded.json');  
        
        // Read existing data from mostDownloaded.json
        const data = await fs.readFile(dbFile);
        const existingObjects = JSON.parse(data);
        // Check if the incoming object already exists in the array
        const existingIndex = existingObjects.findIndex(obj => obj.title === req.body.title);
        if (existingIndex !== -1) {
            // If the object already exists, increment the "count" property
            existingObjects[existingIndex].count++;
        } else {
            // If the object doesn't exist, add it to the array
            const newObj = { ...req.body, count: 1 };
            existingObjects.push(newObj);
        }

        // Write the updated array back to mostDownloaded.json
        await fs.writeFile(dbFile, JSON.stringify(existingObjects, null, 2));

        res.status(200).json({ message: 'Object stored successfully' });
    } catch (error) {
        console.error('Error storing object:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = mostDownloaded;