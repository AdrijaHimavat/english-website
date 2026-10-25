import Link from "next/link";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Grow Me home"
    >
      <svg
        width="35"
        height="39"
        viewBox="0 0 35 39"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17 36V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 25C3 26 3 12 3 12c13-1 16 7 13 13ZM18 18C17 4 32 5 32 5c0 13-8 16-14 13Z"
          fill="currentColor"
        />
      </svg>
      <span>
        grow me<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
