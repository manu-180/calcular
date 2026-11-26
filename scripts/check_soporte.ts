// Soporte por mail: firma del webhook de Resend, filtro de robots (evita loops bot↔bot), hilos y
// las respuestas de Manuel, que sólo valen firmadas por Gmail.
//   npx tsx scripts/check_soporte.ts

import { createHmac } from "node:crypto";
import { puedeReembolsar, type CompraHilo, type MensajeHilo } from "../src/lib/soporte/reembolso";
import { asuntoBase, direccion, esAutomatico, esParaCalcular, esDeManuel, firmaValida, type Recibido } from "../src/lib/soporte/ingesta";

let fallas = 0;
function check(nombre: string, ok: boolean) {
  console.log(`${ok ? "✅" : "❌"} ${nombre}`);
  if (!ok) fallas++;
}

const secreto = `whsec_${Buffer.from("clave-de-prueba-123").toString("base64")}`;
const cuerpo = JSON.stringify({ type: "email.received", data: { email_id: "abc" } });
const ts = String(Math.floor(Date.now() / 1000));
const firma = (s: string, t: string, b: string) =>
  createHmac("sha256", Buffer.from(s.replace(/^whsec_/, ""), "base64")).update(`msg_1.${t}.${b}`).digest("base64");

check("firma correcta pasa", firmaValida(secreto, "msg_1", ts, `v1,${firma(secreto, ts, cuerpo)}`, cuerpo));
check("acepta varias firmas separadas por espacio", firmaValida(secreto, "msg_1", ts, `v1,AAAA v1,${firma(secreto, ts, cuerpo)}`, cuerpo));
check("cuerpo alterado no pasa", !firmaValida(secreto, "msg_1", ts, `v1,${firma(secreto, ts, cuerpo)}`, cuerpo + " "));
check("otro secreto no pasa", !firmaValida(`whsec_${Buffer.from("otra").toString("base64")}`, "msg_1", ts, `v1,${firma(secreto, ts, cuerpo)}`, cuerpo));
const viejo = String(Number(ts) - 600);
check("timestamp de hace 10 min no pasa (replay)", !firmaValida(secreto, "msg_1", viejo, `v1,${firma(secreto, viejo, cuerpo)}`, cuerpo));
check("sin secreto configurado no pasa", !firmaValida("", "msg_1", ts, `v1,${firma(secreto, ts, cuerpo)}`, cuerpo));
check("sin headers no pasa", !firmaValida(secreto, null, null, null, cuerpo));

const rec = (p: Partial<Recibido>): Recibido => ({ id: "x", from: "Ana Pérez <ana@gmail.com>", to: ["soporte@calcular.ar"], ...p });
check("direccion con nombre", JSON.stringify(direccion("Ana Pérez <Ana@Gmail.com>")) === JSON.stringify({ email: "ana@gmail.com", nombre: "Ana Pérez" }));
check("direccion sola", direccion("ana@gmail.com").email === "ana@gmail.com");
check("soporte@calcular.ar es de calcular", esParaCalcular({ to: ["Soporte <soporte@calcular.ar>"] }));
check("calcularya.com en copia es de calcular", esParaCalcular({ to: ["x@theapexweb.com"], cc: ["hola@calcularya.com"] }));
check("soporte@theapexweb.com no es de calcular", !esParaCalcular({ to: ["soporte@theapexweb.com"] }));
check("un dominio que termina parecido no cuela", !esParaCalcular({ to: ["a@nocalcular.ar.evil.com"] }));
check("cliente común no es automático", !esAutomatico(rec({})));
check("mailer-daemon es automático", esAutomatico(rec({ from: "MAILER-DAEMON@mx.google.com" })));
check("noreply es automático", esAutomatico(rec({ from: "MercadoPago <no-reply@mercadopago.com>" })));
check("nuestro propio dominio es automático", esAutomatico(rec({ from: "CalculAR <soporte@calcular.ar>" })));
check("fuera de oficina (Auto-Submitted) es automático", esAutomatico(rec({ headers: { "Auto-Submitted": "auto-replied" } })));
check("Auto-Submitted: no no es automático", !esAutomatico(rec({ headers: { "auto-submitted": "no" } })));
check("newsletter (List-Unsubscribe) es automático", esAutomatico(rec({ headers: { "List-Unsubscribe": "<mailto:x>" } })));
check("asunto sin Re/Fwd/RV", asuntoBase("RE: Fwd: rv: Mi planilla") === "mi planilla");

