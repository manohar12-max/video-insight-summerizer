import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import api from "../lib/api"

export default function VideoMetaCard({ meta }) {
  const [transcript, setTranscript] = useState(null);
  if (!meta) return null;
  const { user } = useUserContext();


const getSummary = async () => {
  
  try {
    const res = await api.post(
      `/video/transcript/${meta.videoId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Transcript Data:", res.data);
    setTranscript(res.data);
  } catch (err) {
    console.error("Error fetching transcript:", err.response?.data || err.message);
  }
};


  

  return (
    <div className="mt-6 w-full max-w-xl rounded-2xl shadow-lg border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer">
      <img
        src={meta.thumbnails.high?.url || meta.thumbnails.medium?.url}
        alt={meta.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-bold text-red-700">{meta.title}</h2>
        <p className="text-sm text-gray-600">Duration: {meta.duration}</p>
      </div>
      <button
        className="w-full py-3 bg-red-700 text-white font-semibold hover:bg-red-800 transition-colors duration-200 cursor-pointer"
        onClick={() => getSummary()}
      >
        Get Summary
      </button>
    </div>
  );
}
