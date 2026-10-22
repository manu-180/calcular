// Soporte por mail: firma del webhook de Resend, filtro de robots (evita loops bot↔bot), hilos y
// las respuestas de Manuel, que sólo valen firmadas por Gmail.
//   npx tsx scripts/check_soporte.ts

import { createHmac } from "node:crypto";
import { asuntoBase, direccion, esAutomatico, esDeManuel, firmaValida, type Recibido } from "../src/lib/soporte/ingesta";

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

if (fallas) {
  console.error(`\n${fallas} falla(s)`);
  process.exit(1);
}
console.log("\nSoporte OK");
