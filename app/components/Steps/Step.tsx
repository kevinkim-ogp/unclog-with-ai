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
  console.log(stepNumber, app, event, description);
  return (
    <div
      key={`${stepNumber}-${app}-${event}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 p-6 cursor-pointer group"
    >
      {/* Step Number */}
      <div className="flex items-center mb-4 gap-2 align-middle">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold group-hover:bg-blue-200 transition-colors duration-200">
          {stepNumber}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {app}
        </h3>
      </div>

      {/* App Key as Title */}

      {/* Key as Subtitle */}
      <p className="text-sm text-gray-500 font-medium">{event}</p>

      {/* Optional Action Indicator */}
      <div className="mt-4 flex items-center text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
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
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
