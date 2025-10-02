import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup setToken={setToken} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
