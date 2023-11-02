import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { SendButtonIcon } from "@/components/icons";

interface ChatInputProps {
  loading?: boolean;
  onChangeInput: (value: string) => void;
}

export default function ChatInput({ loading = false, onChangeInput }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSubmit = () => {
    // cheking if value is entered
    if (inputValue.trim() !== "" && !loading) {
      onChangeInput(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center justify-between w-full md:w-4/5  mx-auto relative">
      <div className="flex w-full bg-[#E7E7E7] rounded-lg outline-none px-6 py-3 gap-2 items-end">
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your query"
          className="block p-2 resize-none w-full max-h-[300px] bg-transparent placeholder:text-[#0B0B0B]/60 focus:text-black focus:outline-none align-bottom"
          name="message"
        />

        <button
          type="submit"
          className="p-2 focus:bg-primary focus:outline-primary-200 group flex justify-center items-center "
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          {!loading ? (
            <SendButtonIcon
              height={24}
              width={24}
              className="stroke-black group-focus:stroke-white"
            />
          ) : (
            <div className="flex items-center gap-1 h-[24px] w-[24px] justify-center animate-jump">
              <div className="h-[6px] w-[6px] rounded-full bg-primary-800"></div>
              <div className="h-[6px] w-[6px] rounded-full bg-primary-800"></div>
              <div className="h-[6px] w-[6px] rounded-full bg-primary-800"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
