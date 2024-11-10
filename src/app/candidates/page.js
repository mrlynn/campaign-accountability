// src/app/candidates/page.js
"use client"; // This component needs to be a client component to use hooks

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await fetch('/api/candidates');
        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
        } else {
          console.error("Failed to fetch candidates");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold">{candidate.name}</h2>
              <p>{candidate.party}</p>
              <p>Election Year: {candidate.electionYear}</p>
              <Link href={`/candidates/${candidate._id}`}>
                <span className="text-blue-500 hover:underline mt-2 inline-block">View Profile</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
