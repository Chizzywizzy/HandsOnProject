import Link from "next/link";
export default function Home() {
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>CMAP — Local MVP (Phase 0 done)</h1>
    <p>App + DB + Auth all run locally. Roles: Super Admin, Pastor/Leader, Dept/Group Leaders, Staff, Volunteer, Member.</p>
    <nav style={{display:"flex",gap:12}}>
      <Link href="/login">Login</Link>
      <Link href="/api/auth/signout">Sign out</Link>
    </nav>
    <ul><li>Members — next (Phase 1)</li><li>Visitors, Attendance, Events, Tasks, Dashboard, Reports — later</li></ul>
  </main>);
}