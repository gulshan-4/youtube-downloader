
const express = require("express");
const ytdl = require("@distube/ytdl-core");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;
const request = require("request");
const sanitize = require("sanitize-filename");

const errorHandler = require('./middleware/errorhandler')
const mostWatchedToday = require('./apis/mostWatchedDaily');
const mostWatchedWeekly = require('./apis/mostWatchedWeekly');
const mostWatchedMonthly = require('./apis/mostWatchedMonthly');
const mostWatchedYearly = require('./apis/mostWatchedYearly');
const mostDownloaded = require("./apis/mostDownloaded");

app.use(errorHandler)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure CORS
const corsOptions = {
  origin: [
    'https://youtube-downloader-xi-one.vercel.app/',
    'https://youtube-downloader-n8lj9dacy-00sachin00s-projects.vercel.app',
    'https://vercel.app',
    // 'http://localhost:3000'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Endpoint that recieves url of video and returns video data i.e Title, videoId and video formats (1440, 240p etc.) with direct video links
app.get("/getData", async (req, res) => {

  try {
    const videoURL = req.query.url;

    // Validate the YouTube video URL
    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(videoURL);
    // Extract audio streams
    const audioFormats = info.formats
    .filter(format => format.mimeType === 'audio/webm; codecs="opus"')
    // const audioFileURL = audioFormats.url;
    // console.log(audioFormats);

    const videoDetails = {
      title: info.videoDetails.title,
      formats: info.formats,
      audioFormats: audioFormats,
      videoId: info.videoDetails.videoId,
      views: info.videoDetails.viewCount,
      lengthInseconds: info.videoDetails.lengthSeconds,
      channelUrl: info.videoDetails.ownerProfileUrl,
      channelName: info.videoDetails.ownerChannelName,
      uploadDate: info.videoDetails.uploadDate,
    }
    

    // // Choose the highest quality video format
    // const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
        // Set response headers for download
        // res.header(
        //   "Content-Disposition",
        //   `attachment; filename="${info.videoDetails.title}.mp4"`
        // );
      // Download highest Quality Video
      // ytdl(videoURL, { format }).pipe(res);
    res.send(videoDetails)
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getDataWithId", async (req, res) => {
  console.log('Getting Data With Id');

  try {
    const videoURL = `https://www.youtube.com/watch?v=${req.query.id}`;

    // Validate the YouTube video URL
    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(videoURL);
    // console.log(info);
      // Extract audio streams
      const audioFormats = info.formats
      .filter(format => format.mimeType === 'audio/webm; codecs="opus"')

    const videoDetails = {
      title: info.videoDetails.title,
      formats: info.formats,
      audioFormats: audioFormats,
      videoId: info.videoDetails.videoId,
      views: info.videoDetails.viewCount,
      lengthInseconds: info.videoDetails.lengthSeconds,
      channelUrl: info.videoDetails.ownerProfileUrl,
      channelName: info.videoDetails.ownerChannelName,
      uploadDate: info.videoDetails.uploadDate
    }
    

    // // Choose the highest quality video format
    // const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
        // Set response headers for download
        // res.header(
        //   "Content-Disposition",
        //   `attachment; filename="${info.videoDetails.title}.mp4"`
        // );
      // Download highest Quality Video
      // ytdl(videoURL, { format }).pipe(res);
    res.send(videoDetails)
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint that recieves title, mimeType, video format (mp4, webp, avi etc), direct downloadble URL/Link of video in chosen quality i.e 144p, 240p, 360p etc and downloads it
app.get("/download", (req, res) => {

  console.log('download hit');
  try {
    const streamableVideoURL = req.query.url;
    const videoTitle = req.query.title
    const mimeType = req.query.mimeType
    const videoFormat = req.query.format
console.log(streamableVideoURL);

    // Validate the streamable video URL
    if (!streamableVideoURL) {
      return res.status(400).json({ error: "Invalid streamable video URL" });
    }

    const invalidCharsRegex = /[^a-zA-Z0-9.\-_]/g;
    const sanitizedVideoTitle = sanitize(videoTitle).replace(invalidCharsRegex, "_");
    // Set response headers for download
    res.header(
      "Content-Disposition",
      `attachment; filename="${sanitizedVideoTitle}.${videoFormat}"`
    );
    res.header("Content-Type", mimeType);

    // Redirect to the streamable video URL
    request(streamableVideoURL).pipe(res);
  } catch (error) {
    console.log("Download Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint that recieves 'title' and 'url' of audio track and downloads it
app.get("/downloadAudio", (req, res) => {


  try {
    const audioURL = req.query.url;
    const title = req.query.title;

    // Validate the audio URL
    if (!audioURL) {
      return res.status(400).json({ error: "Invalid audio URL" });
    }

    const invalidCharsRegex = /[^a-zA-Z0-9.\-_]/g;
    const sanitizedVideoTitle = sanitize(title).replace(invalidCharsRegex, "_");
    // Set response headers for download
    res.header(
      "Content-Disposition",
      `attachment; filename="${sanitizedVideoTitle}.mp3"`
    );
    res.header("Content-Type", "audio/mp3");

    // Pipe the audio stream to the response
    request(audioURL).pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//YT DATA apis
app.get('/most-watched-weekly', mostWatchedWeekly);
app.get('/most-watched-monthly', mostWatchedMonthly);
app.get('/most-watched-yearly', mostWatchedYearly);
app.get('/most-watched-today', mostWatchedToday)
app.post('/most-downloaded', mostDownloaded)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});