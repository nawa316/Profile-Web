"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

interface ProfileCardProps {
  photoUrl?: string;
  name?: string;
}

const CARD_W = 260;
const ANCHOR_CX = CARD_W / 2;
const ROPE_LEN = 60;

function buildRopePath(dx: number, dy: number) {
  const holeX = ANCHOR_CX + dx;
  const holeY = ROPE_LEN + dy;
  const dist = Math.sqrt(dx * dx + holeY * holeY);
  const slack = Math.max(0, ROPE_LEN - dist);
  const sag = slack * 0.55;
  const ctrlX = (ANCHOR_CX + holeX) / 2;
  const ctrlY = (0 + holeY) / 2 + sag;
  return {
    d: `M ${ANCHOR_CX} 0 Q ${ctrlX} ${ctrlY} ${holeX} ${holeY}`,
    holeX,
    holeY,
  };
}

export default function ProfileCard({ photoUrl, name = "Awan" }: ProfileCardProps) {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [14, -14]), {
    stiffness: 380,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-14, 14]), {
    stiffness: 380,
    damping: 28,
  });

  const [rope, setRope] = useState(() => buildRopePath(0, 0));

  const updateRope = useCallback(() => {
    setRope(buildRopePath(cardX.get(), cardY.get()));
  }, [cardX, cardY]);

  useEffect(() => {
    const u1 = cardX.on("change", updateRope);
    const u2 = cardY.on("change", updateRope);
    updateRope();
    return () => {
      u1();
      u2();
    };
  }, [cardX, cardY, updateRope]);

  const handleDragEnd = () => {
    animate(cardX, 0, { type: "spring", stiffness: 240, damping: 22, mass: 1.1 });
    animate(cardY, 0, { type: "spring", stiffness: 240, damping: 22, mass: 1.1 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0, { type: "spring", stiffness: 300, damping: 25 });
    animate(mouseY, 0, { type: "spring", stiffness: 300, damping: 25 });
  };

  return (
    <div
      className="relative select-none flex-shrink-0"
      style={{ width: CARD_W, height: 480, perspective: 1000 }}
    >
      {/* SVG Lanyard */}
      <svg
        width={CARD_W}
        height={ROPE_LEN + 20}
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <ellipse
          cx={ANCHOR_CX}
          cy={2}
          rx={7}
          ry={4}
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth={1.2}
        />
        <path
          d={rope.d}
          stroke="#94a3b8"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />
        <g transform={`translate(${rope.holeX - 9}, ${rope.holeY - 6})`}>
          <rect width={18} height={12} rx={3} fill="#b0bec5" stroke="#90a4ae" strokeWidth={1} />
          <rect x={4} y={2.5} width={10} height={7} rx={2} fill="#cfd8dc" />
        </g>
      </svg>

      {/* The ID Card */}
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing z-20"
        style={{
          x: cardX,
          y: cardY,
          top: ROPE_LEN,
          left: 0,
          width: CARD_W,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="bg-white rounded-2xl overflow-visible border border-slate-100 flex flex-col items-center p-4 pt-7 relative"
          style={{
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.10), 0 8px 20px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="absolute -top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-slate-100 rounded-full border border-slate-200"
            style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }}
          />
          <div
            className="relative w-full rounded-xl overflow-hidden mb-4 bg-slate-100"
            style={{
              aspectRatio: "3/4",
              transform: "translateZ(22px)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            <Image
              src={photoUrl || "/images/1688908285904.JPG"}
              alt="Profile"
              fill
              sizes="260px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="text-center" style={{ transform: "translateZ(16px)" }}>
            <h3 className="dm_serif_text text-2xl text-slate-800 uppercase tracking-widest leading-tight">
              {name}
            </h3>
          </div>
          <div
            className="flex justify-center gap-[3px] opacity-[0.18]"
            style={{ transform: "translateZ(10px)" }}
          >
            {[1, 2, 1, 3, 1, 2, 1, 2, 1, 1, 2].map((w, i) => (
              <div
                key={i}
                className="h-7 bg-slate-900 rounded-sm"
                style={{ width: w * 3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
