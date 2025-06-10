
export const getVideoId=(url)=>{
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export const getMetadata = async (videoId) => {
    const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    try{
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Failed to fetch video metadata");
        }
        const data = await response.json();
       
        if (data.items.length === 0) {
            throw new Error("Video not found");
        }
        return data.items[0];
    } catch (error) {
        console.error("Error fetching video metadata:", error);
        throw error;
    }
}