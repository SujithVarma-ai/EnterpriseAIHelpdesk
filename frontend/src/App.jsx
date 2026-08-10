import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Create Ticket */}
        <Route
          path="/create-ticket"
          element={<CreateTicket />}
        />

        {/* Ticket Details */}
        <Route
          path="/ticket/:id"
          element={<TicketDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;