import Link from "next/link";
import { CATEGORY_LABELS } from "lib/constants";

export default function CategoryPill({ category }) {
  const label = CATEGORY_LABELS[category] || category;

  return (
    <Link className="category-pill" href={`/category/${category}`}>
      {label}
    </Link>
  );
}
