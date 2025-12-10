import { Navigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
