// Hand-illustrated invitation decor: bunting, pastel rainbow arches, hanging
// star-clouds and scattered stars. All ornamental → aria-hidden.

const BAND_COLORS = [
  "var(--color-rose)",
  "var(--color-blush)",
  "var(--color-gold)",
  "var(--color-lavender-deep)",
];

// A soft pastel rainbow made of concentric stroked arcs. Sits behind the photo.
export function RainbowArch({
  className = "",
  width = 260,
}: {
  className?: string;
  width?: number;
}) {
  const cx = 100;
  const cy = 100;
  const bands = BAND_COLORS;
  const stroke = 12;
  const gap = 2;
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 108"
      width={width}
      className={className}
      fill="none"
    >
      {bands.map((c, i) => {
        const r = 88 - i * (stroke + gap);
        return (
          <path
            key={i}
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            stroke={c}
            strokeWidth={stroke}
            strokeLinecap="round"
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}

// Triangle bunting flags on a gentle string.
export function Bunting({ className = "" }: { className?: string }) {
  const colors = [
    "var(--color-rose)",
    "var(--color-gold)",
    "var(--color-lavender-deep)",
    "var(--color-blush)",
  ];
  const flags = Array.from({ length: 11 });
  return (
    <svg
      aria-hidden
      viewBox="0 0 340 34"
      className={className}
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 8 Q170 26 340 8"
        stroke="var(--color-lavender-deep)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {flags.map((_, i) => {
        const x = 10 + i * 31;
        const y = 8 + Math.sin((i / (flags.length - 1)) * Math.PI) * 9;
        return (
          <polygon
            key={i}
            points={`${x - 9},${y} ${x + 9},${y} ${x},${y + 18}`}
            fill={colors[i % colors.length]}
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}

// A fluffy cloud with little stars dangling on threads.
export function HangingCloud({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 90"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
    >
      <g fill="#ffffff">
        <ellipse cx="60" cy="26" rx="34" ry="18" />
        <circle cx="38" cy="30" r="15" />
        <circle cx="82" cy="30" r="15" />
        <circle cx="60" cy="20" r="19" />
      </g>
      {[38, 60, 82].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1="40"
            x2={x}
            y2={58 + i * 6}
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d={`M ${x} ${58 + i * 6} l 2.2 4.5 4.8 .7 -3.5 3.4 .8 4.8 -4.3 -2.3 -4.3 2.3 .8 -4.8 -3.5 -3.4 4.8 -.7 z`}
            fill="var(--color-gold)"
          />
        </g>
      ))}
    </svg>
  );
}

const STARS = [
  { top: "9%", left: "10%", s: 16, d: "0s", c: "var(--color-rose)" },
  { top: "16%", left: "86%", s: 13, d: "0.5s", c: "var(--color-gold)" },
  { top: "30%", left: "6%", s: 12, d: "1s", c: "var(--color-gold)" },
  { top: "38%", left: "92%", s: 15, d: "0.3s", c: "var(--color-rose)" },
  { top: "54%", left: "9%", s: 11, d: "0.8s", c: "var(--color-lavender-deep)" },
  { top: "62%", left: "88%", s: 14, d: "1.2s", c: "var(--color-gold)" },
  { top: "78%", left: "12%", s: 13, d: "0.4s", c: "var(--color-rose)" },
  { top: "84%", left: "84%", s: 12, d: "0.9s", c: "var(--color-gold)" },
];

export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {STARS.map((st, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-sparkle absolute"
          style={{
            top: st.top,
            left: st.left,
            width: st.s,
            height: st.s,
            animationDelay: st.d,
            opacity: 0.7,
          }}
          fill="none"
        >
          <path
            d="M12 3l1.9 5.2L19 10l-5.1 1.8L12 17l-1.9-5.2L5 10l5.1-1.8L12 3z"
            fill={st.c}
            stroke={st.c}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
