import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { getVideoId } from "../util/youtube";
import VideoMetaCard from "../components/VideoMetaCard";
import api from "../lib/api";
import Spinner from "../components/Spinner";

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoMeta, setVideoMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const isYouTubeURL = (url) => {
    setVideoMeta(null);
    if (!validator.isURL(url)) return false;
    const parsed = new URL(url);
    return ["www.youtube.com", "youtube.com", "youtu.be"].includes(parsed.hostname);
  };

  const fetchVideoMeta = async () => {
    if (!isYouTubeURL(url)) {
      toast.error("Please enter a valid YouTube URL.");
      return;
    }

    const videoId = getVideoId(url);
    if (!videoId) {
      toast.error("Could not extract Video ID.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/video/create", { videoId });
      setVideoMeta(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch metadata");
      setVideoMeta(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Video Insight Summarizer</h1>
      <div className="w-full max-w-xl space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          onClick={fetchVideoMeta}
          className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-800"
        >
          {loading ? "Fetching..." : "Fetch Video Info"}
        </button>
      </div>
      <div className="mt-6 w-full max-w-xl">
        {
          loading && <Spinner/>
        }
       {
        videoMeta ? (
          <VideoMetaCard meta={videoMeta} />
        ) : (
          !loading && <p className="text-gray-500">Enter a YouTube URL to see video details.</p>
        )}
      </div>
    </div>
  );
}
