// Trae el IPC nacional del BCRD (base octubre 2019 a septiembre 2020 = 100) desde la consulta oficial
// de bancentral.gov.do/a/ipc-consulta, que responde a un POST por año.
// El cron no lo puede leer solo: su Http no hace POST y el archivo ipc_base_2019-2020.xls es binario.
// Uso: npx tsx scripts/paises/do/actualizar_ipc.ts [--desde 2000]        imprime la serie
//      npx tsx scripts/paises/do/actualizar_ipc.ts --escribir            agrega a series.json los meses nuevos
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { FechaISO, PuntoSerie } from "../../../src/motor/tipos";
import { fechaEnZona } from "../../../src/motor/vigencia";
import { agregarPuntos } from "../../datos-paises/lib/series-json";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const ARCHIVO = path.join(__dirname, "..", "..", "..", "src", "paises", "do", "series.json");
const BANDA = { min: 100, max: 220, saltoRelativoMax: 0.03 };

const NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

// El BCRD corta la conexión TLS de vez en cuando: se reintenta con una pausa corta.
async function conReintentos<T>(f: () => Promise<T>, veces = 4): Promise<T> {
  for (let i = 1; ; i++) {
    try {
      return await f();
    } catch (e) {
      if (i >= veces) throw e;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

async function anio(a: number): Promise<PuntoSerie[]> {
  const r = await conReintentos(() => fetch("https://www.bancentral.gov.do/Home/GetMonths", {
    method: "POST",
    headers: {
      "user-agent": NAVEGADOR,
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
      referer: "https://www.bancentral.gov.do/a/ipc-consulta",
    },
    body: `id=${a}`,
  }));
  if (!r.ok) throw new Error(`BCRD ${a}: HTTP ${r.status}`);
  const json = (await r.json()) as { result?: { value?: string; displayText?: string }[] };
  if (!Array.isArray(json.result)) throw new Error(`BCRD ${a}: respuesta sin result`);
  const puntos: PuntoSerie[] = [];
  for (const m of json.result) {
    const mes = MESES.indexOf(String(m.displayText).trim().toLowerCase()) + 1;
    const valor = Number(String(m.value).replace(",", "."));
    if (mes === 0 || !Number.isFinite(valor) || valor <= 0) continue;
    puntos.push({ fecha: `${a}-${String(mes).padStart(2, "0")}-01` as FechaISO, valor: Math.round(valor * 1e4) / 1e4 });
  }
  return puntos;
}

async function main() {
  const i = process.argv.indexOf("--desde");
  const hoy = fechaEnZona(new Date(), "America/Santo_Domingo");
  const hasta = Number(hoy.slice(0, 4));
  const desde = i > 0 ? Number(process.argv[i + 1]) : process.argv.includes("--escribir") ? hasta - 1 : 2000;
  const todos: PuntoSerie[] = [];
  for (let a = desde; a <= hasta; a++) todos.push(...(await anio(a)));
  if (!process.argv.includes("--escribir")) {
    console.log(JSON.stringify(todos.map((p) => [p.fecha, p.valor])));
    return;
  }
  const texto = readFileSync(ARCHIVO, "utf8");
  const serie = (JSON.parse(texto) as { series: { id: string; puntos: [FechaISO, number][] }[] }).series.find((s) => s.id === "do.ipc");
  if (!serie) throw new Error("do.ipc no está en series.json");
  const ultima = serie.puntos[serie.puntos.length - 1][0];
  const rev = revisarPuntos(serie, todos.filter((p) => p.fecha > ultima), BANDA, hoy);
  if (rev.rechazos.length) throw new Error(rev.rechazos.join("; "));
  if (!rev.aceptados.length) return console.log(`sin meses nuevos (último: ${ultima})`);
  writeFileSync(ARCHIVO, agregarPuntos(texto, new Map([["do.ipc", rev.aceptados]])).texto);
  console.log(`agregados: ${rev.aceptados.map((p) => `${p.fecha} ${p.valor}`).join(", ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
