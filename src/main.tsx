import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import App from "./App"
import "./index.css"
import { Dashboard } from "@/pages/Dashboard"
import { ProtectedRoute } from "@/routes/ProtectedRoute"

const Login = React.lazy(() => import("@/pages/Login"))
const Unauthorized = React.lazy(() => import("@/pages/Unauthorized"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "unauthorized", element: <Unauthorized /> },
      {
        element: <ProtectedRoute roles={["ADMIN","BROKER","ANALYST","VIEWER"]} />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
