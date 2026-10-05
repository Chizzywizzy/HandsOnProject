"use client";
import { useEffect, useState } from "react";
export default function Visitors() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [due, setDue] = useState("");
  async function load() { setList(await (await fetch("/api/visitors")).json()); }
  useEffect(() => { load(); }, []);
  async function add() {
    if (!name.trim()) { alert("Enter a name first"); return; }
    await fetch("/api/visitors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim() }) });
    setName(""); load();
  }
  async function follow(id: number) {
    await fetch("/api/followups", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId: id, assignee: assignee || null, dueDate: due || null }) });
    setAssignee(""); setDue(""); load();
  }
  async function convert(id: number) {
    await fetch("/api/visitors", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, convert: true }) });
    alert("Converted to member"); load();
  }
  const overdue = (d: any) => d && new Date(d) < new Date() ? { color: "red", fontWeight: 700 } : {};
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Visitors & Follow-up (Phase 2 local)</h1>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Visitor name" style={{padding:8}} />
    <button onClick={add} style={{marginLeft:8,padding:"8px 12px"}}>Register</button>
    <div style={{marginTop:12}}>
      <input value={assignee} onChange={e=>setAssignee(e.target.value)} placeholder="Assignee" style={{padding:8}} />
      <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{marginLeft:8,padding:8}} />
    </div>
    <ul>{list.map(v=>(<li key={v.id} style={{marginTop:12}}>{v.name} <button style={{marginLeft:8}} onClick={()=>follow(v.id)}>Assign follow-up</button><button style={{marginLeft:8}} onClick={()=>convert(v.id)}>Convert to member</button><ul>{v.followUps?.map((f:any)=>(<li key={f.id} style={overdue(f.dueDate)}>{f.status} • {f.assignee || "unassigned"} • {f.dueDate ? new Date(f.dueDate).toLocaleDateString() : "no due"} {f.outcome ? `• ${f.outcome}` : ""}</li>))}</ul></li>))}</ul>
  </main>);
}