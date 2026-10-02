"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("ned.uz07@gmail.com");
  const [password, setPassword] = useState("Admin123!");
  return (<main style={{padding:24,fontFamily:"system-ui"}}>
    <h1>CMAP Local Login</h1>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" style={{display:"block",margin:"8px 0",padding:8}} />
    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" style={{display:"block",margin:"8px 0",padding:8}} />
    <button onClick={()=>signIn("credentials",{email,password,callbackUrl:"/"})} style={{padding:"8px 16px"}}>Sign in locally</button>
  </main>);
}