import Link from "next/link";
import Layout from "components/Layout";

const plans = [
  {
    tier: "Free",
    price: "$0",
    cadence: "Always free",
    features: [
      "Access to all public guidance articles",
      "Category pages with urgent-date alerts",
      "Free weekly newsletter"
    ]
  },
  {
    tier: "Monthly Membership",
    price: "$12",
    cadence: "per month after 30-day free start",
    features: [
      "Printable call scripts and appointment templates",
      "Member-only toolkits and guided planners",
      "Priority updates on filing and enrollment deadlines",
      "Download-ready checklists for families and caregivers"
    ]
  }
];

export default function MembershipPage() {
  return (
    <Layout title="Membership | Did Everything Right" description="Compare free and paid membership plans.">
      <section className="container stack">
        <header className="panel membership-panel stack">
          <p className="eyebrow">Membership</p>
          <h1>Deeper support when timing and decisions are critical</h1>
          <p>
            Use membership when you need stronger structure, faster action plans, and premium templates for high-stress moments.
          </p>
          <div className="hero-actions">
            <a href="#plan-compare" className="button-link cta-membership">Compare plans</a>
            <Link href="/newsletter" className="button-link cta-newsletter">Get free weekly updates</Link>
          </div>
        </header>

        <section id="plan-compare" className="plan-compare panel stack" aria-label="Free and paid plan comparison">
          <h2>Plan comparison</h2>
          <div className="plan-grid" role="list">
            {plans.map((plan) => (
              <article className="plan-card" key={plan.tier} role="listitem">
                <h3>{plan.tier}</h3>
                <p className="plan-price">{plan.price}</p>
                <p className="small-note">{plan.cadence}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {plan.tier === "Monthly Membership" ? (
                  <button type="button" className="cta-membership">Start 30-day free period</button>
                ) : (
                  <Link href="/newsletter" className="button-link cta-newsletter">Keep using free</Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
}
