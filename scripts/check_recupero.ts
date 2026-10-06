// Verificación del recupero de compras sin terminar (src/lib/mp-recupero.ts). Lo que se prueba es
// lo que, si falla, le hace daño a una persona real: escribirle a quien SÍ pagó, escribirle dos
// veces, o escribirle a quien está pagando con un ticket que todavía no acreditó.
//
// Correr con: npx tsx scripts/check_recupero.ts  (o vía scripts/check-all.ts)

import { readFileSync } from "node:fs";
import { MAXIMO_POR_CORRIDA, elegirRecordatorios, type PagoMp, type PreferenciaMp } from "../src/lib/mp-recupero";
import { recordatorioCompraHtml } from "../src/lib/email";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const AHORA = new Date("2026-10-02T14:00:00.000Z");
const haceHoras = (h: number) => new Date(AHORA.getTime() - h * 3_600_000).toISOString();
const pref = (horas: number, email: string | null, ref: string): PreferenciaMp => ({
  date_created: haceHoras(horas),
  payer_email: email,
  external_reference: ref,
});
const emails = (prefs: PreferenciaMp[], pagos: PagoMp[] = []) =>
  elegirRecordatorios(prefs, pagos, AHORA).map((r) => r.email).sort();

// Ventana 48→24 h: una corrida por día toca cada preferencia exactamente una vez.
check("preferencia de hace 30 h con mail → recordatorio", emails([pref(30, "a@x.com", "planilla-comercio:1")]).join() === "a@x.com");
check("de hace 23 h todavía no (le toca mañana)", emails([pref(23, "a@x.com", "planilla-comercio:1")]).length === 0);
check("de hace 49 h ya no (le tocó ayer)", emails([pref(49, "a@x.com", "planilla-comercio:1")]).length === 0);
check("borde: exactamente 24 h NO entra (mañana tampoco: 48 h sí)", emails([pref(24, "a@x.com", "planilla-comercio:1")]).length === 0);
check("borde: exactamente 48 h SÍ entra", emails([pref(48, "a@x.com", "planilla-comercio:1")]).length === 1);

// Sin mail no hay a quién escribir; con otra cuenta de MP (no es planilla) no se toca.
check("sin mail → nada", emails([pref(30, null, "planilla-comercio:1")]).length === 0);
check("referencia de otro cobro de la cuenta → nada", emails([pref(30, "a@x.com", "abc-123")]).length === 0);
check("slug de producto inexistente → nada", emails([pref(30, "a@x.com", "planilla-trucha:1")]).length === 0);

// Quien pagó no recibe nada, ni por la misma preferencia ni por un segundo intento.
check(
  "pagó esa misma preferencia → nada",
  emails([pref(30, "a@x.com", "planilla-comercio:1")], [{ status: "approved", external_reference: "planilla-comercio:1" }]).length === 0,
);
check(
  "pagó en un segundo intento del mismo producto → nada",
  emails(
    [pref(30, "a@x.com", "planilla-comercio:1"), pref(2, "a@x.com", "planilla-comercio:2")],
    [{ status: "approved", external_reference: "planilla-comercio:2", payer: { email: "A@x.com" } }],
  ).length === 0,
);
check(
  "pagó OTRO producto → igual se le recuerda el que dejó",
  emails(
    [pref(30, "a@x.com", "planilla-comercio:1")],
    [{ status: "approved", external_reference: "planilla-monotributo:9", payer: { email: "a@x.com" } }],
  ).join() === "a@x.com",
);
for (const estado of ["pending", "in_process", "authorized"]) {
  check(
    `pago en curso (${estado}) → nada`,
    emails([pref(30, "a@x.com", "planilla-uocra:1")], [{ status: estado, external_reference: "planilla-uocra:1" }]).length === 0,
  );
}
check(
  "pago rechazado → sí se le recuerda (probar con otro medio)",
  emails([pref(30, "a@x.com", "planilla-uocra:1")], [{ status: "rejected", external_reference: "planilla-uocra:1" }]).length === 1,
);

// Los productos nuevos también se recuperan (antes se filtraba por el prefijo «planilla-»).
const delInforme = elegirRecordatorios([pref(30, "c@x.com", "informe-cuota-alimentaria:1")], [], AHORA);
check("informe abandonado → recordatorio", delInforme.length === 1 && delInforme[0].producto.entrega === "informe");
check("planilla de alquileres abandonada → recordatorio", emails([pref(30, "d@x.com", "planilla-alquileres:1")]).join() === "d@x.com");
check(
  "pagó el informe → nada",
  emails([pref(30, "c@x.com", "informe-cuota-alimentaria:1")], [{ status: "approved", external_reference: "informe-cuota-alimentaria:1" }]).length === 0,
);
const mailInforme = recordatorioCompraHtml({ tituloCorto: "Informe de cuota alimentaria", precio: "$4.900", urlRetomar: "https://calcular.ar/x", informe: true });
check("el recordatorio del informe usa «el» y no promete actualizaciones", mailInforme.includes("pendiente el Informe") && !mailInforme.includes("actualizaciones"));
const mailPlanilla = recordatorioCompraHtml({ tituloCorto: "Planilla UOCRA 2026", precio: "$14.900", urlRetomar: "https://calcular.ar/x" });
check("el de una planilla queda como siempre", mailPlanilla.includes("pendiente la Planilla") && mailPlanilla.includes("actualizaciones del año"));

// Un mail por persona, del intento más reciente.
const doble = elegirRecordatorios(
  [pref(40, "a@x.com", "planilla-comercio:1"), pref(28, "A@X.com", "planilla-monotributo:2"), pref(30, "b@x.com", "planilla-uocra:3")],
  [],
  AHORA,
);
check("dos intentos de la misma persona → un solo mail", doble.filter((r) => r.email === "a@x.com").length === 1);
check("y es del intento más reciente", doble.find((r) => r.email === "a@x.com")?.producto.slug === "planilla-monotributo");
check("las otras personas reciben el suyo", doble.length === 2);

// Techo por corrida: un abuso del formulario no puede disparar mails sin límite.
const muchos = Array.from({ length: 80 }, (_, i) => pref(30, `p${i}@x.com`, `planilla-comercio:${i}`));
check(`nunca más de ${MAXIMO_POR_CORRIDA} recordatorios por corrida`, elegirRecordatorios(muchos, [], AHORA).length === MAXIMO_POR_CORRIDA);

// El cron tiene que correr UNA vez por día: la idempotencia depende de eso.
const vercel = JSON.parse(readFileSync("vercel.json", "utf8")) as { crons: { path: string; schedule: string }[] };
const cron = vercel.crons.find((c) => c.path === "/api/cron/recuperar-compras");
check("el cron de recupero está programado", !!cron);
check("y corre una sola vez por día (min y hora fijos, todos los días)", !!cron && /^\d+ \d+ \* \* \*$/.test(cron.schedule), cron?.schedule);

console.log(fallas === 0 ? "\n✅ check_recupero: todo OK" : `\n❌ check_recupero: ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
