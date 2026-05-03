const LoadingSpinner = ({ 
  size = "md", 
  text = "Loading...",
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} rounded-full border-3 border-slate-700 border-t-cyan-500 animate-spin`}></div>
      {text && <p className="text-slate-300 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
