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
                  <Link href="/subscribe">Membership</Link>
                </li>
                <li>
                  <Link href="/admin">Writer CMS</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>Private, practical guidance for retirees. Educational content only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
