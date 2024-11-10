// src/app/components/CandidateCard.js
import Link from 'next/link';

export default function CandidateCard({ candidate }) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-4">
      <h2 className="text-xl font-semibold">{candidate.name}</h2>
      <p className="text-gray-600">{candidate.party}</p>
      {/* Update Link component - remove <a> tag */}
      <Link href={`/candidates/${candidate.id}`} className="text-blue-500 hover:underline">
        View Profile
      </Link>
    </div>
  );
}
