"use client";
import { useState } from "react";
import PromptInput from "./components/PromptInput";
import Results from "./components/Results";
import Image from "next/image";

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
      <header className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 h-[50px]">
        <div className="flex flex-row items-center p-2 w-full gap-2 h-full">
          <Image src="/logo.svg" alt="PipeDream" width={20} height={20} />
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F9DDE9] text-[#cf1a68] dark:bg-[#cf1a68] dark:text-[#F9DDE9] border border-[#cf1a68]/20 dark:border-[#F9DDE9]/20">
            BETA
          </span>
        </div>
      </header>
      <main className="flex-1 overflow-visible flex flex-col items-center sm:items-start w-full">
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
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 py-3 flex gap-[24px] flex-wrap items-center justify-center z-10 h-[50px]">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          This is a beta version, cut Mario some slack.
        </div>
      </footer>
    </div>
  );
}
