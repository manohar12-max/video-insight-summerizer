export default function VideoMetaCard({ meta }) {
  if (!meta) return null;

  return (
    <div className="mt-6 w-full max-w-xl rounded-2xl shadow-lg border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img
        src={meta.thumbnails.high?.url || meta.thumbnails.medium?.url}
        alt={meta.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-bold text-red-700">{meta.title}</h2>
        <p className="text-sm text-gray-600">Duration: {meta.duration}</p>
      </div>
    </div>
  );
}
