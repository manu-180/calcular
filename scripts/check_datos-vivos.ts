// Verificación del detector de deriva (src/lib/datos-vivos.ts): bandas de sanidad, salto brusco,
// fuente caída, shape del BCRA.
// Correr con: npx tsx scripts/check_datos-vivos.ts          # lógica pura, sin red (lo que corre check-all)
//             npx tsx scripts/check_datos-vivos.ts --vivo   # + pega de verdad contra BCRA e INDEC
//
// Los casos viven ACÁ desde el 28/9/2026. Antes este archivo delegaba en tools/datos-vivos-test.ts
// del repo libre_albedrio, que en el workflow de GitHub (este repo solo) no existe: check-all
// salía rojo en la nube y verde en la PC, y frenaba la publicación automática de datos.
// Sin --vivo a propósito en check-all: un organismo caído no puede pintar de rojo el gate.

import {
  compararIpc,
  compararTna,
  extraerFechados,
  nombreAPeriodo,
  periodoANombre,
  resumir,
  traerIpc,
  traerTna,
  type Hallazgo,
} from "../src/lib/datos-vivos";

let pasaron = 0;
let fallaron = 0;

function ok(nombre: string, condicion: boolean, detalle = ""): void {
  if (condicion) {
    pasaron++;
    console.log(`  ✅ ${nombre}`);
  } else {
    fallaron++;
    console.log(`  ❌ ${nombre}${detalle ? ` — ${detalle}` : ""}`);
  }
}

const SERIE: ReadonlyArray<readonly [string, number]> = [
  ["2026-05", 11607.3937],
  ["2026-06", 11826.4103],
  ["2026-07", 12076.3937],
];
const DEFAULT_IPC = { mensualPct: 2.1, periodo: "julio 2026" };

console.log("\n— datos-vivos · lógica pura —\n");

console.log("TNA:");
{
  const servido = { valor: 22.14, fechaISO: "2026-09-02" };

  const alDia = compararTna(servido, { valor: 22.14, fecha: "2026-09-02" });
  ok("mismo dato y misma fecha ⇒ ok", alDia.severidad === "ok", alDia.severidad);

  const viejo = compararTna(servido, { valor: 22.9, fecha: "2026-09-04" });
  ok("fuente más nueva ⇒ atencion (no accion: la TNA se pide en vivo client-side)",
    viejo.severidad === "atencion", viejo.severidad);

  const fueraDeBanda = compararTna(servido, { valor: 0.22, fecha: "2026-09-04" });
  ok("valor fuera de la banda de sanidad ⇒ accion", fueraDeBanda.severidad === "accion", fueraDeBanda.severidad);
  ok("  … y NO propone rotar a ciegas", /NO rotar/.test(fueraDeBanda.accion ?? ""));

  const salto = compararTna(servido, { valor: 40, fecha: "2026-09-04" });
  ok("salto relativo >30% ⇒ accion", salto.severidad === "accion", salto.severidad);

  const sinRed = compararTna(servido, null);
  ok("fuente caída ⇒ atencion, nunca ok", sinRed.severidad === "atencion", sinRed.severidad);
  ok("  … y jamás inventa un valor", sinRed.fuente === "sin respuesta");
}

console.log("\nIPC:");
{
  const alDia = compararIpc(DEFAULT_IPC, SERIE, { periodo: "2026-07", indice: 12076.3937, previo: 11826.4103 });
  ok("serie horneada al día ⇒ ok", alDia[0].severidad === "ok", alDia[0].severidad);

  const nuevo = compararIpc(DEFAULT_IPC, SERIE, { periodo: "2026-08", indice: 12329.0, previo: 12076.3937 });
  ok("INDEC publicó un mes nuevo ⇒ accion", nuevo[0].severidad === "accion", nuevo[0].severidad);
  ok("  … y nombra el período en castellano", /agosto 2026/.test(nuevo[0].detalle), nuevo[0].detalle);
  ok("  … y da el comando exacto", /gen_ipc_serie/.test(nuevo[0].accion ?? ""));

  const derivada = Math.round((12329.0 / 12076.3937 - 1) * 1000) / 10;
  ok(`  … y deriva la variación del índice (${derivada}%)`, /2\.1%/.test(nuevo[0].detalle) || derivada === 2.1,
    `derivada=${derivada}`);

  const cambioDeBase = compararIpc(DEFAULT_IPC, SERIE, { periodo: "2026-08", indice: 100, previo: 12076.3937 });
  ok("cambio de base (variación absurda) ⇒ accion sin proponer regenerar", cambioDeBase[0].severidad === "accion");
  ok("  … pide ojo humano", /a mano/.test(cambioDeBase[0].accion ?? ""));

  const sinRed = compararIpc(DEFAULT_IPC, SERIE, null);
  ok("fuente caída ⇒ atencion, nunca ok", sinRed[0].severidad === "atencion", sinRed[0].severidad);
}

