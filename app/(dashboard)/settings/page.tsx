import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CookiesTab } from "./components/cookies-tab";
import { GeneralTab } from "./components/general-tab";
import { PasswordTab } from "./components/password-tab";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="cookies">Browser Cookies</TabsTrigger>
          <TabsTrigger value="password">Password & Authentication</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="cookies">
          <CookiesTab />
        </TabsContent>
        <TabsContent value="password">
          <PasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}