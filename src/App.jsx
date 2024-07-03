import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import DashboardSettingsPage from "./pages/dashboard/settings/DashboardSettingsPage";
import Page404 from "./pages/notFound/Page404";

import { useSelector } from "react-redux";

import Profile from "./pages/dashboard/DashboardProfilePage";
import SubjectsPage from "./pages/dashboard/subjects/SubjectsPage";
import AddOfferedSubject from "./pages/dashboard/subjects/AddOfferedSubjects";
import ResultsPage from "./pages/dashboard/ResultsPage";

// routes

export default function App() {
  const { user, token } = useSelector((state) => state.pbStudentAuth);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          element: !token ? <Navigate to="/login" /> : <DashboardLayout />,
          path: "/dashboard",
          children: [
            { element: <Navigate to="/dashboard/home" />, index: true },
            {
              path: "home",
              element: <Profile />,
            },

            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "results",
              element: <ResultsPage />,
            },

            {
              path: "subjects",
              element: <SubjectsPage />,
            },

            {
              path: "subjects/add-subjects",
              element: <AddOfferedSubject />,
            },

            {
              path: "settings",
              element: <DashboardSettingsPage />,
            },
            // {
            //   path: "changePassword",
            //   element: <ChangePassword />,
            // },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        { path: "/404", element: <Page404 /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ])}
    />
  );
}
