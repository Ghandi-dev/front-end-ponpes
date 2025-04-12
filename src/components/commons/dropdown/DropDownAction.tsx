"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SquareMenu } from "lucide-react";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  onPressButtonActivate?: () => void;
  hideButtonActivate?: boolean;
  hideButtonDelete?: boolean;
}

const DropdownAction = ({
  onPressButtonDetail,
  onPressButtonDelete,
  onPressButtonActivate,
  hideButtonDelete = false,
  hideButtonActivate = false,
}: PropTypes) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SquareMenu className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!hideButtonActivate && <DropdownMenuItem onClick={onPressButtonActivate}>Aktivasi</DropdownMenuItem>}
        <DropdownMenuItem onClick={onPressButtonDetail}>Detail</DropdownMenuItem>
        {!hideButtonDelete && (
          <DropdownMenuItem onClick={onPressButtonDelete} className="text-destructive focus:text-destructive">
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAction;
