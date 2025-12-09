"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTravelPlan, updateMyPlan } from "@/services/user/myPlan";
import { TTravelPlan } from "@/types/travelPlan.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IMyPlanFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  travelPlan?: TTravelPlan | null;
  hostId?: string;
}

const formatDateForInput = (date?: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
};

const MyPlanFormDialog = ({
  open,
  onClose,
  travelPlan,
}: IMyPlanFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!travelPlan?.id;

  const [state, formAction, isPending] = useActionState(
    isEdit
      ? updateMyPlan.bind(null, travelPlan?.id as string)
      : createTravelPlan,
    null
  );

 useEffect(() => {
  if (state?.success) {
    toast.success("Travel Plan created successfully!");
  } else if (state?.message) {
    toast.error(state.message);
  }
}, [state]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Travel Plan" : "Create Travel Plan"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* ✅ Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Adventure Hiking"
                defaultValue={state?.formData?.title || travelPlan?.title || ""}
              />
              <InputFieldError field="title" state={state} />
            </Field>

            {/* ✅ Destination */}
            <Field>
              <FieldLabel htmlFor="destination">Destination</FieldLabel>
              <Input
                id="destination"
                name="destination"
                placeholder="Bandarban, Bangladesh"
                defaultValue={
                  state?.formData?.destination || travelPlan?.destination || ""
                }
              />
              <InputFieldError field="destination" state={state} />
            </Field>

            {/* ✅ Start Date (FIXED) */}
            <Field>
              <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={
                  state?.formData?.startDate ||
                  formatDateForInput(travelPlan?.startDate)
                }
              />
              <InputFieldError field="startDate" state={state} />
            </Field>

            {/* ✅ End Date (FIXED) */}
            <Field>
              <FieldLabel htmlFor="endDate">End Date</FieldLabel>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={
                  state?.formData?.endDate ||
                  formatDateForInput(travelPlan?.endDate)
                }
              />
              <InputFieldError field="endDate" state={state} />
            </Field>

            {/* ✅ Budget */}
            <Field>
              <FieldLabel htmlFor="budget">Budget</FieldLabel>
              <Input
                id="budget"
                name="budget"
                type="number"
                placeholder="15000"
                defaultValue={
                  state?.formData?.budget ?? travelPlan?.budget ?? ""
                }
              />
              <InputFieldError field="budget" state={state} />
            </Field>

            {/* ✅ Travel Type */}
            <Field>
              <FieldLabel htmlFor="travelType">Travel Type</FieldLabel>
              <select
                name="travelType"
                defaultValue={
                  state?.formData?.travelType ??
                  travelPlan?.travelType ??
                  "ADVENTURE" // fallback default
                }
                className="w-full border rounded-md p-2"
              >
                <option value="ADVENTURE">Adventure</option>
                <option value="BUSINESS">Business</option>
                <option value="FAMILY">Family</option>
                <option value="SOLO">Solo</option>
                <option value="FRIENDS">Friends</option>
                <option value="HONEYMOON">Honeymoon</option>
                <option value="COUPLE">Couple</option>
              </select>

              <InputFieldError field="travelType" state={state} />
            </Field>

            {/* ✅ Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="Short description..."
                defaultValue={
                  state?.formData?.description || travelPlan?.description || ""
                }
              />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* ✅ Visibility */}
            <Field>
              <FieldLabel htmlFor="visibility">Visibility</FieldLabel>
              <select
                name="visibility"
                defaultValue={String(
                  state?.formData?.visibility ?? travelPlan?.visibility ?? true
                )}
                className="w-full border rounded-md p-2"
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
              <InputFieldError field="visibility" state={state} />
            </Field>
          </div>

          {/* ✅ Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Travel Plan"
                : "Create Travel Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MyPlanFormDialog;
