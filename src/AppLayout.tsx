import "./App.css";
import AppSidebar from "./sidebar/AppSidebar";
import { Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import "@fontsource/libre-baskerville/index.css";
import type { ReactNode } from "react";

function AppLayout({ children }: { children: ReactNode }) {
  function settings() {
    // pop up the settings panel
    alert("Settings panel is under development.");
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background text-foreground">
        <AppSidebar />

        <SidebarInset>
          <header className="h-12 flex border-b px-4 items-center">
            <SidebarTrigger className="md:hidden mr-2" />

            <div className="flex w-full justify-end items-center gap-2">
              <p className="font-semibold text-lg">Connected</p>
              <Button variant="ghost" onClick={settings}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 overflow-hidden">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;