export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden border border-border-light animate-pulse"
        >
          <div className="h-56 sm:h-64 bg-border-light" />
          <div className="p-5">
            <div className="h-4 w-16 bg-border-light rounded-full mb-3" />
            <div className="h-5 w-3/4 bg-border-light rounded mb-2" />
            <div className="h-5 w-1/3 bg-border-light rounded mb-3" />
            <div className="h-3 w-full bg-border-light rounded mb-1" />
            <div className="h-3 w-2/3 bg-border-light rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
