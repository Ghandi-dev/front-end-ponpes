"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Eye, Trash2, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  onPressButtonActivate?: () => void;
  hideButtonActivate?: boolean;
  hideButtonDelete?: boolean;
  isPendingActivate?: boolean;
}

const ButtonAction = ({
  onPressButtonDetail,
  onPressButtonDelete,
  onPressButtonActivate,
  hideButtonDelete = false,
  hideButtonActivate = true,
  isPendingActivate,
}: PropTypes) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {!hideButtonActivate && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isPendingActivate} onClick={onPressButtonActivate}>
                {isPendingActivate ? <Spinner /> : <CheckCircle2 className="w-4 h-4 text-green-600" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Aktivasi</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onPressButtonDetail}>
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Detail</p>
          </TooltipContent>
        </Tooltip>

        {!hideButtonDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onPressButtonDelete}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hapus</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ButtonAction;
