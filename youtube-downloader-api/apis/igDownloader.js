const { igdl } = require('btch-downloader')
async function igDownloader(req, res){   
    const url = req.query.url
    try{
        const data = await igdl(url)
        res.json(data)
    }catch (error) {
        console.error("Error fetching ig data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = igDownloader