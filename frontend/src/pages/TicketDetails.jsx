import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getTicketById,
  getComments,
  addComment,
  getTicketSummary,
} from "../services/api";

function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState("");

  // AI Summary states
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  // Load ticket and comments
  useEffect(() => {
    const loadData = async () => {
      try {
        const ticketData = await getTicketById(id);

        setTicket(ticketData);

        const commentsData = await getComments(id);

        setComments(commentsData);
      } catch (error) {
        console.error(error);
        setError("Failed to load ticket details");
      } finally {
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Add comment
  const handleAddComment = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      await addComment(id, message);

      const updatedComments = await getComments(id);

      setComments(updatedComments);

      setMessage("");
    } catch (error) {
      console.error(error);

      alert("Failed to add comment");
    }
  };

  // Generate / Regenerate AI Summary
  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    setSummaryError("");

    try {
      const data = await getTicketSummary(id);

      setSummary(data.summary);
    } catch (error) {
      console.error(error);

      setSummaryError("Failed to generate AI summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="ticket-details-content">
        <h2>Loading ticket...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="ticket-details-content">
        <h2>{error}</h2>

        <Link to="/dashboard">
          ← Back to Tickets
        </Link>
      </div>
    );
  }

  // Ticket not found
  if (!ticket) {
    return (
      <div className="ticket-details-content">
        <h2>Ticket not found</h2>

        <Link to="/dashboard">
          ← Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="ticket-details-page">

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


      {/* Content */}
      <main className="ticket-details-content">

        {/* Ticket Details */}
        <div className="ticket-details-card">

          <div className="ticket-details-title">

            <div>

              <span className="ticket-id">
                Ticket #{ticket.id}
              </span>

              <h1>
                {ticket.title}
              </h1>

              <p>
                Created on{" "}
                {new Date(
                  ticket.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

            <span className="status-badge open">
              {ticket.status}
            </span>

          </div>


          {/* Ticket Information */}
          <div className="ticket-details-info">

            <div>
              <span>Category</span>

              <strong className="category-text">
                {ticket.category || "Not assigned"}
              </strong>
            </div>


            <div>
              <span>Priority</span>

              <strong className="priority-text">
                {getPriorityName(ticket.priority)}
              </strong>
            </div>


            <div>
              <span>Status</span>

              <strong className="status-text">
                {ticket.status}
              </strong>
            </div>

          </div>


          {/* Description */}
          <div className="ticket-section">

            <h3>Description</h3>

            <p>
              {ticket.description}
            </p>

          </div>

        </div>


        {/* AI Summary */}
        <div className="ticket-details-card ai-summary-card">

          <div className="section-heading">

            <div className="section-icon">
              🤖
            </div>

            <div>
              <h2>AI Summary</h2>

              <p>
                Generated using your ticket and comments
              </p>
            </div>

          </div>


          {/* Generate / Regenerate Button */}
          {!summaryLoading && (
            <button
              type="button"
              className="submit-comment-button"
              onClick={handleGenerateSummary}
            >
              🤖{" "}
              {summary
                ? "Regenerate AI Summary"
                : "Generate AI Summary"}
            </button>
          )}


          {/* Loading */}
          {summaryLoading && (
            <div className="ai-summary">

              <p>
                🤖 AI is analyzing the ticket and comments...
              </p>

            </div>
          )}


          {/* Error */}
          {summaryError && (
            <div className="ai-summary">

              <p>
                {summaryError}
              </p>

            </div>
          )}


          {/* Generated Summary */}
          {summary && (
            <div className="ai-summary">

              <h3>
                AI Summary
              </h3>

              <p
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {summary}
              </p>

            </div>
          )}

        </div>


        {/* Comments */}
        <div className="ticket-details-card">

          <div className="section-heading">

            <div className="section-icon">
              💬
            </div>

            <div>
              <h2>Comments</h2>

              <p>
                Communication about this ticket
              </p>
            </div>

          </div>


          {/* Loading Comments */}
          {commentsLoading && (
            <p>
              Loading comments...
            </p>
          )}


          {/* No Comments */}
          {!commentsLoading &&
            comments.length === 0 && (
              <p>
                No comments yet.
              </p>
            )}


          {/* Existing Comments */}
          {!commentsLoading &&
            comments.map((comment) => (

              <div
                className="comment"
                key={comment.id}
              >

                <div className="comment-avatar">
                  💬
                </div>

                <div className="comment-content">

                  <div className="comment-header">

                    <strong>
                      User
                    </strong>

                    <span>
                      {new Date(
                        comment.createdAt
                      ).toLocaleString()}
                    </span>

                  </div>

                  <p>
                    {comment.message}
                  </p>

                </div>

              </div>

            ))}


          {/* Add Comment */}
          <form
            className="comment-form"
            onSubmit={handleAddComment}
          >

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Write a comment..."
              rows="3"
            ></textarea>

            <button
              type="submit"
              className="submit-comment-button"
            >
              Send Comment
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}


// Convert backend enum value to readable text
function getPriorityName(priority) {
  switch (priority) {

    case 1:
      return "Low";

    case 2:
      return "Medium";

    case 3:
      return "High";

    case 4:
      return "Critical";

    default:
      return "Not assigned";
  }
}

export default TicketDetails;