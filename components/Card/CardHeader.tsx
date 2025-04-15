import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Maximize, RefreshCw, X } from "lucide-react";

interface CardHeaderProps {
  title: string;
  emoji: string;
  name: string;
  isMaximized: boolean;
  onMaximize: () => void;
  onRestore: () => void;
  onReset: () => void;
  onClose: () => void;
}

export default function CardHeader({
  title,
  emoji,
  name,
  isMaximized,
  onMaximize,
  onRestore,
  onReset,
  onClose,
}: CardHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-outline-variant p-4 bg-surface-container w-full">

  <div className="flex gap-2 items-center">
    <Image
      src="/images/logo.png"
      alt="Logo"
      width={48}
      height={48}
      className="rounded-[12px]"
    />
    <div className="flex flex-col">
      <h2 className="text-base font-medium text-on-surface">{title}</h2>
      <div className="text-xs text-on-surface-variant flex items-center">
        <span>{emoji}</span>
        <span className="ml-1">{name}</span>
      </div>
    </div>
  </div>

  <div className="flex space-x-2">
    {!isMaximized && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            aria-label="Maximize"
            className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
            onClick={onMaximize}
          >
            <Maximize className="size-6 text-on-surface-variant" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Maximize Chat Window</p>
        </TooltipContent>
      </Tooltip>
    )}
    {isMaximized && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            aria-label="Restore"
            className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
            onClick={onRestore}
          >
            <Maximize className="size-6 text-on-surface-variant rotate-45" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Restore Chat Window</p>
        </TooltipContent>
      </Tooltip>
    )}
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="Reset Chat"
          className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
          onClick={onReset}
        >
          <RefreshCw className="size-6 text-on-surface-variant" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Reset Chat</p>
      </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClose}
          size="icon"
          variant="outline"
          aria-label="Close"
          className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
        >
          <X className="size-6 text-on-surface-variant" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Close Chat</p>
      </TooltipContent>
    </Tooltip>
  </div>
</div>
  );
}



























