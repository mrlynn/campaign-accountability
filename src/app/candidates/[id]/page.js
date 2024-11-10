// src/app/candidates/[id]/page.js

import { notFound } from 'next/navigation';
import CandidateProfileClient from './components/CandidateProfileClient';

export async function generateStaticParams() {
    if (process.env.NODE_ENV === 'production') {
      // Return mock data or handle dynamic paths differently during build
      return [{ id: 'mock-id' }]; // Replace with actual mock data or alternative approach
    }
  
    // Fetch real data when not in production build
    const res = await fetch(`${process.env.API_BASE_URL}/candidates`);
    const candidates = await res.json();
  
    return candidates.map((candidate) => ({ id: candidate.id }));
  }

export default async function CandidateProfile({ params }) {
  const { id } = await params;

  // Ensure we return a 404 if `id` is unavailable
  if (!id) {
    return notFound();
  }

  return (
    <div>
      <CandidateProfileClient candidateId={id} />
    </div>
  );
}
