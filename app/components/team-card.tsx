"use client";

import { useState } from "react";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  certifications?: string[];
}

export default function TeamCard({
  name,
  title,
  bio,
  image,
  certifications,
}: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`team-card cursor-pointer ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
    >
      <div className="team-card-inner relative w-full" style={{ aspectRatio: "3/4" }}>
        {/* Front */}
        <div className="team-card-front absolute inset-0 rounded-2xl overflow-hidden bg-white shadow-lg">
          <div className="relative w-full h-[75%]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-text">{name}</h3>
            <p className="text-sm text-primary font-medium">{title}</p>
          </div>
        </div>

        {/* Back */}
        <div className="team-card-back absolute inset-0 rounded-2xl overflow-hidden bg-primary p-6 flex flex-col items-center justify-center text-white shadow-lg">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 mb-4 relative flex-shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="text-accent-light text-sm font-medium mb-3">{title}</p>
          <p className="text-white/90 text-sm text-center leading-relaxed mb-3">
            {bio}
          </p>
          {certifications && certifications.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-xs bg-white/15 px-2 py-0.5 rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          )}
          <p className="text-white/50 text-xs mt-3">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
}
