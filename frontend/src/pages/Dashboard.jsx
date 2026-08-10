import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTickets } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await getTickets();

        setTickets(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">

        <div className="dashboard-brand">

          <div className="dashboard-logo">
            🤖
          </div>

          <div>
            <h2>Enterprise AI Helpdesk</h2>
            <span>Employee Portal</span>
          </div>

        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* Main Content */}
      <main className="dashboard-content">

        <div className="dashboard-top">

          <div>
            <h1>My Tickets</h1>

            <p>
              Manage and track your support requests
            </p>
          </div>

          <Link
            to="/create-ticket"
            className="create-ticket-button"
          >
            + Create Ticket
          </Link>

        </div>


        {/* Ticket List */}
        <div className="tickets-container">

          {/* Loading */}
          {loading && (
            <p className="loading-message">
              Loading tickets...
            </p>
          )}


          {/* Error */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* No Tickets */}
          {!loading &&
            !error &&
            tickets.length === 0 && (

              <div className="empty-tickets">

                <div className="empty-icon">
                  🎫
                </div>

                <h3>
                  No tickets yet
                </h3>

                <p>
                  Create your first support ticket
                  to get started.
                </p>

                <Link
                  to="/create-ticket"
                  className="create-ticket-button"
                >
                  + Create Ticket
                </Link>

              </div>

            )}


          {/* Real Tickets */}
          {!loading &&
            !error &&
            tickets.map((ticket) => (

              <div
                className="ticket-card"
                key={ticket.id}
              >

                <div className="ticket-main">

                  <div className="ticket-icon">
                    🎫
                  </div>

                  <div>

                    <h3>
                      {ticket.title}
                    </h3>

                    <p>
                      {ticket.description}
                    </p>

                    <span className="ticket-id">
                      Ticket #{ticket.id}
                    </span>

                  </div>

                </div>


                <div className="ticket-info">

                  <span className="category-badge hardware">
                    {ticket.category}
                  </span>

                  <span className="priority-badge high">
                    {ticket.priority}
                  </span>

                  <span className="status-badge open">
                    {ticket.status}
                  </span>

                </div>


                <Link
                  to={`/ticket/${ticket.id}`}
                  className="view-ticket"
                >
                  View →
                </Link>

              </div>

            ))}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;