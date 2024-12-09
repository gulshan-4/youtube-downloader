const { Client } = require("youtubei");
const youtube = new Client();


async function mostWatchedWeekly(req, res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  try {
    const videos = await youtube.search("", {
      type: "video",
      uploadDate: 'week',
      sortBy: 'view',
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
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = mostWatchedWeekly;
