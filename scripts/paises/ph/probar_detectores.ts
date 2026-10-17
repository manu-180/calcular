import { detectores } from "../../../src/paises/ph/fuentes";
import type { Http, OpcionesHttp } from "../../../src/motor/tipos";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

function cabeceras(o?: OpcionesHttp): Record<string, string> {
  return {
    ...(o?.userAgentNavegador ? { "User-Agent": UA } : {}),
    ...(o?.encabezados ?? {}),
  };
}

const http: Http = {
  async json(url, o) {
    const r = await fetch(url, {
      headers: cabeceras(o),
      signal: AbortSignal.timeout(180_000),
    });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
  async texto(url, o) {
    const r = await fetch(url, {
      headers: cabeceras(o),
      signal: AbortSignal.timeout(180_000),
    });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.text();
  },
};

async function main(): Promise<void> {
  const filtro = process.argv[2];
  for (const d of detectores) {
    if (filtro && !d.id.includes(filtro)) continue;
    const inicio = Date.now();
    try {
      const r = await d.traer(http);
      console.log(
        d.id,
        `${Date.now() - inicio} ms`,
        r === null
          ? "null (forma inesperada)"
          : JSON.stringify(r).slice(0, 400),
      );
    } catch (e) {
      console.log(d.id, "error", (e as Error).message);
    }
  }
}

void main();
