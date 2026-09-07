// Avisa a IndexNow (Bing y motores asociados) que las URLs del sitio cambiaron.
// Correr DESPUÉS de cada deploy: npx -y tsx scripts/indexnow_ping.ts
// La key es pública por diseño del protocolo (vive en public/<key>.txt).

const HOST = "calcular.ar";
const KEY = "e5e9915303a94b3d813c05f8db32c819";

async function main() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length < 5) throw new Error(`sitemap sospechosamente corto: ${urls.length} URLs`);

  const ping = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  // 200 = ok, 202 = aceptado (key todavía no verificada): ambos cuentan como éxito.
  console.log(`IndexNow: HTTP ${ping.status} — ${urls.length} URLs enviadas`);
  if (ping.status !== 200 && ping.status !== 202) {
    console.error(await ping.text());
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("ERROR:", e.message ?? e);
  process.exit(1);
});
