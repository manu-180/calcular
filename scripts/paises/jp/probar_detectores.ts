import type { Http } from "../../../src/motor/tipos";
import { detectores } from "../../../src/paises/jp/fuentes";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120";

const http: Http = {
  async json(url, opciones) {
    const r = await fetch(url, { headers: opciones?.userAgentNavegador ? { "user-agent": UA } : {} });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
  async texto(url, opciones) {
    const r = await fetch(url, { headers: opciones?.userAgentNavegador ? { "user-agent": UA } : {} });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.text();
  },
};

async function main() {
  for (const d of detectores) {
    const opciones = { userAgentNavegador: d.userAgentNavegador };
    const conOpciones: Http = { json: (u) => http.json(u, opciones), texto: (u) => http.texto(u, opciones) };
    try {
      const r = await (d.traer as (this: typeof d, http: Http) => Promise<readonly unknown[] | null>).call(d, conOpciones);
      if (r === null) console.log(`${d.id}: null (forma inesperada)`);
      else if (d.carril === "serie") {
        const puntos = r as readonly { fecha: string; valor: number }[];
        console.log(`${d.id}: ${puntos.length} puntos, último ${puntos.at(-1)?.fecha} = ${puntos.at(-1)?.valor}`);
      } else console.log(`${d.id}: ${r.length} hallazgos nuevos`);
    } catch (e) {
      console.log(`${d.id}: error ${(e as Error).message}`);
    }
  }
}

main();
