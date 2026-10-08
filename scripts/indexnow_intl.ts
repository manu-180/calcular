// Avisa a IndexNow (Bing, Yandex, Seznam, Naver) que las URLs de calcularya.com cambiaron. Es el
// par de scripts/indexnow_ping.ts (calcular.ar) con su propia key: IndexNow va por host (ADR 0001, D6).
//
//   npx -y tsx scripts/indexnow_intl.ts               todas las URLs de los sitemaps publicados
//   npx -y tsx scripts/indexnow_intl.ts --desde 2026-10-07   solo las que tienen lastmod >= esa fecha
//   npx -y tsx scripts/indexnow_intl.ts --dry         lista lo que mandaría y no manda nada
//
// Correr después de un deploy de producción que cambie datos o sume páginas. La key es pública por
// diseño del protocolo y vive en public/<key>.txt, que el host intl sirve tal cual (public/ pasa
// antes que los rewrites de fallback). Lee el sitemap publicado y no el registro local: así avisa
// solo lo que de verdad está en línea.

export {};

const ORIGEN = (process.env.NEXT_PUBLIC_SITIO_INTL_URL || "https://calcularya.com").replace(/\/$/, "");
const KEY = "673f564f0ae5b2f0f7b7c23279f1d538";
const LOTE = 10_000;

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const iDesde = args.indexOf("--desde");
const desde = iDesde >= 0 ? args[iDesde + 1] : undefined;

async function leer(url: string): Promise<string> {
  const r = await fetch(url, { redirect: "manual" });
  if (r.status !== 200) throw new Error(`${url}: HTTP ${r.status}`);
  return r.text();
}

const entradas = (xml: string) =>
  [...xml.matchAll(/<(?:url|sitemap)>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ loc: m[1], lastmod: m[2] }));

async function main() {
  if (desde && !/^\d{4}-\d{2}-\d{2}$/.test(desde)) throw new Error("--desde va con una fecha AAAA-MM-DD");
  const host = new URL(ORIGEN).host;
  const key = (await leer(`${ORIGEN}/${KEY}.txt`)).trim();
  if (key !== KEY) throw new Error(`${ORIGEN}/${KEY}.txt no tiene la key (¿se publicó public/${KEY}.txt?)`);

  const urls: string[] = [];
  for (const hijo of entradas(await leer(`${ORIGEN}/sitemap.xml`))) {
    for (const e of entradas(await leer(hijo.loc))) {
      if (!e.loc.startsWith(`${ORIGEN}/`) && e.loc !== ORIGEN) throw new Error(`el sitemap lista una URL de otro host: ${e.loc}`);
      if (!desde || !e.lastmod || e.lastmod >= desde) urls.push(e.loc);
    }
  }
  if (!urls.length) {
    console.log("IndexNow: nada para avisar");
    return;
  }
  if (dry) {
    for (const u of urls) console.log(u);
    console.log(`IndexNow (dry): ${urls.length} URLs de ${host}`);
    return;
  }
  for (let i = 0; i < urls.length; i += LOTE) {
    const lote = urls.slice(i, i + LOTE);
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation: `${ORIGEN}/${KEY}.txt`, urlList: lote }),
    });
    // 200 = ok, 202 = aceptado (la key todavía no se verificó): los dos cuentan como éxito.
    console.log(`IndexNow: HTTP ${r.status}, ${lote.length} URLs de ${host}`);
    if (r.status !== 200 && r.status !== 202) {
      console.error(await r.text());
      process.exit(1);
    }
  }
}

main().catch((e) => {
  console.error("ERROR:", (e as Error).message ?? e);
  process.exit(1);
});
