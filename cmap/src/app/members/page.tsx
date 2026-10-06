"use client";
import { useEffect, useState } from "react";
export default function Members() {
  const [list, setList] = useState<any[]>([]);
  const [depts, setDepts] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [deptId, setDeptId] = useState("");
  async function load() {
    const r = await fetch("/api/members" + (q ? `?q=${encodeURIComponent(q)}` : ""));
    setList(await r.json());
    setDepts(await (await fetch("/api/departments")).json());
  }
  useEffect(() => { load(); }, []);
  async function add() {
    if (!name.trim()) { alert("Enter a name first"); return; }
    await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), departmentId: deptId || null, photoUrl: (window as any).__photo || null }) });
    setName(""); setDeptId(""); (window as any).__photo = null; load();
  }
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>Members (Phase 1 local)</h1>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="search" style={{padding:8}} />
    <button onClick={load} style={{marginLeft:8,padding:"8px 12px"}}>Search</button>
    <div style={{marginTop:12}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{padding:8}} />
      <select value={deptId} onChange={e=>setDeptId(e.target.value)} style={{marginLeft:8,padding:8}}>
        <option value="">No department</option>
        {depts.map(d=>(<option key={d.id} value={d.id}>{d.name}</option>))}
      </select>
      <input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const fd=new FormData();fd.append("file",f);const r=await fetch("/api/uploads",{method:"POST",body:fd});const j=await r.json();(window as any).__photo=j.url;alert("Photo staged");}} style={{marginLeft:8}} />
      <button onClick={add} style={{marginLeft:8,padding:"8px 12px"}}>Add member</button>
    </div>
    <ul>{list.map(m=>(<li key={m.id}>{m.photoUrl ? <img src={m.photoUrl} width={28} height={28} style={{borderRadius:"50%",marginRight:6}} /> : null}{m.name} <small>({m.status}{m.department ? ` • ${m.department.name}` : ""})</small><select value={m.departmentId ?? ""} onChange={async e=>{await fetch("/api/members",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:m.id,departmentId:e.target.value||null})});load();}} style={{marginLeft:8}}><option value="">No dept</option>{depts.map(d=>(<option key={d.id} value={d.id}>{d.name}</option>))}</select><button style={{marginLeft:8}} onClick={async()=>{await fetch("/api/members",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:m.id,archived:true})});load();}}>Archive</button></li>))}</ul>
  </main>);
}