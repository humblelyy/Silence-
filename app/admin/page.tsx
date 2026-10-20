import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Admin access', robots: { index: false, follow: false } };
export default function AdminPage() {
  return <main className="admin-page"><Link className="detail-back" href="/">← Back to portfolio</Link><div className="admin-panel"><div className="admin-icon">S.</div><p className="eyebrow">RESTRICTED AREA</p><h1>SILENCE Studio</h1><p>The secure admin dashboard is planned for the Supabase integration phase. It is intentionally not exposed as an unprotected demo login in this first build.</p><div className="admin-notice"><strong>Admin setup required</strong><span>Configure Supabase Auth, database policies and the three-account limit before enabling administrator access.</span></div><Link className="button button--primary" href="/">Return to website</Link></div></main>;
}
