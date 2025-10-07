interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      data-oid="p.7hj_6"
    >
      <div
        className={`${sizeClasses[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4`}
        data-oid="ecglu-_"
      />

      <p className={`text-white ${textSizes[size]}`} data-oid="crewe_n">
        {message}
      </p>
    </div>
  );
}
