import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchRequestById } from './requestsSlice';
import { approve, reject } from '../approvals/approvalsSlice';

const RequestDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { request, isFetching } = useSelector((state) => state.requests);
  const authToken = useSelector((state) => state.auth.user.auth_token);
  const approvalId = request?.pending_approval?.id;

  useEffect(() => {
    dispatch(fetchRequestById({ id, authToken }));
  }, [dispatch, id, authToken]);

  if (isFetching) return <p>Loading...</p>;
  if (!request) return <p>No request found</p>;

  const getApprovalStatusMessage = (request) => {
    const { approvals, status } = request;
  
    if (status === 'approved') {
      return(
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{approvals[approvals.length - 1].user.first_name}</dt>
          <dd className="text-xs text-gray-500">Approval confirmed by </dd>
        </div>
      )
    }
    if (status === 'rejected') {
      return(
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{approvals[approvals.length - 1].user.first_name}</dt>
          <dd className="text-xs text-gray-500">Request rejected by </dd>
        </div>
      )
    }
    if (status === 'approval_initiated') {
      if (approvals.length === 3) {
        return(
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">{approvals[1].user.first_name} and {approvals[0].user.first_name}</dt>
            <dd className="text-xs text-gray-500">Already approved by </dd>
          </div>
        )
      } else {
        return(
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">{approvals[0].user.first_name}</dt>
            <dd className="text-xs text-gray-500">Approval initiated by </dd>
          </div>
        )
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

  const handleApprove = (e) => {
    e.preventDefault();
    dispatch(approve({ approvalId, authToken }));
  }
  
  const handleReject = (e) => {
    e.preventDefault();
    dispatch(reject({ approvalId, authToken }));
  }

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-3xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <Link to="/" className="block transition hover:text-gray-700">
                <span className="sr-only"> Home </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>
            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <Link to="/requests" className="block transition hover:text-gray-700">Requests</Link>
            </li>
            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>{request.title}</li>
          </ol>
        </nav>
        <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{request.title}</h3>
              <span className="mt-1 mr-1 text-xs font-medium text-gray-600">Requested by {request.user.first_name}</span>
              <span
                className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 my-2 text-xs text-purple-600"
              >
                level {request.user.clearance_level}
              </span>
            </div>
            <div className="hidden sm:block sm:shrink-0">
              <div>
                <p className="text-2xl font-medium text-gray-900">${request.amount_cents}</p>
                <strong
                  className={`rounded border ${statusColor(request.status)} px-3 py-1.5 text-[10px] font-medium`}
                >
                  {request.status}
                </strong>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-pretty text-sm text-gray-500">{request.description}</p>
          </div>
          <dl className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Published</dt>
              <dd className="text-xs text-gray-500">31st June, 2021</dd>
            </div>
            {getApprovalStatusMessage(request)}
            {request.pending_approval && (
              <div>
                <button onClick={handleReject} className="inline-block mx-2 rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500">Reject</button>
                <button onClick={handleApprove} className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">Approve</button>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
