"use client";
import { useEffect, useState } from "react";
export default function Tasks() {
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("All");
  async function load() { setList(await (await fetch("/api/tasks")).json()); }
  useEffect(() => { load(); }, []);
  async function add() {
    if (!title.trim()) { alert("Enter a title"); return; }
    await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: title.trim(), owner: owner || null, dueDate: due || null }) });
    setTitle(""); setOwner(""); setDue(""); load();
  }
  const shown = list.filter(t => filter === "All" ? true : (t.computed === filter));
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Tasks & Accountability (Phase 5 local)</h1>
    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" style={{padding:8}} />
    <input value={owner} onChange={e=>setOwner(e.target.value)} placeholder="Owner" style={{marginLeft:8,padding:8}} />
    <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{marginLeft:8,padding:8}} />
    <button onClick={add} style={{marginLeft:8,padding:"8px 12px"}}>Add</button>
    <div style={{marginTop:8}}>{["All","Not Started","In Progress","Completed","Overdue","Cancelled"].map(f=>(<button key={f} onClick={()=>setFilter(f)} style={{marginRight:6,fontWeight:filter===f?"bold":undefined}}>{f}</button>))}</div>
    <ul>{shown.map(t=>(<li key={t.id} style={{marginTop:8}}>{t.title} <small>({t.computed} • {t.priority} • {t.owner || "unassigned"} • {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "no due"})</small><button style={{marginLeft:8}} onClick={async()=>{await fetch("/api/tasks",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t.id,status:"In Progress"})});load();}}>Start</button><button style={{marginLeft:4}} onClick={async()=>{await fetch("/api/tasks",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t.id,status:"Completed"})});load();}}>Complete</button></li>))}</ul>
  </main>);
}