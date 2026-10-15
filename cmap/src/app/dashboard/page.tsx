"use client";
import { apiFetch } from "@/lib/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ACTIONS = [
  ["Add member", "/members", "Register someone new"],
  ["Record attendance", "/attendance", "Mark a service"],
  ["Create task", "/tasks", "Assign responsibility"],
  ["Create event", "/events", "Schedule an activity"],
];

type DashboardData = {
  members: number; visitors: number; attendance: number; upcomingEvents: number;
  pending: number; overdue: number; followUps: number;
};

export default function Dashboard() {
  const [d, setD] = useState<DashboardData | null>(null);
  useEffect(() => { apiFetch("/api/dashboard").then(r=>r.json()).then(setD); }, []);
  if (!d) return <main style={{padding:24}}>Loading…</main>;
  const cards: Array<[string, number]> = [["Members",d.members],["Visitors",d.visitors],["Attendance (recent)",d.attendance],["Upcoming events",d.upcomingEvents],["Pending tasks",d.pending],["Overdue tasks",d.overdue],["Pending follow-ups",d.followUps]];
  const empty = cards.every(([,v]) => !v);
  return (<main style={{padding:24,fontFamily:"system-ui",maxWidth:1100,margin:"0 auto"}}>
    <div className="app-topbar">
      <div>
        <h1 style={{margin:0}}>Dashboard</h1>
        <p style={{margin:"4px 0 0",color:"#4b5563",fontSize:14}}>Pending work, upcoming events, and follow-ups at a glance.</p>
      </div>
      <div style={{display:"flex",gap:10}}>
        <Link href="/" style={{padding:"8px 14px",color:"#4b5563",fontSize:14}}>← Home</Link>
        <button onClick={()=>signOut({callbackUrl:"/"})} style={{padding:"8px 14px",borderRadius:8,border:"1px solid #e5e7eb",background:"#fff"}}>Sign out</button>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginTop:16}}>{cards.map(([k,v])=>(<div key={k} style={{border:"1px solid #e5e7eb",borderRadius:10,padding:12}}><strong style={{fontSize:24,color:"#B91C1C"}}>{v ?? 0}</strong><div><small style={{color:"#4b5563"}}>{k}</small></div></div>))}</div>
    {empty && (<div className="app-empty">No records yet. Start by adding your first member below — every number on this page comes straight from your records.</div>)}
    <h2 style={{fontSize:17,margin:"20px 0 0"}}>Quick actions</h2>
    <div className="app-grid-actions">{ACTIONS.map(([label,href,sub])=>(<Link key={href+label} href={href} className="app-action">{label}<div style={{fontWeight:400,fontSize:12,color:"#6b7280"}}>{sub}</div></Link>))}</div>
    <nav style={{display:"flex",gap:12,marginTop:16,flexWrap:"wrap",fontSize:14}}><Link href="/visitors">Visitors</Link><Link href="/departments">Departments</Link><Link href="/reports">Reports</Link></nav>
  </main>);
}
