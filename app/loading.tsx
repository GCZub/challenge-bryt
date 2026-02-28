export default function Loading() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-purple-500/20 rounded-2xl p-3 flex flex-col h-full animate-pulse">
          <div className="w-full h-48 bg-purple-950/40 rounded-xl mb-4" />
          <div className="h-4 bg-purple-950/40 rounded w-3/4 mb-2" />
          <div className="h-3 bg-purple-950/40 rounded w-1/2 mb-2" />
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-purple-500/20">
            <div className="h-5 bg-purple-950/40 rounded w-16" />
            <div className="h-9 bg-purple-950/40 rounded-lg w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}