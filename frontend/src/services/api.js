const API_URL = "http://localhost:5244/api";


export async function getTickets() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Ticket`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return await response.json();
}


export async function createTicket(ticketData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Ticket`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return await response.text();
}


export async function getTicketById(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/Ticket/${id}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return await response.json();
}


export async function getComments(ticketId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/tickets/${ticketId}/comments`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return await response.json();
}


export async function addComment(ticketId, message) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/tickets/${ticketId}/comments`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        message: message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return await response.text();
}


export async function getTicketSummary(ticketId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/Ticket/${ticketId}/summary`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate AI summary");
  }

  return await response.json();
}