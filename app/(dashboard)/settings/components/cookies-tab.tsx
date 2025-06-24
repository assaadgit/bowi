import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CookiesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Browser Cookies</CardTitle>
        <CardDescription>Manage your cookie preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Clear all cookies stored in your browser.
            </p>
          </div>
          <Button variant="destructive">Clear All Cookies</Button>
        </div>
      </CardContent>
    </Card>
  );
}