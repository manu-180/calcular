// Corre los detectores de Guatemala contra la red real con el mismo Http del cron y cruza el tipo de
// cambio con el servicio SOAP del Banguat (que el cron no puede usar porque solo hace GET).
// Uso: npx tsx scripts/paises/gt/probar_detectores.ts
import { crearHttpReal } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/gt/fuentes";
import series from "../../../src/paises/gt/series.json";

const SOAP = "https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx";

async function tipoCambioSoap(): Promise<number | null> {
  const cuerpo =
    '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TipoCambioDia xmlns="http://www.banguat.gob.gt/variables/ws/" /></soap:Body></soap:Envelope>';
  const r = await fetch(SOAP, {
    method: "POST",
    headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: '"http://www.banguat.gob.gt/variables/ws/TipoCambioDia"' },
    body: cuerpo,
    signal: AbortSignal.timeout(60_000),
  });
  const m = /<referencia>([\d.]+)<\/referencia>/.exec(await r.text());
  return m ? Number(m[1]) : null;
}

async function main() {
  const http = crearHttpReal(60_000);
  let fallas = 0;
  for (const d of detectores) {
    const inicio = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - inicio;
      if (r === null) {
        fallas++;
        console.log(`❌ ${d.id}: devolvió null (${ms} ms)`);
        continue;
      }
      if (d.carril === "serie") {
        const pts = r as { fecha: string; valor: number }[];
        const ultimoCargado = series.series.find((s) => s.id === d.serie)?.puntos.at(-1);
        const fuera = pts.filter((p) => p.valor < d.banda.min || p.valor > d.banda.max);
        const salto = ultimoCargado && pts.length ? Math.abs(pts[pts.length - 1].valor / Number(ultimoCargado[1]) - 1) : 0;
        const soap = d.serie === "gt.tipo-cambio" ? await tipoCambioSoap() : null;
        const coincide = d.serie !== "gt.tipo-cambio" || (soap !== null && pts.length > 0 && Math.abs(soap - pts[pts.length - 1].valor) < 1e-9);
        const ok = pts.length > 0 && fuera.length === 0 && salto <= d.banda.saltoRelativoMax && coincide;
        if (!ok) fallas++;
        console.log(
          `${ok ? "✅" : "❌"} ${d.id}: ${pts.map((p) => `${p.fecha} = ${p.valor}`).join(", ")}; salto contra el último cargado ${(salto * 100).toFixed(3)} %; ${d.serie === "gt.tipo-cambio" ? `SOAP ${soap} ${coincide ? "coincide" : "NO coincide"}` : "sin cruce SOAP"} (${ms} ms)`,
        );
      } else {
        const hs = r as unknown as { titulo: string; fecha: string; url: string }[];
        console.log(`✅ ${d.id}: ${hs.length} hallazgos${hs.length ? `: ${hs.map((h) => `${h.fecha} ${h.titulo}`).join(" | ")}` : ""} (${ms} ms)`);
      }
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  console.log(fallas ? `${fallas} FALLAS` : `TODO OK: ${detectores.length} detectores`);
  process.exit(fallas ? 1 : 0);
}

main();
