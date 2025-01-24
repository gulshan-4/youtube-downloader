const { fbdown } = require('btch-downloader')
async function fbDownloader(req, res){   
    const url = req.query.url
    try{
        const data = await fbdown(url)
        res.json(data)
    }catch (error) {
        console.error("Error fetching ig data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = fbDownloader