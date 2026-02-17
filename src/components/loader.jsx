export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-500">
      <div className="flex flex-col items-center">
        {/* Elegant Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-secondary/5"></div>
          <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin shadow-sm"></div>
          {/* Center Dot */}
          <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-accent-dark animate-pulse"></div>
        </div>

        {/* Brand Text */}
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-[0.2em] text-secondary">
            SOFTDREAMS
          </h2>
          <div className="h-0.5 w-12 bg-accent/30 mx-auto rounded-full"></div>
          <p className="text-[10px] font-medium text-accent-dark uppercase tracking-[0.3em] opacity-80 animate-pulse">
            Loading Luxury
          </p>
        </div>
      </div>
    </div>
  );
}