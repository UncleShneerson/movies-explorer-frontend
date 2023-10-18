import { Navigate } from "react-router";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


export default function ProtectedRoute({ element: Component, ...props }) {
  const { loggedIn, } = useContext(CurrentUserContext);
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
}
