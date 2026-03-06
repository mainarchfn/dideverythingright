import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title || "Did Everything Right"}</title>
        <meta name="description" content={description || "Clear retirement guidance for real life moments."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="site-shell">
        <header className="site-header">
          <div className="container nav-row">
            <Link href="/" className="brand">
              <img src="/logo-mark.svg" alt="" aria-hidden="true" className="brand-logo" />
              <span className="brand-copy">
                <strong>Did Everything Right</strong>
                <small>Trusted retirement companion</small>
              </span>
            </Link>
            <nav aria-label="Main">
              <ul className="nav-list">
                <li>
                  <Link href="/#categories">Categories</Link>
                </li>
                <li>
                  <Link href="/membership">Membership</Link>
                </li>
                <li>
                  <Link href="/newsletter">Newsletter</Link>
                </li>
                <li>
                  <Link href="/admin">Content CMS</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer" aria-labelledby="footer-heading">
          <div className="container footer-shell">
            <section className="footer-brand stack" aria-label="Site description">
              <h2 id="footer-heading">Did Everything Right</h2>
              <p>Private, practical guidance for retirees. Educational content only.</p>
            </section>

            <nav className="footer-nav" aria-label="Footer">
              <h3>Explore</h3>
              <ul>
                <li>
                  <Link href="/#categories">Categories</Link>
                </li>
                <li>
                  <Link href="/membership">Membership</Link>
                </li>
                <li>
                  <Link href="/newsletter">Newsletter</Link>
                </li>
              </ul>
            </nav>

            <nav className="footer-nav" aria-label="Category links">
              <h3>Top Categories</h3>
              <ul>
                <li>
                  <Link href="/category/veterans">Veterans</Link>
                </li>
                <li>
                  <Link href="/category/sudden-expenses">Sudden Expenses</Link>
                </li>
                <li>
                  <Link href="/category/health">Health</Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
