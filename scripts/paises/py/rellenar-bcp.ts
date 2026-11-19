// Rellena un hueco de py.dolar y py.euro con la planilla oficial del BCP de cada día hábil (la página
// devuelve otra fecha solo por POST, que el Http de los detectores no hace). Sirve cuando el sitio
// estuvo caído varios días y el guardián rechaza el primer valor nuevo por salto contra el último
// publicado aunque el guaraní se movió de a poco: con los días intermedios cada paso vuelve a pasar
// la banda. Cada punto pasa por revisarPuntos igual que en el cron; un rechazo no escribe nada.
// Uso: npx tsx scripts/paises/py/rellenar-bcp.ts [--escribir]
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { PuntoSerie, Serie } from "../../../src/motor/tipos";
import { hoyEn, sumarDias } from "../../../src/motor/vigencia";
import { parsearCotizacionBcp, parsearMonedaBcp, detectores } from "../../../src/paises/py/fuentes";
import { agregarPuntos } from "../../datos-paises/lib/series-json";
import { UA_NAVEGADOR } from "../../datos-paises/lib/http";

const URL = "https://www.bcp.gov.py/webapps/web/cotizacion/monedas";
const ARCHIVO = path.join(__dirname, "..", "..", "..", "src", "paises", "py", "series.json");

async function planilla(fecha: string): Promise<string> {
  const [a, m, d] = fecha.split("-");
  const r = await fetch(URL, {
    method: "POST",
    headers: { "User-Agent": UA_NAVEGADOR, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ fecha: `${d}/${m}/${a}` }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} para ${fecha}`);
  return r.text();
}

(async () => {
  const texto = readFileSync(ARCHIVO, "utf8");
  const series = (JSON.parse(texto) as { series: Serie[] }).series;
  const hoy = hoyEn({ zonaHoraria: "America/Asuncion" });
  const pares = [
    { id: "py.dolar", parse: (h: string) => parsearCotizacionBcp(h), det: "py.dolar-bcp" },
    { id: "py.euro", parse: (h: string) => parsearMonedaBcp(h, "EUR"), det: "py.euro-bcp" },
  ];
  const desde = pares.map((p) => series.find((s) => s.id === p.id)!.puntos.at(-1)![0]).sort()[0];
  const leidos = new Map<string, Map<string, number>>(pares.map((p) => [p.id, new Map()]));
  for (let f = sumarDias(desde, 1); f <= hoy; f = sumarDias(f, 1)) {
    const html = await planilla(f);
    for (const p of pares) for (const pt of p.parse(html) ?? []) leidos.get(p.id)!.set(pt.fecha, pt.valor);
  }
  const nuevos = new Map<string, readonly PuntoSerie[]>();
  for (const p of pares) {
    const serie = series.find((s) => s.id === p.id)!;
    const ultima = serie.puntos.at(-1)![0];
    const puntos = [...leidos.get(p.id)!].filter(([f]) => f > ultima).map(([fecha, valor]) => ({ fecha, valor }) as PuntoSerie);
    const banda = (detectores.find((d) => d.id === p.det)! as { banda: import("../../../src/motor/tipos").BandaSerie }).banda;
    const r = revisarPuntos(serie, puntos, banda, hoy);
    if (r.rechazos.length) throw new Error(r.rechazos.join("\n"));
    console.log(p.id, JSON.stringify(r.aceptados.map((x) => [x.fecha, x.valor])));
    nuevos.set(p.id, r.aceptados);
  }
  if (process.argv.includes("--escribir")) {
    writeFileSync(ARCHIVO, agregarPuntos(texto, nuevos).texto);
    console.log("escrito", ARCHIVO);
  }
})();
