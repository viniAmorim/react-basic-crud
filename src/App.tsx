import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const isAuthenticated = localStorage.getItem("user") !== null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