const manuel = (auth: Record<string, string> | null) => rec({ from: "Manuel <manunv97@gmail.com>", subject: "Re: [Soporte · acción] #12 x", authentication: auth });
check("Manuel firmado por Gmail cuenta como Manuel", esDeManuel(manuel({ spf: "pass", dkim: "pass", dmarc: "pass" })));
check("Manuel sin firma no cuenta (From falsificado)", !esDeManuel(manuel({ spf: "fail", dkim: "fail", dmarc: "fail" })));
check("Manuel sin autenticación no cuenta", !esDeManuel(manuel(null)));
check("otro remitente firmado no es Manuel", !esDeManuel(rec({ authentication: { dkim: "pass", dmarc: "pass" } })));

// Reembolsos: el caso del 25/11 (queja sin pedir plata, 24 días después) tiene que quedar afuera.
const m = (direccion: string, texto: string, created_at: string): MensajeHilo => ({ direccion, texto, created_at });
const compraR = (id: string, pagado_at: string, estado = "aprobado"): CompraHilo => ({ mp_payment_id: id, producto: "planilla-uocra", estado, pagado_at });
const tavo = [
  m("entrante", "No me sirvió la planilla no está actualizada\n\nEl lun, 23 de nov de 2026, 09:00, CalculAR <soporte@calcular.ar> escribió:\n> devolución", "2026-11-25T14:57:00Z"),
  m("saliente", "Revisé tu planilla...", "2026-11-25T15:57:00Z"),
  m("entrante", "no, estas equivocado tiene solo una sola rama, mi caso puntual es CCT 577/10", "2026-11-25T17:16:00Z"),
];
const c1 = compraR("186212028893", "2026-11-01T20:58:25Z");
check("reembolso: queja sin pedir plata no pasa", !puedeReembolsar({ msgs: tavo, compra: c1, otras: [c1], cita: "mi caso puntual es CCT 577/10" }).ok);
check("reembolso: sin cita no pasa", !puedeReembolsar({ msgs: tavo, compra: c1, otras: [c1] }).ok);
check("reembolso: cita que sólo está en el mail citado no pasa", !puedeReembolsar({ msgs: tavo, compra: c1, otras: [c1], cita: "devolución" }).ok);
const reciente = compraR("1", "2026-11-24T10:00:00Z");
const pide = [
  m("entrante", "La planilla no me sirve", "2026-11-25T10:00:00Z"),
  m("saliente", "Te armé la versión con tu convenio", "2026-11-25T11:00:00Z"),
  m("entrante", "Igual no la quiero, quiero que me devuelvan la plata", "2026-11-25T12:00:00Z"),
];
check("reembolso: pide la plata tras la solución, dentro de 7 días, pasa", puedeReembolsar({ msgs: pide, compra: reciente, otras: [reciente], cita: "quiero que me devuelvan la plata" }).ok);
check("reembolso: pide la plata en el primer mail, sin ida y vuelta, no pasa", !puedeReembolsar({ msgs: [m("entrante", "quiero que me devuelvan la plata", "2026-11-25T10:00:00Z")], compra: reciente, otras: [reciente], cita: "quiero que me devuelvan la plata" }).ok);
check("reembolso: pide la plata pero compró hace 24 días, no pasa", !puedeReembolsar({ msgs: pide, compra: c1, otras: [c1], cita: "quiero que me devuelvan la plata" }).ok);
check("reembolso: pago ya devuelto no pasa", !puedeReembolsar({ msgs: pide, compra: compraR("1", "2026-11-24T10:00:00Z", "reembolsado"), otras: [], cita: "quiero que me devuelvan la plata" }).ok);
const d1 = compraR("10", "2026-11-25T10:00:00Z"), d2 = compraR("11", "2026-11-25T10:03:00Z");
check("reembolso: pago duplicado pasa sin cita", puedeReembolsar({ msgs: [], compra: d2, otras: [d1, d2], duplicado: true }).ok);
check("reembolso: --duplicado sin gemelo no pasa", !puedeReembolsar({ msgs: [], compra: d2, otras: [d2], duplicado: true }).ok);

if (fallas) {
  console.error(`\n${fallas} falla(s)`);
  process.exit(1);
}
console.log("\nSoporte OK");
