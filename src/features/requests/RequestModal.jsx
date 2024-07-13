import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRequest, updateRequest } from './requestsSlice';

const RequestModal = ({ request, setShowModal }) => {
  const isUpdate = !!request;
  const [formData, setFormData] = useState({ title: '', description: '', amount_cents: '' });
  const authToken = useSelector((state) => state.auth.user.auth_token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setFormData({
        title: request.title,
        description: request.description,
        amount_cents: request.amount_cents,
      });
    }
  }, [isUpdate, request]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      amount_cents: parseInt(formData.amount_cents, 10),
    };
    if (isUpdate) {
      dispatch(updateRequest({ requestId: request.id, dataToSend, authToken }));
    } else {
      dispatch(createRequest({ dataToSend, authToken }));
    }
    setShowModal(false);
  };

  return (
    <div className="flex fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/5">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only">Title</label>
              <input
                placeholder="Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                rows="8"
              ></textarea>
            </div>

            <div>
              <label className="sr-only">Amount</label>
              <input
                placeholder="Amount"
                type="number"
                name="amount_cents"
                value={formData.amount_cents}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button type="button" onClick={() => setShowModal(false)} className="inline-block rounded border border-indigo-600 bg-white-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">Cancel</button>
              <button type="submit" className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                {isUpdate ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
