const axios = require("axios");
var TranscriptAPI = require("youtube-transcript-api");

const getMetaData = async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ message: "Video ID is required" });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.items.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }
    const video = response.data.items[0];
    console.log("Fetched video data:");

    const { title, thumbnails } = video.snippet;
    const duration = video.contentDetails.duration;
    const iso = duration || "PT0S"; // Default to 0 seconds if duration is not available
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "Unknown duration";

    const [, hours, minutes, seconds] = match.map(Number);
    const formattedDuration = [
      hours ? `${hours}h` : null,
      minutes ? `${minutes}m` : null,
      seconds ? `${seconds}s` : null,
    ]
      .filter(Boolean)
      .join(" ");

    res.json({
      title,
      thumbnails,
      duration: formattedDuration,
      videoId: video.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch video metadata" });
  }
};
const getTranscript = async (req, res) => {
  const { videoId } = req.params;

  try {
    let data = await TranscriptAPI.getTranscript(videoId);
    let transcript = data
      .map((item) => {
        return item.text;
      })
      .join(" ");
    res.json(transcript);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch transcript", details: error.message });
  }
};
module.exports = {
  getMetaData,
  getTranscript,
};
