import "./App.css";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import AppLayout from "./AppLayout";
import AppRoutes from "./AppRoutes";

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;