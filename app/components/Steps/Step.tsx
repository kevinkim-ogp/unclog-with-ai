import { getAppName, getEventName } from "@/app/helper";

interface StepProps {
  stepNumber: number;
  app: string;
  event: string;
  description: string;
}

export default function Step({
  stepNumber,
  app,
  event,
  description,
}: StepProps) {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 p-6 cursor-pointer group">
      {/* Step Number */}
      <div className="flex items-center mb-4 gap-2 align-middle">
        <div className="flex items-center justify-center w-8 h-8 bg-[#F9DDE9] text-[#cf1a68] rounded-full text-sm font-semibold transition-colors duration-200">
          {stepNumber}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
          {getAppName(app) ?? app}
        </h3>
      </div>

      {/* App Key as Title */}

      {/* Key as Subtitle */}
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
        {getEventName(event) ?? event}
      </p>

      {/* Optional Action Indicator */}
      <div className="mt-4 flex items-center text-xs text-gray-400 dark:text-gray-500 transition-colors duration-200">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className="mr-2"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
