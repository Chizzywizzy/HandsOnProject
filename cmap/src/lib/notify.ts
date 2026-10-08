export async function notifyTelegram(text: string) {
  const tok = process.env.TG_TOKEN, chat = process.env.TG_CHAT_ID;
  if (!tok || !chat) { console.log("[notify:telegram:skip]", text); return { skipped: true }; }
  const r = await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chat, text }) });
  return r.json();
}