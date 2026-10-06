"use client";
import { useEffect, useState } from "react";
export default function Reports() {
  const [type, setType] = useState("members");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");
  const [depts, setDepts] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  async function load() {
    const q = new URLSearchParams({ type, dept, status }).toString();
    setData(await (await fetch("/api/reports?" + q)).json());
  }
  useEffect(() => { fetch("/api/departments").then(r=>r.json()).then(setDepts); load(); }, []);
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Reports (Phase 7 local)</h1>
    <select value={type} onChange={e=>setType(e.target.value)} style={{padding:8}}><option value="members">Membership</option><option value="tasks">Tasks</option><option value="attendance">Attendance</option><option value="visitors">Visitors</option></select>
    <select value={dept} onChange={e=>setDept(e.target.value)} style={{marginLeft:8,padding:8}}><option value="">All departments</option>{depts.map(d=>(<option key={d.id} value={d.id}>{d.name}</option>))}</select>
    <input value={status} onChange={e=>setStatus(e.target.value)} placeholder="Status (e.g. Active)" style={{marginLeft:8,padding:8}} />
    <button onClick={load} style={{marginLeft:8,padding:"8px 12px"}}>Run</button>
    {data && (<div style={{marginTop:12}}><strong>{data.type}: {data.count}</strong><ul>{data.rows?.slice(0,20).map((r:any)=>(<li key={r.id}><small>{r.name || r.title || r.service || ("#"+r.id)}</small></li>))}</ul><small>Export PDF/Excel/CSV deferred per PRD.</small></div>)}
  </main>);
}