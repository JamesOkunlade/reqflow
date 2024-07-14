import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests, deleteRequest } from './requestsSlice';
import { Link } from 'react-router-dom';
import RequestModal from './RequestModal';
import {FiEdit, FiTrash2 } from 'react-icons/fi';

const RequestList = () => {
  const dispatch = useDispatch();
  const { requests, isFetching } = useSelector((state) => state.requests);
  const authToken = useSelector((state) => state.auth.user.auth_token);
  const currentUserId = useSelector((state) => state.auth.user.user.id);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (authToken) {
      dispatch(fetchRequests(authToken));
    }
  }, [dispatch, authToken]);

  const handleDelete = (requestId) => {
    dispatch(deleteRequest({ requestId, authToken }));
  }

  const handleOpenModal = (request = null) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  if (isFetching) return <p>Loading...</p>;
  if (!requests) return <p>No approval found</p>;


  const getApprovalStatusMessage = (request) => {
    const { approvals, status } = request;
  
    if (status === 'approved') {
      return `Approval confirmed by ${approvals[approvals.length - 1].user.first_name}`;
    }
  
    if (status === 'rejected') {
      return `Request rejected by ${approvals[approvals.length - 1].user.first_name}`;
    }
  
    if (status === 'approval_initiated') {
      if (approvals.length === 3) {
        return `Already approved by ${approvals[1].user.first_name} and ${approvals[0].user.first_name}`;
      } else {
        return `Approval initiated by ${approvals[0].user.first_name}`;
      }
    }
  
    return null;
  };
  

  const statusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'bg-neutral-100 dark:text-neutral-300';
      case 'approval_initiated':
        return 'bg-yellow-100 dark:text-yellow-300';
      case 'pending':
        return 'rounded border bg-blue-100 dark:text-blue-300';
      case 'approved':
        return 'bg-green-100 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 dark:text-red-300';
      default:
        break;
    }
  }

  return (
    <div>
      <div className="header flex justify-between items-center mb-4">
        <h1 className="block text-gray-700 text-2xl font-semibold">Requests</h1>
        <button onClick={() => handleOpenModal()} className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">New Request</button>
      </div>
      <ul className="space-y-4">
        {requests.map((request) => (
          <li key={request.id} className="relative">
            <Link to={`/requests/${request.id}`}>
              <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                <div className="flex items-start sm:gap-8">
                  <div>
                    <div className="flex items-center gap-1">
                      <div>
                        <p className="text-2xl mr-4 font-medium text-gray-900">${request.amount_cents}</p>
                      </div>
                      <strong
                        className={`rounded border ${statusColor(request.status)} px-3 py-1.5 text-[10px] font-medium`}
                      >
                        {request.status}
                      </strong>
                      <strong
                        className={`${statusColor(request.pending_approval?.status)} px-3 py-1.5 text-[10px] font-medium`}
                      >
                        {request.pending_approval?.status}
                      </strong>
                    </div>
                    <h3 className="mt-4 text-lg font-medium sm:text-xl">{request.title}</h3>
                    <p className="mt-1 text-sm text-gray-700">{request.description}</p>
                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                      <div className="flex items-center gap-1 text-gray-500">
                        <p className="text-xs font-medium">Requested by {request.user.first_name}</p>
                      </div>
                      <span className="hidden sm:block" aria-hidden="true">&middot;</span>
                      <div className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                        {getApprovalStatusMessage(request)}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
            {request.user.id === currentUserId && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button onClick={() => handleOpenModal(request)} className="text-gray-400 hover:text-gray-700">
                  <FiEdit size={18} />
                </button>
                <button onClick={() => handleDelete(request.id)} className="text-gray-400 hover:text-gray-700">
                  <FiTrash2 size={18} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showModal && (
        <RequestModal
          request={selectedRequest}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default RequestList;