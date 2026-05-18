"use client"

interface LogoProps {
  size?: number
  showText?: boolean
  textClassName?: string
}

export default function Logo({ size = 38, showText = true, textClassName = "" }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* SVG Icon — suspension bridge */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EduBridge logo icon"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
        </defs>

        {/* Rounded background */}
        <rect width="40" height="40" rx="10" fill="url(#bgGrad)" />

        {/* Road / deck */}
        <line x1="3" y1="31" x2="37" y2="31" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left tower */}
        <line x1="12" y1="31" x2="12" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left tower cap */}
        <line x1="9" y1="14" x2="15" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Right tower */}
        <line x1="28" y1="31" x2="28" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right tower cap */}
        <line x1="25" y1="14" x2="31" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Main suspension cable (catenary arch) */}
        <path d="M12 14 Q20 7 28 14" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Vertical suspender cables */}
        <line x1="16" y1="12.2" x2="16" y2="31" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="9.5" x2="20" y2="31" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="24" y1="12.2" x2="24" y2="31" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Small graduation cap above bridge (top-center) */}
        <polygon points="20,4 26,7 20,10 14,7" fill="rgba(255,255,255,0.9)" />
        <rect x="18" y="9.5" width="4" height="3" rx="0.5" fill="rgba(255,255,255,0.75)" />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className={`font-bold text-lg leading-none tracking-tight ${textClassName}`}>
          <span className="text-emerald-400">Edu</span>
          <span className="text-white">Bridge</span>
        </span>
      )}
    </div>
  )
}
