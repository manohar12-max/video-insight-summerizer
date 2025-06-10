const axios = require("axios");

const createVideo = async (req, res) => {
  const { videoId } = req.body;
  console.log("Received videoId:", videoId);

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

    const { title, thumbnails } = video.snippet;
    const duration = video.contentDetails.duration;
    const iso = duration || "PT0S"; // Default to 0 seconds if duration is not available
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "Unknown duration";
    console.log("Parsed duration:", match);
    const [, hours, minutes, seconds] = match.map(Number);
    const formattedDuration = [
      hours ? `${hours}h` : null,
      minutes ? `${minutes}m` : null,
      seconds ? `${seconds}s` : null,
    ].filter(Boolean).join(" ");
    console.log("Formatted duration:", formattedDuration);
    res.json({ title, thumbnails, duration: formattedDuration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch video metadata" });
  }
};

module.exports = {
  createVideo,
};
