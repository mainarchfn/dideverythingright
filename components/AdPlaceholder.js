export default function AdPlaceholder({ label = "Sponsored Spot" }) {
  return (
    <aside className="ad-placeholder" role="complementary" aria-label="Advertisement placeholder">
      <span className="ad-tag">Ad</span>
      <p>{label}</p>
    </aside>
  );
}
