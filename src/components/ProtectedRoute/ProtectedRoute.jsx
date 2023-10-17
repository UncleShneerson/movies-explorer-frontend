import { Navigate } from "react-router";

export default function ProtectedRoute({ loggedIn, children }) {
  console.log('проверка из логин');
  console.log(loggedIn);
  return loggedIn ? (
    <>
    {children}
    </>
  ) : (
    <Navigate to="/signin" replace />
  )
}
