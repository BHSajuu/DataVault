import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../src/helper/ProtectedRoute"; // Ensure you import the ProtectedRoute component
import "./App.css";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowPage from "./pages/ShowPage";
import Signup from "./pages/Signup";
import DashboardLayoutSidebarHidden from "./pages/adminDashboard";

function App() {
  return (
    <main>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/show" element={<ShowPage />} />
        <Route path="/form" element={<FormPage />} />

        {/* ProtectedRoute should use element and be wrapped around the dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <DashboardLayoutSidebarHidden />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
