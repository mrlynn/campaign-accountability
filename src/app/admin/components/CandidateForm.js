// src/app/admin/components/CandidateForm.js
"use client";

import { useState, useEffect } from 'react';

export default function CandidateForm({ candidate, onSuccess }) {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [electionYear, setElectionYear] = useState('');
  const [error, setError] = useState(null); // Add state to store error messages

  useEffect(() => {
    if (candidate) {
      setName(candidate.name);
      setParty(candidate.party);
      setElectionYear(candidate.electionYear);
    } else {
      setName('');
      setParty('');
      setElectionYear('');
    }
  }, [candidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = candidate ? 'PUT' : 'POST';
    const endpoint = candidate ? `/api/candidates/${candidate._id}` : '/api/candidates';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, party, electionYear }),
      });

      if (response.ok) {
        onSuccess(); // Refresh candidates list
        setName('');
        setParty('');
        setElectionYear('');
        setError(null); // Clear any previous errors
      } else {
        // Capture error response as text, then attempt JSON parsing if possible
        const errorData = await response.text();
        let errorMessage = errorData;

        try {
          const parsedError = JSON.parse(errorData);
          errorMessage = parsedError.message || errorMessage;
        } catch {
          // If parsing fails, keep errorMessage as plain text
        }

        setError(errorMessage || 'Failed to save candidate');
        console.error('Error saving candidate:', errorMessage);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error saving candidate:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {candidate ? 'Edit Candidate' : 'Add New Candidate'}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <label className="block mb-2">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Party:
        <input
          type="text"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Election Year:
        <input
          type="number"
          value={electionYear}
          onChange={(e) => setElectionYear(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </label>

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        {candidate ? 'Update Candidate' : 'Add Candidate'}
      </button>
    </form>
  );
}
