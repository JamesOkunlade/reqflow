## ReqFlow Frontend

### Overview

ReqFlow is a simple request and approval tool. This React application serves as the frontend for the ReqFlow system, allowing users to interact with the request and approval processes. The focus is on demonstrating the technical tools and choices used to create a user-friendly and efficient interface.


#### This is a work in progress and requires improvement in a few places. 

#### One obvious area of concern that will be improved is the use of global state. This approach can lead to re-fetching requests unnecessarily, which may impact performance.


### Features

- **User Authentication**: Users can log in and manage their sessions.
- **Request Management**: Users can create, update, delete, and view requests with various states.
- **Approval Management**: Higher clearance users can approve or reject requests.

### User Stories and Requirements

- A User can log in to the system.
- A User can view all Requests made by other users, including descriptions and statuses.
- A User can create a new Request with a title, description, and amount.
- A User can update their own Request in the requested state.
- A User cannot update a Request in approval_initiated, approved, or rejected states.
- A User can delete their own Request in the requested state.
- A User cannot delete a Request in approval_initiated, approved, or rejected states.
- A User can view a list of all Approvals.
- A User can view their own profile.
- Users with higher clearance levels can approve or reject a Request once.

### Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library.
- **Redux Toolkit**: Simplifies Redux development.
- **React Router**: Declarative routing for React.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **FetchAPI**: HTTP client for making API requests.
- **JWT**: Handling JSON Web Tokens for authentication.

### Project Structure

- **src/**
  - **components/**: Reusable components (e.g., RequestList, NewRequestModal).
  - **features/**: Redux slices for different features (e.g., requestsSlice, authSlice).
  - **pages/**: Page components corresponding to different routes (e.g., HomePage, RequestPage).
  - **App.js**: Main application component.
  - **index.js**: Entry point for the React app.
  - **store.js**: Configures Redux store.

### State Management

- **Redux Toolkit**: Used for efficient Redux state management.
  - **authSlice**: Manages authentication state (e.g., login, logout).
  - **requestsSlice**: Manages request state (e.g., fetching, creating, updating, deleting requests).

### API Integration

- **FetchAPI**: Used for making HTTP requests to the backend API.
  - **Authentication**: Handles login and token storage.
  - **Requests**: Handles CRUD operations for requests.
  - **Approvals**: Handles approval and rejection of requests.

### Components

- **NewRequestModal**: Modal component for creating and updating requests.
- **RequestList**: Displays a list of requests with their statuses.
- **RequestItem**: Displays individual request details.
- **ApprovalButton**: Button component for approving requests.

### Usage

1. Clone the repository: `git clone https://github.com/JamesOkunlade/reqflow-frontend.git`
2. Install dependencies: `yarn install`
3. Start the development server: `yarn run dev`
4. The app will be running on `http://localhost:5173`
5. Ensure the backend is serving on port :3000

### Loom Demo
https://www.loom.com/share/7ece706f3ea24f519e53d007080c7588?sid=20962d24-627b-4a0b-ae10-6edc7d5e5fea


### Authentication and Authorization

- **Token-based Authentication**: Implemented using JWT. The token is stored in the Redux state and localStorage for session persistence.
- **Protected Routes**: React Router is used to protect routes based on the authentication state.

### Styling

- **Tailwind CSS**: Utility-first CSS framework used for styling components.


### Future Improvements

- **Virtual Card Integration**: Implement the release of requested amounts via preloaded virtual cards.
- **Enhanced User Interface**: Improve the UI/UX with more interactive components and better styling.
- **Additional Features**: Add more features based on user feedback and requirements.
