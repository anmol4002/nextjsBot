import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe, Send, Loader2 } from "lucide-react";

interface CardFooterProps {
  input: string;
  isLoading: boolean;
  language: string;
  isLanguageDropdownOpen: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onLanguageChange: (lang: string) => void;
  onToggleLanguageDropdown: () => void;
  getLanguageLabel: (lang: string) => string;
  t:any;
  languageDropdownRef: React.RefObject<HTMLDivElement>;
}

export default function CardFooter({
  input,
  isLoading,
  language,
  isLanguageDropdownOpen,
  onInputChange,
  onSubmit,
  onLanguageChange,
  onToggleLanguageDropdown,
  getLanguageLabel,
  t,
  languageDropdownRef,
}: CardFooterProps) {
  return (
    <div className="p-3 border-t bg-gray-50 ">
      <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
        <Input
          value={input}
          onChange={onInputChange}
          className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder={t.typePlaceholder}
          aria-label="Type your message"
        />

        <div className="relative" ref={languageDropdownRef}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={onToggleLanguageDropdown}
                className="rounded-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center"
                aria-label="Change language"
                size="sm"
              >
                <Globe className="size-8" />
                <span className="text-xs font-medium hidden sm:inline">
                  {getLanguageLabel(language)}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Change Language</p>
            </TooltipContent>
          </Tooltip>

          {isLanguageDropdownOpen && (
            <div className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 min-w-[120px] z-50">
              {["en", "pa", "hi", "auto"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors duration-150 flex items-center ${
                    lang === language
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => onLanguageChange(lang)}
                >
                  {lang === language && <span className="mr-2 text-blue-600">✓</span>}
                  {getLanguageLabel(lang)}
                </button>
              ))}
            </div>
          )}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
              size="icon"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-9 h-9 animate-spin" />
              ) : (
                <Send className="w-9 h-9" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Send Message</p>
          </TooltipContent>
        </Tooltip>
      </form>
    </div>
  );
}




























