import { Navigate } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ReactNode } from "react";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
