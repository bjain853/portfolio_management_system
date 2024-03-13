import { Navigate } from "react-router-dom";
import BaseLayout from "../BaseLayout";

interface IProps {
  Component: any;
}

export default function ProtectedRoute({ Component, ...rest }: IProps) {
  const advisorId = localStorage.getItem("advisorId");
  return advisorId ? (
    <BaseLayout>
      <Component {...rest} />
    </BaseLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}
