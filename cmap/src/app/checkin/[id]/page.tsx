"use client";
import { use, useEffect, useState } from "react";
export default function Checkin({ params }: any) {
  const { id } = use(params as Promise<{ id: string }>);
  const [members, setMembers] = useState<any[]>([]);
  const [mid, setMid] = useState("");
  useEffect(() => { fetch("/api/members").then(r=>r.json()).then(setMembers); }, []);
  async function go() {
    if (!mid) { alert("Select your name"); return; }
    await fetch("/api/attendance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: Number(id), records: [{ memberId: Number(mid), present: true }] }) });
    alert("Checked in!");
  }
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Check-in session {id}</h1>
    <select value={mid} onChange={e=>setMid(e.target.value)} style={{padding:8}}><option value="">Select your name</option>{members.map(m=>(<option key={m.id} value={m.id}>{m.name}</option>))}</select>
    <button onClick={go} style={{marginLeft:8,padding:"8px 12px"}}>Check in</button>
  </main>);
}