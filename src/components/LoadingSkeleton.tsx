const LoadingSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full animate-pulse">
      <div className="h-28 bg-gray-200 dark:bg-gray-700 relative">
        <div className="absolute top-4 left-4 bg-gray-300 dark:bg-gray-600 h-8 w-8 rounded-full"></div>
        <div className="flex items-center justify-center h-full">
          <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;