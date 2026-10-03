"use client";
import { useEffect, useState } from "react";
export default function Members() {
  const [list, setList] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  async function load() {
    const r = await fetch("/api/members" + (q ? `?q=${encodeURIComponent(q)}` : ""));
    setList(await r.json());
  }
  useEffect(() => { load(); }, []);
  async function add() {
    if (!name.trim()) { alert("Enter a name first"); return; }
    await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim() }) });
    setName(""); load();
  }
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Members (Phase 1 local)</h1>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="search" style={{padding:8}} />
    <button onClick={load} style={{marginLeft:8,padding:"8px 12px"}}>Search</button>
    <div style={{marginTop:12}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{padding:8}} />
      <button onClick={add} style={{marginLeft:8,padding:"8px 12px"}}>Add member</button>
    </div>
    <ul>{list.map(m=>(<li key={m.id}>{m.name} <small>({m.status})</small><button style={{marginLeft:8}} onClick={async()=>{await fetch("/api/members",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:m.id})});load();}}>Archive</button></li>))}</ul>
  </main>);
}