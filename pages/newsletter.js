import Link from "next/link";
import Layout from "components/Layout";

export default function NewsletterPage() {
  return (
    <Layout title="Newsletter | Did Everything Right" description="Weekly retirement guidance and practical reminders.">
      <section className="container stack">
        <h1>Stay informed without noise</h1>
        <p>
          Get one concise email each week with practical retirement guidance, deadlines, and plain-language checklists.
        </p>
        <form className="panel stack" aria-label="Newsletter signup form">
          <label htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" placeholder="you@example.com" required />
          <button className="cta-newsletter" type="submit">Join free newsletter</button>
          <p className="small-note">No spam. Unsubscribe anytime.</p>
        </form>
        <p className="small-note">
          Want premium templates and advanced decision tools? <Link href="/membership">View membership plans</Link>.
        </p>
      </section>
    </Layout>
  );
}
