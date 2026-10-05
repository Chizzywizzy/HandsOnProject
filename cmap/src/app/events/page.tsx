"use client";
import { useEffect, useState } from "react";
export default function Events() {
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  async function load() { setList(await (await fetch("/api/events")).json()); }
  useEffect(() => { load(); }, []);
  async function add() {
    if (!title.trim()) { alert("Enter a title"); return; }
    await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: title.trim() }) });
    setTitle(""); load();
  }
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Events (Phase 4 local)</h1>
    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Event title" style={{padding:8}} />
    <button onClick={add} style={{marginLeft:8,padding:"8px 12px"}}>Create</button>
    <ul>{list.map(e=>(<li key={e.id} style={{marginTop:12}}>{e.title} <small>({e.status} • {new Date(e.date).toLocaleDateString()} • {e.attendees?.length ?? 0} attending)</small><button style={{marginLeft:8}} onClick={async()=>{await fetch("/api/events",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.id,op:"attend",name:"Walk-in"})});load();}}>+ Walk-in</button><div><input value={note} onChange={ev=>setNote(ev.target.value)} placeholder="Note" style={{padding:6,marginTop:6}} /><button style={{marginLeft:8}} onClick={async()=>{if(!note.trim())return;await fetch("/api/events",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.id,op:"note",text:note})});setNote("");load();}}>Add note</button></div><ul>{e.notes?.map((n:any)=>(<li key={n.id}><small>{n.text}</small></li>))}</ul></li>))}</ul>
  </main>);
}