import React from 'react';

const Home = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center items-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-2xl">

          <h2 className="text-3xl font-bold sm:text-4xl">ReqFlow: A Simple Request and Approval Tool</h2>
          <p className="mt-4 text-gray-600">
            The idea is simple, a user can make a request of an amount for anything and when three other users with a higher clearance level than the requester approve, the requested amount is released in form of a preloaded virtual card (this part has not been implemented yet). The focus of this project is not on the validity of the idea but on the technical tools and choices and also an attempt to describe the barest minimum in terms of proactiveness, requirements definition, ownership, autonomy, and good soft communication skills which are all necessary for the role of a product-minded senior engineer.
          </p>
          
          <section className="mt-8">
            <h3 className="text-2xl font-semibold">Features</h3>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>User Management: Users can log in, view profiles, and manage requests.</li>
              <li>Request Management: Users can create, update, delete, and view requests with various states.</li>
              <li>Approval Management: Higher clearance users can approve or reject requests.</li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold">User Stories and Requirements</h3>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>A User, who could be an employee of the company, can log on to the system.</li>
              <li>A User can view all Requests made by other users publicly, including descriptions of the requested amounts and their current status.</li>
              <li>Status states include: requested, approval_initiated, approved, and rejected. Users can see who initiated, approved, or rejected a Request.</li>
              <li>A User can create a new Request with a title, description, and amount.</li>
              <li>A User can update their own Request that is still in the requested state.</li>
              <li>A User cannot update a Request in approval_initiated, approved, or rejected states.</li>
              <li>A User can delete their own Request that is still in the requested state.</li>
              <li>A User cannot delete a Request in approval_initiated, approved, or rejected states.</li>
              <li>A User can view a list of all Approvals, including approved and rejected ones.</li>
              <li>A User can view their own profile.</li>
              <li>Users with higher clearance levels than the requester can approve or reject a Request once.</li>
              <li>An approval user (one who has approved or rejected) for a Request must be unique.</li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold">Request States and Transitions</h3>
            <p className="mt-4 text-gray-600">
              A Request starts in the state :requested upon creation. It requires three approvals to transition from :requested to :approval_initiated and finally to :approved. A Request with one or two approvals remains in :approval_initiated state, indicating pending approvals. Once approved by three users, a Request transitions to :approved state. If rejected by any approval user, the Request enters a final state; no further actions or approvals are possible.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold">API Endpoints</h3>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>Requests
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>GET /requests - Fetch list of requests</li>
                  <li>POST /requests - Create a new request</li>
                  <li>GET /requests/:id - Fetch a single request</li>
                  <li>PUT /requests/:id - Update a request</li>
                  <li>DELETE /requests/:id - Delete a request</li>
                </ul>
              </li>
              <li>Approvals
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>GET /approvals - Fetch list of approvals</li>
                  <li>POST /approvals/:id/approve - Approve a pending approval</li>
                  <li>POST /approvals/:id/reject - Reject a pending approval</li>
                </ul>
              </li>
              <li>Authentication
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>POST /auth/login - Login a user</li>
                  <li>POST /signup - Create a new user</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-2xl font-semibold">Technological Choices</h3>
            <h4 className="text-xl font-semibold mt-4">Authentication and Authorization</h4>
            <p className="mt-2 text-gray-600">
              Token-based Authentication: Implemented using the jwt gem for managing JSON Web Tokens (JWT). The User model handles user storage, and the authentication system is structured with four service classes.
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-600">
              <li>JsonWebToken: Handles encoding and decoding JWT tokens.</li>
              <li>AuthorizeApiRequest: Ensures API calls are authorized with valid tokens and user payloads.</li>
              <li>AuthenticationController: Manages the authentication process.</li>
              <li>AuthenticateUser: Performs user authentication.</li>
            </ul>
            
            <h4 className="text-xl font-semibold mt-4">JWT Singleton</h4>
            <p className="mt-2 text-gray-600">
              Provides methods for token encoding and decoding. Encoding uses Rails' unique secret key for signing tokens. Decoding handles token validation and expiration, with JWT raising exceptions handled by an ExceptionHandler module.
            </p>

            <h4 className="text-xl font-semibold mt-4">Message Handling</h4>
            <p className="mt-2 text-gray-600">
              Non-domain specific messages are stored in a singleton `Message` class, co-located with `JsonWebToken.rb` and `ApiVersion.rb` files in `app/lib`.
            </p>

            <h4 className="text-xl font-semibold mt-4">Versioning</h4>
            <p className="mt-2 text-gray-600">
              API Versioning: Even for internal projects, versioning APIs is crucial to manage breaking changes. Implemented by adding a route constraint based on request headers and organizing controllers into different modules.
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-600">
              <li>ApiVersion Class: Checks API version from headers and routes requests to appropriate controller modules. Implements content negotiation via `Accept` headers to handle requested or default versions. Nonexistent versions default to `v1`.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
