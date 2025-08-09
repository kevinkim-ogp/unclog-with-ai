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
    <div className="flex flex-col p-4 pb-[50px] w-full overflow-y-auto max-h-[calc(100vh-50px)]">
      <div className="flex flex-col items-center justify-center p-4 w-full gap-4">
        <div className="text-l font-bold mb-4 w-full max-w-[500px] mx-auto">
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
        <Steps trigger={output.trigger} actions={output.actions} />
      </div>
    </div>
  );
}
