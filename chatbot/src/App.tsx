import './App.css'
import AppRoutes from './AppRoutes';
import AppSidebar from './AppSidebar';
import { Settings } from 'lucide-react';
import { Button } from './components/ui/button';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';

function App() {
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
            <div className="flex w-full justify-end items-center gap-2">
              <p className="font-semibold text-lg">Connected</p>
              <Button variant="ghost" onClick={settings} >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 overflow-hidden">
            <AppRoutes />
          </main>
        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}

export default App