export default function ProductSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {/* Image skeleton */}
            <div className="relative w-full h-72 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl mb-4"></div>

            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 rounded-lg mb-2"></div>
            <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3"></div>

            {/* Rating skeleton */}
            <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                ))}
            </div>

            {/* Price skeleton */}
            <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
        </div>
    );
}
