// src/app/candidates/[id]/page.js

import { notFound } from 'next/navigation';
import CandidateProfileClient from './components/CandidateProfileClient';

export async function generateStaticParams() {
  // Fetch all candidate IDs from your API or database
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates`);
  const candidates = await response.json();

  // Return an array of objects with `id` for each candidate
  return candidates.map(candidate => ({ id: candidate._id.toString() }));
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
