"use client";
import { useEffect, useState } from "react";
export default function Attendance() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [service, setService] = useState("Sunday Service");
  const [sid, setSid] = useState("");
  const [present, setPresent] = useState<Record<number, boolean>>({});
  async function load() {
    setSessions(await (await fetch("/api/sessions")).json());
    setMembers(await (await fetch("/api/members")).json());
  }
  useEffect(() => { load(); }, []);
  async function create() {
    const r = await fetch("/api/sessions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service }) });
    const s = await r.json(); setSid(String(s.id)); load();
  }
  async function save() {
    const records = members.map(m => ({ memberId: m.id, present: present[m.id] ?? true }));
    await fetch("/api/attendance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: Number(sid), records }) });
    alert("Saved " + records.filter(r=>r.present).length + " present"); load();
  }
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Attendance (Phase 3 local)</h1>
    <input value={service} onChange={e=>setService(e.target.value)} style={{padding:8}} />
    <button onClick={create} style={{marginLeft:8,padding:"8px 12px"}}>New session</button>
    <select value={sid} onChange={e=>setSid(e.target.value)} style={{marginLeft:8,padding:8}}><option value="">Select session</option>{sessions.map(s=>(<option key={s.id} value={s.id}>{s.service} • {new Date(s.date).toLocaleDateString()} • {s.records?.filter((r:any)=>r.present).length ?? 0} present</option>))}</select>
    {sid && (<div style={{marginTop:12}}>{members.map(m=>(<label key={m.id} style={{display:"block"}}><input type="checkbox" checked={present[m.id] ?? true} onChange={e=>setPresent(p=>({...p,[m.id]:e.target.checked}))} /> {m.name}</label>))}<button onClick={save} style={{marginTop:8,padding:"8px 12px"}}>Save attendance</button></div>)}
  </main>);
}