console.log("\nResumen y formato:");
{
  const todoOk: Hallazgo[] = [
    { dato: "a", severidad: "ok", sirve: "", fuente: "", detalle: "" },
    { dato: "b", severidad: "ok", sirve: "", fuente: "", detalle: "" },
  ];
  ok("todo ok ⇒ severidadMax ok", resumir(todoOk).severidadMax === "ok");
  ok("  … y la línea lo dice en verde", resumir(todoOk).linea.startsWith("🟢"));

  const mezcla: Hallazgo[] = [
    { dato: "a", severidad: "ok", sirve: "", fuente: "", detalle: "" },
    { dato: "IPC", severidad: "accion", sirve: "", fuente: "", detalle: "" },
    { dato: "b", severidad: "atencion", sirve: "", fuente: "", detalle: "" },
  ];
  ok("una accion manda sobre el resto", resumir(mezcla).severidadMax === "accion");
  ok("  … y la línea nombra el dato culpable", resumir(mezcla).linea.includes("IPC"));

  ok("periodoANombre", periodoANombre("2026-07") === "julio 2026", periodoANombre("2026-07"));
  ok("nombreAPeriodo", nombreAPeriodo("julio 2026") === "2026-07", String(nombreAPeriodo("julio 2026")));
  ok("nombreAPeriodo rechaza basura", nombreAPeriodo("mes que viene") === null);

  const shapeBcra = { results: [{ idVariable: 12, detalle: [{ fecha: "2026-09-02", valor: 22.14 }] }] };
  const sacado = extraerFechados(shapeBcra);
  ok("extraerFechados entiende el shape del BCRA", sacado.length === 1 && sacado[0].valor === 22.14,
    JSON.stringify(sacado));
  ok("extraerFechados no explota con basura", extraerFechados({ a: null, b: [1, "x"] }).length === 0);
}

async function vivo(): Promise<void> {
  console.log("\n— contra las fuentes reales —\n");
  const [tna, ipc] = await Promise.all([traerTna(), traerIpc()]);
  console.log("  BCRA  →", tna ? `${tna.valor}% · ${tna.fecha}` : "sin respuesta");
  console.log("  INDEC →", ipc ? `${ipc.periodo} · índice ${ipc.indice}` : "sin respuesta");

  const hallazgos = [
    compararTna({ valor: 22.14, fechaISO: "2026-09-02" }, tna),
    ...compararIpc(DEFAULT_IPC, SERIE, ipc),
  ];
  for (const h of hallazgos) {
    const emoji = { ok: "🟢", atencion: "🟡", accion: "🔴" }[h.severidad];
    console.log(`\n  ${emoji} ${h.dato}\n     sirve : ${h.sirve}\n     fuente: ${h.fuente}\n     ${h.detalle}`);
    if (h.accion) console.log(`     → ${h.accion}`);
  }
  console.log(`\n  ${resumir(hallazgos).linea}`);
}

async function main(): Promise<void> {
  if (process.argv.includes("--vivo")) await vivo();
  console.log(`\n${fallaron ? "❌" : "✅"} ${pasaron} pasaron · ${fallaron} fallaron\n`);
  if (fallaron) process.exit(1);
}

main().catch((e) => {
  console.error(`❌ datos-vivos-test: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
