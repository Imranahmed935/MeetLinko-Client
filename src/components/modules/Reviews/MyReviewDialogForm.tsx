import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { updateReview } from "@/services/review/review";
import { TReview1 } from "@/types/review.interface";
import { useEffect, useState } from "react";

interface IMyReviewDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  review?: TReview1 | null;
}


const MyReviewDialogForm = ({
  open,
  onClose,
  onSuccess,
  review,
}: IMyReviewDialogFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(review?.rating || 5);
  const [comment, setComment] = useState(review?.comment || "");

  useEffect(() => {
    setRating(review?.rating || 5);
    setComment(review?.comment || "");
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;

    setSubmitting(true);
    try {
      const res = await updateReview(review.id, { rating, comment });

      if (!res || !res.success) throw new Error("Failed to update review");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label>Rating (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="border p-2 rounded"
            />
          </div>

          <div className="grid gap-2">
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MyReviewDialogForm;
