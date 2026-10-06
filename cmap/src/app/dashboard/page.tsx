"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [d, setD] = useState<any>(null);
  useEffect(() => { fetch("/api/dashboard").then(r=>r.json()).then(setD); }, []);
  if (!d) return <main style={{padding:24}}>Loading…</main>;
  const cards = [["Members",d.members],["Visitors",d.visitors],["Attendance (recent)",d.attendance],["Upcoming events",d.upcomingEvents],["Pending tasks",d.pending],["Overdue tasks",d.overdue],["Pending follow-ups",d.followUps]];
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Dashboard (Phase 6 local)</h1>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>{cards.map(([k,v]:any)=>(<div key={k} style={{border:"1px solid #e5e7eb",borderRadius:10,padding:12}}><strong style={{fontSize:24,color:"#B91C1C"}}>{v}</strong><div><small>{k}</small></div></div>))}</div>
    <nav style={{display:"flex",gap:12,marginTop:16}}><Link href="/members">Add member</Link><Link href="/attendance">Record attendance</Link><Link href="/tasks">Create task</Link><Link href="/events">Create event</Link></nav>
  </main>);
}