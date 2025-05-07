import App from "./App";
import LogoutButton from "./components/LogoutButton";
import Alldetails from "./pages/AllDetails/AllDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import MoreDetails from "./pages/MoreDetails/MoreDetails";
import ProtectedRoute from "./ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <LogoutButton />
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/alldetails",
        element: (
          <ProtectedRoute>
            <LogoutButton />
            <Alldetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <ProtectedRoute>
            <LogoutButton />
            <MoreDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
