import { cn } from "@/lib/cn";

interface MidasGuideMarkProps {
  className?: string;
}

export default function MidasGuideMark({ className }: MidasGuideMarkProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48" cy="48" r="44" fill="#330072" />
      <circle
        cx="48"
        cy="48"
        r="38"
        fill="url(#midas-gold)"
        stroke="#FFF6D5"
        strokeWidth="2"
      />
      <path
        d="M29 31.5L41.5 27L60 32.5L71 26L66.5 39L74 48L66.5 56.5L70.5 70L58 64L45 69L33 62L26.5 49L31 40.5L29 31.5Z"
        fill="#3F0D83"
      />
      <path
        d="M39.5 38L54.5 34L62 38.5L55 44.5L57.5 52L49.5 56.5L41.5 52.5L38 44.5L39.5 38Z"
        fill="#FFF6D5"
      />
      <path
        d="M48.5 34.5L55.5 44L70 35L62 50L69.5 58L55.5 56.5L50.5 70L45 58.5L29 61L38 49L30.5 40.5L43.5 41L48.5 34.5Z"
        fill="#F5A800"
      />
      <path
        d="M46 42L54 45L50.5 48.5L53 54L46 51.5L41 57L42.5 49L36 46L43 44L46 42Z"
        fill="#330072"
      />
      <circle cx="58.5" cy="41.5" r="2.2" fill="#330072" />
      <defs>
        <linearGradient
          id="midas-gold"
          x1="16"
          y1="10"
          x2="78"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE184" />
          <stop offset="0.5" stopColor="#F5BE41" />
          <stop offset="1" stopColor="#D69200" />
        </linearGradient>
      </defs>
    </svg>
  );
}
