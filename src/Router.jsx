import { createBrowserRouter } from "react-router";
import App from "./App";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import PrivateRoute from "./PrivateRoute";
import TaskManagement from "./TaskManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <TaskManagement />,
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);
