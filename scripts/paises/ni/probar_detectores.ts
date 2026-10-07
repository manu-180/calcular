// Corre los detectores de Nicaragua contra la red real con el mismo Http del cron, prueba el lector
// del sumario de La Gaceta con la edición que publicó el salario mínimo de 2026 y cruza la serie del
// tipo de cambio con el servicio SOAP del BCN (que el cron no puede usar).
// Uso: npx tsx scripts/paises/ni/probar_detectores.ts
import { crearHttpReal } from "../../datos-paises/lib/http";
import { detectores, hallazgosDeEdicion, leerSumario, pdfDeEdicion } from "../../../src/paises/ni/fuentes";
import series from "../../../src/paises/ni/series.json";
import { diaBcn, mesBcn } from "./bcn";

const EDICION_SALARIO_2026 = { url: "https://www.lagaceta.gob.ni/la-gaceta-no-43-viernes-06-de-marzo-de-2026/", numero: "43", fecha: "2026-03-06" as const };

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
      const hs = r as unknown as { titulo: string; fecha: string; url: string }[];
      console.log(`✅ ${d.id}: ${hs.length} hallazgos${hs.length ? `: ${hs.map((h) => `${h.fecha} ${h.titulo}`).join(" | ")}` : ""} (${ms} ms)`);
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }

  try {
    const pdf = pdfDeEdicion(await http.texto(EDICION_SALARIO_2026.url));
    const hs = pdf ? hallazgosDeEdicion(EDICION_SALARIO_2026, leerSumario(pdf)) : [];
    const ok = hs.some((h) => /MINISTERIO DEL TRABAJO/i.test(h.titulo) && /02-2026/.test(h.titulo));
    if (!ok) fallas++;
    console.log(`${ok ? "✅" : "❌"} lector del sumario con La Gaceta No. 43/2026: ${hs.map((h) => h.titulo).join(" | ") || "nada"}`);
  } catch (err) {
    fallas++;
    console.log(`❌ lector del sumario: ${(err as Error).message}`);
  }

  try {
    const cargados = new Map(series.series[0].puntos.map(([f, v]) => [f as string, v as number]));
    const hoy = new Date().toISOString().slice(0, 10);
    const [a, m, d] = hoy.split("-").map(Number);
    const delDia = await diaBcn(a, m, d);
    const delMes = (await mesBcn(a, m)) ?? [];
    const distintos = delMes.filter((p) => cargados.has(p.fecha) && cargados.get(p.fecha) !== p.valor);
    const faltan = delMes.filter((p) => !cargados.has(p.fecha));
    const ok = delDia !== null && cargados.get(hoy) === delDia && distintos.length === 0 && faltan.length === 0;
    if (!ok) fallas++;
    console.log(
      `${ok ? "✅" : "❌"} serie ni.tipo-cambio contra el SOAP del BCN: hoy ${hoy} BCN ${delDia}, cargado ${cargados.get(hoy)}; mes ${delMes.length} días, ${distintos.length} distintos, ${faltan.length} sin cargar; último cargado ${series.series[0].puntos.at(-1)?.[0]}`,
    );
  } catch (err) {
    fallas++;
    console.log(`❌ SOAP del BCN: ${(err as Error).message}`);
  }

  console.log(fallas ? `${fallas} FALLAS` : "TODO OK");
  process.exit(fallas ? 1 : 0);
}

main();
