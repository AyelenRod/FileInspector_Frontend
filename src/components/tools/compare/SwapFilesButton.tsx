import { Button } from "@heroui/react";
import { ArrowLeftRight } from "lucide-react";

interface SwapFilesButtonProps {
  isDisabled: boolean;
  onSwap: () => void;
}

export function SwapFilesButton({ isDisabled, onSwap }: SwapFilesButtonProps) {
  return (
    <div className="flex justify-center md:order-2">
      <Button isIconOnly variant="secondary" aria-label="Intercambiar archivos" isDisabled={isDisabled} onPress={onSwap}>
        <ArrowLeftRight className="size-4" />
      </Button>
    </div>
  );
}
