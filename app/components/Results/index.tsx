import { WorkflowOutput } from "@/app/page";
import Steps from "../Steps";

interface ResultsProps {
  input: string;
  output: WorkflowOutput;
  handleReset: () => void;
  handleRefine: () => void;
}

export default function Results({
  input,
  output,
  handleReset,
  handleRefine,
}: ResultsProps) {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex flex-col items-center p-4 w-full gap-4">
          <div className="text-l font-bold w-full max-w-[500px] mx-auto">
            {input}
          </div>
          <div className="flex flex-row gap-4">
            <button
              className="bg-[#F9DDE9] text-[#cf1a68] px-4 py-2 rounded-md"
              onClick={handleRefine}
            >
              Refine your query
            </button>
            <button
              className="bg-[#cf1a68] text-white px-4 py-2 rounded-md"
              onClick={handleReset}
            >
              Ask Mario about another workflow
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 pb-4">
        <Steps trigger={output.trigger} actions={output.actions} />
      </div>
    </div>
  );
}
