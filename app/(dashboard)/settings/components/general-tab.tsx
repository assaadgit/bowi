import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function GeneralTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage your notification preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Label
              htmlFor="task-completions"
              className="text-sm font-medium text-foreground"
            >
              Task Completions
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Receive notifications when your tasks are completed.
            </p>
          </div>
          <Switch id="task-completions" />
        </div>
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Label
              htmlFor="weekly-summary"
              className="text-sm font-medium text-foreground"
            >
              Weekly Summary
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Get a summary of your activity every week.
            </p>
          </div>
          <Switch id="weekly-summary" />
        </div>
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Label
              htmlFor="product-updates"
              className="text-sm font-medium text-foreground"
            >
              Product Updates
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Stay up-to-date with the latest features and improvements.
            </p>
          </div>
          <Switch id="product-updates" />
        </div>
      </CardContent>
    </Card>
  );
}