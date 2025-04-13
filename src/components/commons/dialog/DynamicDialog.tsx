import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface PropTypes {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
  isModal?: boolean;
}

const DynamicDialog = (props: PropTypes) => {
  const { title, open, onOpenChange, children, isModal = false } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={isModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DynamicDialog;
