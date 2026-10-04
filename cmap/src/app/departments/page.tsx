"use client";
import { useEffect, useState } from "react";
export default function Departments() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  async function load() { setList(await (await fetch("/api/departments")).json()); }
  useEffect(() => { load(); }, []);
  async function add() {
    if (!name.trim()) { alert("Enter a name first"); return; }
    await fetch("/api/departments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim() }) });
    setName(""); load();
  }
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Departments (Phase 1 local)</h1>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Choir" style={{padding:8}} />
    <button onClick={add} style={{marginLeft:8,padding:"8px 12px"}}>Add</button>
    <ul>{list.map(d=>(<li key={d.id}>{d.name} <small>({d._count?.members ?? 0} members)</small></li>))}</ul>
  </main>);
}