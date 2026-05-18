"use client"

interface LogoProps {
  size?: number
  showText?: boolean
  textClassName?: string
}

export default function Logo({ size = 96 }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Vision Edge"
      style={{
        height: size,
        width: 'auto',
        maskImage: 'radial-gradient(ellipse 80% 78% at 50% 48%, black 42%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 78% at 50% 48%, black 42%, transparent 100%)',
      }}
      className="object-contain"
    />
  )
}
