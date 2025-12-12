"use client";

import InfoRow from "@/components/shared/InRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { TTravelPlan } from "@/types/travelPlan.interface";

import { Calendar, MapPin, Users } from "lucide-react";

interface IPlanViewDialogProps {
  open: boolean;
  onClose: () => void;
  plan: TTravelPlan | null;
}

const PlanViewDialogDetail = ({ open, onClose, plan }: IPlanViewDialogProps) => {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Travel Plan Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={plan.host.profileImage || ""} alt={plan.host.fullName} />
              <AvatarFallback className="text-2xl">{getInitials(plan.host.fullName)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{plan.host.fullName}</h2>

              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                {plan.host.email}
              </p>
            </div>
          </div>

          {/* Plan Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Plan Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <InfoRow label="Destination" value={plan.title} />
                </div>
                <div className="flex items-start gap-3">
                  <InfoRow label="Destination" value={plan.travelType} />
                </div>
                <div className="flex items-start gap-3">
                  <InfoRow label="Destination" value={plan.destination} />
                </div>
                <div className="flex items-start gap-3">
                  <InfoRow label="Destination" value={plan.budget} />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Start Date" value={formatDateTime(plan.startDate)} />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="End Date" value={formatDateTime(plan.endDate)} />
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Participants" value={plan.participants?.length || 0} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Created At" value={formatDateTime(plan.createdAt)} />
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <InfoRow label="Last Updated" value={formatDateTime(plan.updatedAt)} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanViewDialogDetail;
