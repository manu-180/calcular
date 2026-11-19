// Rellena las series de cambio de tt con la tabla diaria oficial del Banco Central (Data Centre,
// «Exchange Rates (Daily)», la misma tasa promedio ponderada que muestra la portada). El Http de los
// detectores no hace POST de formulario, por eso va aparte: sirve para cubrir los días que el cron
// no leyó. Cada punto pasa por revisarPuntos con la banda del detector, igual que en el cron.
// Uso: npx tsx scripts/paises/tt/rellenar-cbtt.ts [--escribir]
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { BandaSerie, PuntoSerie, Serie } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";
import { detectores } from "../../../src/paises/tt/fuentes";
import { agregarPuntos } from "../../datos-paises/lib/series-json";
import { UA_NAVEGADOR } from "../../datos-paises/lib/http";

const AJAX = "https://www.central-bank.org.tt/wp-admin/admin-ajax.php";
const ARCHIVO = path.join(__dirname, "..", "..", "..", "src", "paises", "tt", "series.json");
const NOMBRE: Readonly<Record<string, string>> = { usd: "USD", cad: "CAD", gbp: "GBP", eur: "EURO" };

function serieDeTabla(html: string, nombre: string): Map<string, number> {
  const k = html.indexOf(`<strong>Series:</strong> ${nombre}</p>`);
  const b = k < 0 ? -1 : html.indexOf("openModal(", k);
  if (b < 0) throw new Error(`la tabla del CBTT no trae ${nombre}`);
  const args = JSON.parse(`[${html.slice(b + 10, html.indexOf(")", html.indexOf("]", html.indexOf("]", b) + 1)))}]`) as [string[], (string | null)[]];
  const [fechas, valores] = args;
  const mapa = new Map<string, number>();
  fechas.forEach((f, i) => {
    const v = Number(valores[i]);
    if (/^\d{4}-\d{2}-\d{2}$/.test(f) && Number.isFinite(v) && v > 0) mapa.set(f, v);
  });
  return mapa;
}

(async () => {
  const r = await fetch(AJAX, {
    method: "POST",
    headers: { "User-Agent": UA_NAVEGADOR, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ action: "load_custom_db_table_dynamic", atts: JSON.stringify({ id: "106", title: "Exchange Rates (Daily)" }) }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const html = await r.text();
  const texto = readFileSync(ARCHIVO, "utf8");
  const series = (JSON.parse(texto) as { series: Serie[] }).series;
  const hoy = hoyEn({ zonaHoraria: "America/Port_of_Spain" });
  const nuevos = new Map<string, readonly PuntoSerie[]>();
  for (const serie of series) {
    const m = /^tt\.(usd|cad|gbp|eur)-(buy|sell)$/.exec(serie.id);
    if (!m) continue;
    const tabla = serieDeTabla(html, `${NOMBRE[m[1]]} ${m[2] === "buy" ? "Buying" : "Selling"} Rate`);
    const ultima = serie.puntos.at(-1)![0];
    const puntos = [...tabla].filter(([f]) => f > ultima && f <= hoy).map(([fecha, valor]) => ({ fecha, valor }) as PuntoSerie);
    const banda = (detectores.find((d) => d.id === `${serie.id}-cbtt`) as { banda: BandaSerie }).banda;
    const rev = revisarPuntos(serie, puntos, banda, hoy);
    if (rev.rechazos.length) {
      console.log(serie.id, "RECHAZADA:", rev.rechazos[0]);
      continue;
    }
    const lista = rev.aceptados;
    console.log(serie.id, JSON.stringify(lista.map((p) => [p.fecha, p.valor])));
    if (lista.length) nuevos.set(serie.id, lista);
  }
  if (process.argv.includes("--escribir")) {
    writeFileSync(ARCHIVO, agregarPuntos(texto, nuevos).texto);
    console.log("escrito", ARCHIVO);
  }
})();
