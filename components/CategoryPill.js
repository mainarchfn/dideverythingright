import Link from "next/link";
import { CATEGORY_LABELS } from "lib/constants";
import CategoryIcon from "components/CategoryIcon";

export default function CategoryPill({ category }) {
  const label = CATEGORY_LABELS[category] || category;

  return (
    <Link className="category-pill" href={`/category/${category}`}>
      <CategoryIcon category={category} />
      {label}
    </Link>
  );
}
