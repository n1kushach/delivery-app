import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

interface IConfirmModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: () => void;
}

const ConfirmModal = ({ open, setOpen, mutate }: IConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm rounded-lg" showCloseButton={false}>
        <DialogHeader>
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 className="h-5 w-5 text-red-700" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-base">Delete order</DialogTitle>
              <DialogDescription className="mt-1 text-sm">
                This action cannot be undone. The order will be permanently
                removed.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t pt-4">
          <div className="flex w-full gap-2">
            <Button
              className="flex-1 rounded-md"
              variant="secondary"
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-md bg-red-700 text-red-50 hover:bg-red-800"
              onClick={() => {
                mutate();
                setOpen(false);
              }}
              type="submit"
            >
              Delete order
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmModal;
