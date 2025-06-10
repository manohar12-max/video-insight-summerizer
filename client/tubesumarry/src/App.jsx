import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";

function App() {
 
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
