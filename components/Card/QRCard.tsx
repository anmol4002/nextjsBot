import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";

interface QRCardProps {
  onClose: () => void;
}

export default function QRCard({ onClose }: QRCardProps) {
  return (
    <>
      <div className="flex justify-between items-center border-b border-outline-variant p-4 bg-surface-container">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-[12px]"
          />
          <h2 className="text-base font-medium text-on-surface">
            Scan QR Code
          </h2>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
              size="icon"
              variant="outline"
              aria-label="Close QR view"
            >
              <X className="size-6 text-on-surface-variant" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Close QR Code</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center justify-center p-2">
        <Image
          src="/images/qr-photo.png"
          alt="QR Code"
          width={450}
          height={450}
          className="rounded-lg"
        />
      </div>
    </>
  );
}
