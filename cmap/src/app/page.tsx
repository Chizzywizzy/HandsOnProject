import Link from "next/link";
const mods = [["Members","Profiles, departments, photos"],["Visitors","Follow-up, overdue, convert"],["Attendance","Sessions, QR check-in"],["Departments","Ministries, cells"],["Events","Maps + Calendar sync"],["Tasks","Overdue, recurring"],["Dashboard","Live totals"],["Reports","CSV/PDF export"]];
export default function Home() {
  return (<main style={{fontFamily:"Georgia,system-ui",margin:0,background:"#fff"}}>
    <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px",maxWidth:1100,margin:"0 auto",fontFamily:"system-ui"}}><strong>CMAP</strong><div style={{display:"flex",gap:16}}><span>Features</span><span>Mission</span><span>FAQ</span></div><div style={{display:"flex",gap:10}}><Link href="/login" style={{padding:"8px 16px"}}>Log In</Link><Link href="/dashboard" style={{background:"#0F2D8A",color:"#fff",padding:"8px 16px",borderRadius:8}}>Start Locally</Link></div></nav>
    <header style={{maxWidth:1100,margin:"0 auto",padding:"24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,alignItems:"center"}}>
      <div>
        <h1 style={{fontSize:56,lineHeight:1.05,margin:0}}>Building Trust.<br/>Strengthening Community.</h1>
        <p style={{color:"#4b5563",fontFamily:"system-ui"}}>A digital platform that combines church management and operational accountabilty  for the modern church.</p>
        <div style={{display:"flex",gap:12,marginTop:16}}><Link href="/members" style={{background:"#14b8a6",color:"#fff",padding:"12px 22px",borderRadius:12,fontFamily:"system-ui"}}>Get Started</Link><Link href="/dashboard" style={{border:"1px solid #e5e7eb",padding:"12px 22px",borderRadius:12,fontFamily:"system-ui"}}>▶ View Dashboard</Link></div>
        <p><small style={{color:"#6b7280"}}>Faith. Community. Administration & Accountability.</small></p>
      </div>
      <div style={{display:"grid",gap:12,fontFamily:"system-ui"}}>
        <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:16}}><small>Leadership Trust</small><div style={{width:90,height:90,borderRadius:"50%",background:"conic-gradient(#14b8a6 0 94%, #e5e7eb 94% 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}><strong>94%</strong></div></div>
        <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:16}}><small>Accountability check-ins complete</small><div>✓ Follow-ups • ✓ Tasks • ✓ Attendance</div></div>
        <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:16}}><small>Engagement & Progress</small><svg width="200" height="40"><polyline points="0,30 40,20 80,25 120,10 160,15 200,5" fill="none" stroke="#14b8a6" strokeWidth="3"/></svg></div>
      </div>
    </header>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"0 24px 32px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,fontFamily:"system-ui"}}>{mods.map(([t,d])=>(<div key={t} style={{border:"1px solid #e5e7eb",borderRadius:12,padding:16}}><strong>{t}</strong><div><small style={{color:"#6b7280"}}>{d}</small></div></div>))}</section>
  </main>);
}