"use client";
import { useState } from "react";
import PromptInput from "./components/PromptInput";
import Steps from "./components/Steps";
import Results from "./components/Results";

type StepItem = {
  app: string;
  event: string;
  description: string;
};

export interface WorkflowOutput {
  trigger: StepItem;
  actions: StepItem[];
}

export default function Home() {
  const [error, setError] = useState<string | null>("test");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<WorkflowOutput | null>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      console.log(data);
      setOutput(JSON.parse(data.output));
    } catch (error) {
      console.error(error);
      setError("Failed to generate workflow. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOutput(null);
    setInput("");
  };

  const handleRefine = () => {
    setOutput(null);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto flex flex-col gap-[32px] items-center sm:items-start w-full p-8 pb-24">
        {output ? (
          <Results
            input={input}
            output={output}
            handleReset={handleReset}
            handleRefine={handleRefine}
          />
        ) : (
          <div className="flex flex-col p-4 w-full flex-1">
            <div className="flex flex-1 items-center justify-center w-full">
              <PromptInput
                input={input}
                setInput={setInput}
                handleGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 flex gap-[24px] flex-wrap items-center justify-center z-10">
        <div className="text-sm text-gray-500">
          This is a beta version, cut Mario some slack.
        </div>
      </footer>
    </div>
  );
}
