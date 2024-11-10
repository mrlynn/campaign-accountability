// src/app/candidates/[id]/components/CandidateProfileClient.js
"use client";

import { useEffect, useState } from 'react';
import PromiseForm from './PromiseForm';

export default function CandidateProfileClient({ candidateId }) {
    const [candidate, setCandidate] = useState(null);
  
    // Fetch candidate data, including promises
    useEffect(() => {
      async function fetchCandidate() {
        try {
          const response = await fetch(`/api/candidates/${candidateId}`);
          if (response.ok) {
            const data = await response.json();
            setCandidate(data);
          } else {
            console.error("Failed to fetch candidate");
          }
        } catch (err) {
          console.error("Error fetching candidate:", err);
        }
      }
  
      fetchCandidate();
    }, [candidateId]);
  
    if (!candidate) return <p>Loading...</p>;
  
    return (
      <div>
        <h1 className="text-3xl font-bold">{candidate.name}</h1>
        <p className="text-lg text-gray-600 mb-2">{candidate.party}</p>
        {candidate.bio && <p className="text-gray-700 mb-4">{candidate.bio}</p>}
        {candidate.electionYear && (
          <p className="text-gray-500">Election Year: {candidate.electionYear}</p>
        )}
  
        {/* Pass candidate name and election year to PromiseForm */}
        <div className="mt-8">
          <PromiseForm
            candidateId={candidateId}
            candidateName={candidate.name}
            electionYear={candidate.electionYear}
            onSuccess={() => console.log('Promise added successfully!')}
          />
        </div>
      </div>
    );
  }