import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const useGetMetaDataHook = (videoId) => {
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideoMetaData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.items || data.items.length === 0) {
        throw new Error("Video not found");
      }

      setMetaData(data.items[0]);
    } catch (err) {
      setError(err.message || "Failed to fetch metadata");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!videoId) return;
    fetchVideoMetaData();
  }, [videoId]);
  
  return { metaData, loading, error };
};

export default useGetMetaDataHook;
