"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { TTravelPlan } from "@/types/travelPlan.interface";

import { useState, useEffect } from "react";

interface AddCommentProps {
  details: TTravelPlan;
  onReviewAdded?: () => void;
}

const AddComment = ({ details, onReviewAdded }: AddCommentProps) => {
  const [userInfo, setUserInfo] = useState<{ id: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false); // control modal open state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo) return;

    setSubmitting(true);

    const form = e.currentTarget;
    const rating = Number((form.rating as HTMLInputElement).value);
    const comment = (form.comment as HTMLTextAreaElement).value;
    const reviewerId = userInfo.id;
    const travelPlanId = details.id;

    try {
      const res = await serverFetch.post("/review/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, travelPlanId, reviewerId }),
      });

      if (!res.ok) throw new Error("Failed to add review");

      const result = await res.json();
      console.log("Review created:", result);

      onReviewAdded?.(); // refresh parent reviews
      setOpen(false); // close modal after submit
      form.reset(); // optional: reset form fields
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Comment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogDescription>
            Share your experience and rate this travel plan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              type="number"
              id="rating"
              name="rating"
              min={1}
              max={5}
              defaultValue={5}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Write your review..."
              required
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={submitting || !userInfo}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
