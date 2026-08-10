import { Link, useNavigate } from "react-router-dom";
import { createTicket } from "../services/api";

function CreateTicket() {
  const navigate = useNavigate();

  const handleCreateTicket = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const priority = Number(event.target.priority.value);

    try {
      await createTicket({
        title,
        description,
        priority,
      });

      alert("Ticket created successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert("Failed to create ticket");
    }
  };

  return (
    <div className="create-ticket-page">

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

        <Link
          to="/dashboard"
          className="back-button"
        >
          ← Back to Tickets
        </Link>

      </header>


      {/* Form */}
      <main className="create-ticket-content">

        <div className="create-ticket-card">

          <div className="create-ticket-heading">

            <div className="create-ticket-icon">
              🎫
            </div>

            <div>
              <h1>Create a New Ticket</h1>

              <p>
                Describe your issue and our AI will help
                categorize and prioritize it.
              </p>
            </div>

          </div>


          <form onSubmit={handleCreateTicket}>

            {/* Title */}
            <label>
              Ticket Title
            </label>

            <input
              type="text"
              name="title"
              className="ticket-input"
              placeholder="Briefly describe your issue"
              required
            />


            {/* Description */}
            <label>
              Description
            </label>

            <textarea
              name="description"
              className="ticket-textarea"
              placeholder="Describe your issue in detail..."
              rows="6"
              required
            ></textarea>


            {/* Priority */}
            <label>
              Priority
            </label>

            <select
              name="priority"
              className="ticket-input"
            >
              <option value="0">
                Let AI decide
              </option>

              <option value="1">
                Low
              </option>

              <option value="2">
                Medium
              </option>

              <option value="3">
                High
              </option>

              <option value="4">
                Critical
              </option>
            </select>


            <p className="ai-note">
              🤖 Leave priority as "Let AI decide" and our AI
              will automatically predict the priority.
            </p>


            {/* Buttons */}
            <div className="ticket-form-actions">

              <Link
                to="/dashboard"
                className="cancel-button"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="submit-ticket-button"
              >
                Create Ticket →
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default CreateTicket;