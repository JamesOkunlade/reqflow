const API_URL = 'http://localhost:3000';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }

  // Check if there is any content to parse
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }

  // If there's no JSON content, return an empty object
  return {};
};


const api = {
  signup: (data) => fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse),

  login: (data) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse),

  fetchRequests: (authToken) => fetch(`${API_URL}/requests`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse),

  fetchRequestById: (id, authToken) => fetch(`${API_URL}/requests/${id}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse),

  createRequest: (data, authToken) => fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse),

  updateRequest: (id, data, authToken) => fetch(`${API_URL}/requests/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse),

  deleteRequest: (requestId, authToken) => fetch(`${API_URL}/requests/${requestId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse),

  fetchApprovals: (authToken) => fetch(`${API_URL}/approvals`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse),

  approve: (approvalId, authToken) => fetch(`${API_URL}/approvals/${approvalId}/approve`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse),

  reject: (approvalId, authToken) => fetch(`${API_URL}/approvals/${approvalId}/reject`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse),
};

export default api;
