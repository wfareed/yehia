"use client"

interface LogoProps {
  size?: number
  showText?: boolean
  textClassName?: string
}

export default function Logo({ size = 38, showText = true, textClassName = "" }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* SVG Icon — stylised eye representing Vision + sharp geometric edge */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Vision Edge logo icon"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="irisGrad" x1="14" y1="14" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d1fae5" />
            <stop offset="1" stopColor="#a7f3d0" />
          </linearGradient>
        </defs>

        {/* Rounded background */}
        <rect width="40" height="40" rx="10" fill="url(#bgGrad)" />

        {/* Outer eye / almond shape */}
        <path
          d="M4,20 Q12,9 20,9 Q28,9 36,20 Q28,31 20,31 Q12,31 4,20 Z"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />

        {/* Iris */}
        <circle cx="20" cy="20" r="6.5" fill="url(#irisGrad)" />

        {/* Pupil */}
        <circle cx="20" cy="20" r="3.2" fill="#064e3b" />

        {/* Highlight glint */}
        <circle cx="17.8" cy="17.8" r="1.3" fill="white" opacity="0.85" />

        {/* Left edge accent line */}
        <line x1="2" y1="20" x2="5" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        {/* Right edge accent line */}
        <line x1="35" y1="20" x2="38" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />

        {/* Top-right small spark / edge mark */}
        <line x1="29" y1="11" x2="32" y2="8" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        <line x1="31" y1="13" x2="35" y2="11" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className={`font-bold text-lg leading-none tracking-tight ${textClassName}`}>
          <span className="text-emerald-400">Vision</span>
          <span className="text-white"> Edge</span>
        </span>
      )}
    </div>
  )
}
