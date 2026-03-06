import Layout from "components/Layout";

export default function SubscribePage() {
  return (
    <Layout title="Subscribe | Did Everything Right" description="Weekly retirement guidance and gentle reminders.">
      <section className="container stack">
        <h1>Stay informed without noise</h1>
        <p>
          Get one concise email each week with practical retirement guidance and plain-language checklists.
        </p>
        <form className="panel stack" aria-label="Subscription form">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="you@example.com" required />
          <button type="submit">Start free subscription</button>
          <p className="small-note">No payment setup in v1. This flow is a placeholder for monetization.</p>
        </form>
      </section>
    </Layout>
  );
}
