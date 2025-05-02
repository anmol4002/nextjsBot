import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Language = "en" | "pa" | "hi" | "auto";
export type Role = "user" | "assistant" | "system" ;
export type DepartmentCode = string;

export type Message = {
  role: Role;
  content: string;
  rawContent?: string;
  timestamp: Date;
  citations?: Citation[];
  containsHtml?: boolean;
  isStreaming?: boolean;
  departmentOptions?: string[];
};

export type Citation = {
  title?: string;
  url?: string;
};

export type Toast = {
  message: string;
  type: "success" | "error" | "loading";
  icon?: React.ReactNode;
  duration?: number;
};

export interface ScrollOptions {
  target?: HTMLElement | null;
  step?: number;
  duration?: number;
}

export const DEFAULT_DEPARTMENT = "punchatbotindex";


export const scrollToBottom = (options: ScrollOptions = {}, chatContainerRef: React.RefObject<HTMLDivElement>) => {
  const {
    target = chatContainerRef.current?.querySelector<HTMLElement>(
      "[data-radix-scroll-area-viewport]"
    ),
    duration = 100,
  } = options;

  if (!target) return;

  const contentHeight = target.scrollHeight;
  const containerHeight = target.clientHeight;
  const referencedDocs = target.querySelector(".referenced-docs");
  const referencedDocsHeight =
    referencedDocs instanceof HTMLElement ? referencedDocs.offsetHeight : 0;
  const targetPosition =
    contentHeight - containerHeight + referencedDocsHeight;

  const startPosition = target.scrollTop;
  const distance = targetPosition - startPosition;

  if (distance <= 0) return;

  let start: number | null = null;
  const animation = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percentage = Math.min(progress / duration, 1);
    const currentStep = startPosition + distance * percentage;

    target.scrollTop = currentStep;

    if (percentage < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};


export const updateMessagesWithHistoryLimit = (newMessages: Message[]) => {
  const threshold = 12;

  if (newMessages.length > threshold) {
    const historyNote: Message = {
      role: "assistant",
      content:
        "Some earlier messages have been removed to manage chat history length.",
      timestamp: new Date(),
    };

    return [
      newMessages[0],
      newMessages[1],
      historyNote,
      ...newMessages.slice(newMessages.length - (threshold - 3)),
    ];
  }
  return newMessages;
};


export const getSystemMessage = () => {
  return `You are an AI assistant that helps people find information. Please write the response in suitable format either bullet points, paragraph or a table and highlight the major points and words with Bold markdown in response. Remeber to keep all the information and content as it is and not dilute any instruction, information from the content.`;
};
