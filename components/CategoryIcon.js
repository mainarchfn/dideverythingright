import { CATEGORY_ICON_META, CATEGORY_LABELS } from "lib/constants";

export default function CategoryIcon({ category, decorative = true }) {
  const meta = CATEGORY_ICON_META[category] || { accent: "#0f5c43", title: `${CATEGORY_LABELS[category] || category} icon` };
  const label = CATEGORY_LABELS[category] || category;
  const common = {
    stroke: meta.accent,
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  return (
    <span className="category-icon-wrap">
      <svg
        className="category-icon"
        viewBox="0 0 24 24"
        role={decorative ? "presentation" : "img"}
        aria-hidden={decorative ? "true" : undefined}
        aria-label={decorative ? undefined : meta.title}
      >
        <circle cx="12" cy="12" r="11" fill="#ffffff" stroke={meta.accent} strokeWidth="1.4" />
        {category === "veterans" ? (
          <>
            <path d="M12 5.5L17 7.8V12.8C17 15.3 15.1 17.6 12 18.5C8.9 17.6 7 15.3 7 12.8V7.8L12 5.5Z" {...common} />
            <path d="M9.6 11.7L11.2 13.2L14.4 10" {...common} />
          </>
        ) : null}
        {category === "sudden-expenses" ? (
          <>
            <rect x="6.2" y="8" width="11.6" height="8.2" rx="1.8" {...common} fill="none" />
            <path d="M10.1 11.9H13.9" {...common} />
            <path d="M12 10.2V13.6" {...common} />
            <path d="M8 8V6.8C8 6 8.6 5.4 9.4 5.4H14.6C15.4 5.4 16 6 16 6.8V8" {...common} />
          </>
        ) : null}
        {category === "injuries" ? (
          <>
            <path d="M10 7.2V10H7.2V14H10V16.8H14V14H16.8V10H14V7.2H10Z" {...common} fill="none" />
            <path d="M6.8 18H17.2" {...common} />
          </>
        ) : null}
        {category === "health" ? (
          <>
            <path d="M12 17.2C8.7 15.2 6.6 12.9 6.6 10.4C6.6 8.7 7.9 7.4 9.6 7.4C10.6 7.4 11.4 7.9 12 8.8C12.6 7.9 13.4 7.4 14.4 7.4C16.1 7.4 17.4 8.7 17.4 10.4C17.4 12.9 15.3 15.2 12 17.2Z" {...common} fill="none" />
            <path d="M11 11.5H13" {...common} />
          </>
        ) : null}
        {category === "cancer" ? (
          <>
            <path d="M12 6.2C13.9 6.2 15.4 7.7 15.4 9.6C15.4 11.5 12.7 13.6 12 14.2C11.3 13.6 8.6 11.5 8.6 9.6C8.6 7.7 10.1 6.2 12 6.2Z" {...common} fill="none" />
            <path d="M12 14.2V18" {...common} />
            <path d="M10.5 16.4H13.5" {...common} />
          </>
        ) : null}
      </svg>
      {decorative ? null : <span className="sr-only">{label}</span>}
    </span>
  );
}
