const { Client } = require("youtubei");
const youtube = new Client();

async function searchYoutube(req, res) {
    const query = req.query.q
  try {
    console.log('searching' , query);
    
    const videos = await youtube.search(query, {
      type: "video",
    });
    const data = videos.items.map(result => ({
      title: result.title,
      videoId: result.id,
      publishDate: result.uploadDate,
      views: result.viewCount,
      thumbnails: result.thumbnails,
      duration: result.duration,
  }));
  data.sort((a, b) => b.views - a.views);
    res.json(data)
  } catch (error) {
    console.error("Error fetching searched data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = searchYoutube;