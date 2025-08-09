import {
  useState,
  type SyntheticEvent,
  type KeyboardEvent,
  type FormEvent,
} from "react";

export default function ChatGPTInput({
  input,
  setInput,
  handleGenerate,
}: {
  input: string;
  setInput: (input: string) => void;
  handleGenerate: () => void;
}) {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("Message sent:", input);
      // Handle message submission here
      handleGenerate();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-4xl">
        <div className="relative">
          <div className="flex items-end bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Mario..."
              className="flex-1 resize-none border-0 bg-transparent px-3 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 text-base leading-6 max-h-48 min-h-0"
              rows={1}
              style={{
                height: "auto",
                minHeight: "24px",
                maxHeight: "200px",
                overflowY: input.split("\n").length > 8 ? "scroll" : "hidden",
              }}
              onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                const target = e.currentTarget;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 200) + "px";
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className={`ml-2 p-2 rounded-full transition-all duration-200 ${
                input.trim()
                  ? "bg-gray-900 hover:bg-gray-700 text-white shadow-sm hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transform rotate-90"
              >
                <path
                  d="M7 11L12 6L17 11M12 18V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
