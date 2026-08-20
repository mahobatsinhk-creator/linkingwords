import type { TrustStat } from "@/lib/content/home";

type TrustStripProps = {
  stats: TrustStat[];
};

function StatIcon({ type }: { type: TrustStat["icon"] }) {
  switch (type) {
    case "badge":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="lw-trust__icon">
          <path
            d="M16 3.5 19.2 10l7 .9-5.2 4.8 1.4 6.8L16 19.6 9.6 22.5l1.4-6.8L5.8 10.9l7-.9L16 3.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "graduate":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="lw-trust__icon">
          <path
            d="M4 13.5 16 7l12 6.5L16 20 4 13.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 16v5.2c0 1.6 3.4 3.3 7.5 3.3s7.5-1.7 7.5-3.3V16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M28 13.5V20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="lw-trust__icon">
          <path
            d="M5 12.5 16 7l11 5.5L16 18 5 12.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M5 17.5 16 23l11-5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M5 22 16 27.5 27 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" className="lw-trust__icon">
          <circle
            cx="16"
            cy="10"
            r="3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="8.5"
            cy="12"
            r="2.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="23.5"
            cy="12"
            r="2.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M9.5 24c0-3.4 2.8-5.5 6.5-5.5s6.5 2.1 6.5 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M5 23.5c.4-2.2 2-3.6 4.2-3.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M27 23.5c-.4-2.2-2-3.6-4.2-3.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Dark teal credentials strip — confirmed live-site stats only.
 */
export function TrustStrip({ stats }: TrustStripProps) {
  return (
    <section className="lw-trust" aria-label="Credentials and approach">
      <div className="lw-trust__inner">
        <ul className="lw-trust__list">
          {stats.map((stat) => (
            <li key={stat.id} className="lw-trust__item">
              <StatIcon type={stat.icon} />
              <div className="lw-trust__text">
                <p className="lw-trust__label">{stat.label}</p>
                {stat.detail ? (
                  <p className="lw-trust__detail">{stat.detail}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
