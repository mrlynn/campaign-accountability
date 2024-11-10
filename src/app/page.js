// src/app/page.js
"use client";

import HeroSection from './components/HeroSection';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function fetchCandidates() {
      const response = await fetch('/api/candidates');
      const data = await response.ok ? await response.json() : [];
      // Limit to the first 5 candidates for the hero slider
      setCandidates(data.slice(0, 5));
    }
    fetchCandidates();
  }, []);

  return (
    <div>
      {/* Hero Section with Slider */}
      <HeroSection candidates={candidates} />

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Welcome to Campaign Accountability</h2>
        <p className="mb-8 text-gray-700">
          Track and verify campaign promises for political candidates. Browse candidates and see whether they've followed through on their commitments.
        </p>
        <Link href="/candidates">
          <span className="text-blue-600 hover:underline">View All Candidates</span>
        </Link>
      </section>
    </div>
  );
}
