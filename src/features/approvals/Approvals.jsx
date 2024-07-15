import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovals } from './approvalsSlice';

const Approvals = () => {
  const dispatch = useDispatch();
  const { approvals, isFetching } = useSelector((state) => state.approvals);
  const authToken = useSelector((state) => state.auth.user.auth_token);

  useEffect(() => {
    if (authToken) {
      dispatch(fetchApprovals(authToken));
    }
  }, [dispatch, authToken]);

  if (isFetching) return <p>Loading...</p>;
  if (!approvals) return <p>No approval found</p>;


  const statusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'bg-neutral-100 dark:text-neutral-300';
      case 'approval_initiated':
        return 'bg-yellow-100 dark:text-yellow-300';
      case 'pending':
        return 'bg-blue-100 dark:text-blue-300';
      case 'approved':
        return 'bg-green-100 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 dark:text-red-300';
      default:
        return '';
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Approvals</h1>
      </div>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Request</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Amount</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Requested By</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Request Status</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Approved/Rejected By</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Approval Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {approvals.map((approval) => (
            <tr key={approval.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {approval.request.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {approval.approved_amount_cents}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {`${approval.request.user.first_name} ${approval.request.user.last_name}`}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <span className={`rounded ${statusColor(approval.request.status)} font-medium px-2 py-1 text-xs`}>
                  {approval.request.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {`${approval.user?.first_name} ${approval.user?.last_name}`}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <span className={`rounded ${statusColor(approval.status)} font-medium px-2 py-1 text-xs`}>
                  {approval.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approvals;
