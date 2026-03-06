import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY_LABELS } from "lib/constants";

const STORAGE_KEY = "reader-preferences";

export function loadPreferences() {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function PreferencePicker({ onChange, compact = false, showHeading = true }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const existing = loadPreferences();
    setSelected(existing);
    onChange(existing);
  }, [onChange]);

  function toggle(category) {
    const next = selected.includes(category)
      ? selected.filter((item) => item !== category)
      : [...selected, category];

    setSelected(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    onChange(next);
  }

  return (
    <section aria-label="Personalize recommendations" className={compact ? "" : "panel"}>
      {showHeading ? <h2>{compact ? "Choose priority topics" : "Topics you want first"}</h2> : null}
      <p>Select the topics that matter most right now. Saved only on this device.</p>
      <div className="chip-grid">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${selected.includes(category) ? "active" : ""}`}
            onClick={() => toggle(category)}
            aria-pressed={selected.includes(category)}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </section>
  );
}
