'use client';

import { useMemo } from 'react';

// Generate random values for each blob's animation
function generateBlobAnimation(seed: number) {
  // Use seed for consistent but varied animations
  const random = (min: number, max: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    seed++;
    return min + (x - Math.floor(x)) * (max - min);
  };

  return {
    duration: random(20, 35), // 20-35 seconds
    delay: random(0, 5), // 0-5 second delay
    xRange: random(30, 80), // horizontal movement range
    yRange: random(20, 50), // vertical movement range
    scaleMin: random(0.9, 1.0),
    scaleMax: random(1.05, 1.15),
  };
}

export default function BlobBackground() {
  const blobs = useMemo(() => [
    {
      left: 2,
      top: 0,
      width: 500,
      height: 500,
      colorFrom: 'from-cyan-800',
      colorTo: 'to-teal-600',
    },
    {
      left: 70,
      top: 20,
      width: 400,
      height: 400,
      colorFrom: 'from-green-700',
      colorTo: 'to-green-400',
    },
    {
      left: 20,
      top: 60,
      width: 450,
      height: 450,
      colorFrom: 'from-purple-500',
      colorTo: 'to-accent',
    },
    {
      left: 40,
      top: 40,
      width: 300,
      height: 300,
      colorFrom: 'from-pink-500',
      colorTo: 'to-rose-400',
    }
  ], []);

  // Generate unique animation params for each blob
  const blobAnimations = useMemo(() =>
    blobs.map((_, i) => generateBlobAnimation(i + 1)),
  [blobs]);

  return (
    <div className="fixed h-screen w-full top-0 left-0 overflow-hidden">
      {blobs.map((blob, index) => {
        const anim = blobAnimations[index];
        return (
          <div
            key={index}
            className={`
              absolute
              -z-10
              rounded-full
              blur-2xl
              opacity-20
              bg-linear-120
              ${blob.colorFrom}
              ${blob.colorTo}
            `}
            style={{
              left: `${blob.left}%`,
              top: `${blob.top}%`,
              width: `${blob.width}px`,
              height: `${blob.height}px`,
              animation: `blob-float-${index} ${anim.duration}s ease-in-out ${anim.delay}s infinite`,
              willChange: 'transform',
            } as React.CSSProperties}
          />
        );
      })}

      {/* Inject unique keyframes for each blob */}
      <style dangerouslySetInnerHTML={{
        __html: blobAnimations.map((anim, i) => `
          @keyframes blob-float-${i} {
            0%, 100% {
              transform: translate(0, 0) scale(${anim.scaleMin});
            }
            25% {
              transform: translate(${anim.xRange}px, -${anim.yRange}px) scale(${anim.scaleMax});
            }
            50% {
              transform: translate(-${anim.xRange * 0.5}px, ${anim.yRange}px) scale(${anim.scaleMin});
            }
            75% {
              transform: translate(${anim.xRange * 0.7}px, ${anim.yRange * 0.5}px) scale(${anim.scaleMax});
            }
          }
        `).join('\n')
      }} />
    </div>
  );
}