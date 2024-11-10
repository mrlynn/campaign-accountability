// src/app/components/HeroSection.js
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Correct import path
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function HeroSection({ candidates }) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] bg-black text-white overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Register the modules
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {candidates.map((candidate) => (
          <SwiperSlide key={candidate._id}>
            <div className="flex items-center justify-center h-full px-4">
              <div className="text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{candidate.name}</h1>
                <p className="text-lg mb-6 opacity-80">{candidate.party} - Election Year: {candidate.electionYear}</p>
                <Link href={`/candidates/${candidate._id}`}>
                  <span className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                    View Profile
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swipe Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white opacity-75 animate-bounce">Swipe for more</p>
      </div>

      {/* Overlay Gradient for a subtle fade effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
    </section>
  );
}
