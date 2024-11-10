// src/app/admin/page.js
"use client"; // Add this line at the top

import { useState, useEffect } from 'react';
import CandidateForm from './components/CandidateForm';

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    async function fetchCandidates() {
      const response = await fetch('/api/candidates');
      const data = await response.json();
      setCandidates(data);
    }
    fetchCandidates();
  }, []);

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const refreshCandidates = async () => {
    const response = await fetch('/api/candidates');
    const data = await response.json();
    setCandidates(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <button
          onClick={() => setSelectedCandidate(null)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Candidate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p>{candidate.party}</p>
            <p>{candidate.electionYear}</p>
            <button
              onClick={() => handleEditCandidate(candidate)}
              className="text-blue-500 hover:underline mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Candidate Form for Adding or Editing */}
      <CandidateForm
        candidate={selectedCandidate}
        onSuccess={refreshCandidates}
      />
    </div>
  );
}
