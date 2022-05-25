import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface PropType {
  component: React.FC;
}

const ProtectedRoute = ({ component: Component }: PropType) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
