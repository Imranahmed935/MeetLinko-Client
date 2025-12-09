"use client"
import { useEffect, useState } from "react";
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
import { formatDateTime } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { TTravelPlan } from "@/types/travelPlan.interface";

import { Calendar, MapPin, Shield, FileText, User } from "lucide-react";

interface MyPlanViewDialogProps {
  open: boolean;
  onClose: () => void;
  travelPlan: TTravelPlan | null; 
}

const MyPlanViewDetailDialog = ({
  open,
  onClose,
  travelPlan,
}: MyPlanViewDialogProps) => {
  const [hostInfo, setHostInfo] = useState<{fullName: string; email: string; profileImage?: string} | null>(null);

  useEffect(() => {
    const fetchHostInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setHostInfo(userInfo);
      } catch (err) {
        console.error("Failed to fetch host info:", err);
      }
    };

    fetchHostInfo();
  }, []);

  if (!travelPlan) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Travel Plan Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Travel Plan Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{travelPlan.title}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="h-4 w-4" />
                {travelPlan.destination}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="text-sm">
                  <Shield className="h-3 w-3 mr-1" />
                  {travelPlan.travelType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Plan Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Plan Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Destination" value={travelPlan.destination || "Not provided"} />
                <InfoRow label="Budget" value={travelPlan.budget || "Not provided"} />
                <InfoRow label="Description" value={travelPlan.description || "No description"} />
                <InfoRow label="Start Date" value={formatDateTime(travelPlan.startDate || "")} />
                <InfoRow label="End Date" value={formatDateTime(travelPlan.endDate || "")} />
              </div>
            </div>

            <Separator />

            {/* Meta Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Meta Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Created On" value={formatDateTime(travelPlan.createdAt || "")} />
                <InfoRow label="Last Updated" value={formatDateTime(travelPlan.updatedAt || "")} />
              </div>
            </div>

            <Separator />

            {/* Host Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Host Information</h3>
              </div>

              {hostInfo ? (
                <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={hostInfo.profileImage || ""} alt={hostInfo.fullName} />
                    <AvatarFallback>{hostInfo.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{hostInfo.fullName}</p>
                    <p className="text-sm text-muted-foreground">{hostInfo.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Loading host info...</p>
              )}
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyPlanViewDetailDialog;
