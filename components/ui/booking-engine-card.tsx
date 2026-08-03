"use client"

import Image from "next/image"
import { motion } from "motion/react"

export function BookingEngineCard() {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        y: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        scale: { duration: 0.3 },
      }}
      className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center transition-all duration-300"
    >
      {/* Seamless Floating 3D Artwork (No background box wrapper, seamlessly blended into page) */}
      <div className="relative w-full h-full">
        <Image
          src="/images/ai_robot_orbit_booking.jpg"
          alt="AI Robot Orbit Phone & Calendar Booking 3D Graphic"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center mix-blend-multiply transition-transform duration-700 hover:scale-105"
        />
      </div>
    </motion.div>
  )
}
