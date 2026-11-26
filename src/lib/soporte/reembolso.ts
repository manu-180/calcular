// Cuándo el agente de soporte puede devolver plata solo. El 25/11/2026 devolvió $14.900 a un cliente
// que se había quejado sin pedir la plata y que había comprado 24 días antes: la regla escrita lo
// permitía. Desde entonces la decisión no depende sólo del criterio del modelo: soporte.ts llama a
// esta guarda antes de pegarle a MercadoPago, y lo que no pasa se escala a Manuel.

export const DIAS_GARANTIA = 7;
const HORAS_DUPLICADO = 48;

export type MensajeHilo = { direccion: string; texto: string | null; created_at: string };
export type CompraHilo = { mp_payment_id: string | number; producto: string; estado: string; pagado_at: string | null };

const PIDE_PLATA = /devol|reembol|reintegr|plata|dinero|refund|money|rembours|rimbors|erstatt|estorno|geld|cancel/;

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// El texto propio del cliente, sin el mail citado que arrastra su respuesta.
const textoPropio = (t: string | null) => (t ?? "").split(/\n>|\nEl .{5,80} escribi[oó]:/)[0];

export type Veredicto = { ok: true; via: "pedido" | "duplicado" } | { ok: false; motivo: string };

export function puedeReembolsar(a: {
  msgs: MensajeHilo[];
  compra: CompraHilo;
  otras: CompraHilo[];
  cita?: string;
  duplicado?: boolean;
}): Veredicto {
  const { msgs, compra, otras } = a;
  if (compra.estado !== "aprobado") return { ok: false, motivo: `el pago está ${compra.estado}, no se devuelve` };

  if (a.duplicado) {
    const t = Date.parse(compra.pagado_at ?? "");
    const gemelo = otras.some(
      (o) =>
        String(o.mp_payment_id) !== String(compra.mp_payment_id) &&
        o.producto === compra.producto &&
        o.estado === "aprobado" &&
        Math.abs(Date.parse(o.pagado_at ?? "") - t) <= HORAS_DUPLICADO * 3600_000,
    );
    return gemelo
      ? { ok: true, via: "duplicado" }
      : { ok: false, motivo: `no hay otro pago aprobado del mismo producto a menos de ${HORAS_DUPLICADO} h: no es un duplicado` };
  }

  const cita = normalizar(a.cita ?? "");
  if (cita.length < 10) return { ok: false, motivo: "falta --cita con las palabras literales del cliente pidiendo la plata" };
  if (!PIDE_PLATA.test(cita)) return { ok: false, motivo: "la cita no pide la plata: una queja no es un pedido de devolución" };

  const idx = msgs.findIndex((m) => m.direccion === "entrante" && normalizar(textoPropio(m.texto)).includes(cita));
  if (idx < 0) return { ok: false, motivo: "la cita no aparece en lo que escribió el cliente en este hilo" };
  if (!msgs.slice(0, idx).some((m) => m.direccion === "saliente"))
    return { ok: false, motivo: "todavía no hubo ida y vuelta: primero se le responde con la solución y se espera su respuesta" };

  const primerReclamo = msgs.find((m) => m.direccion === "entrante")?.created_at;
  const dias = (Date.parse(primerReclamo ?? "") - Date.parse(compra.pagado_at ?? "")) / 86400_000;
  if (!(dias <= DIAS_GARANTIA))
    return { ok: false, motivo: `reclamó ${Math.floor(dias)} días después de comprar, fuera de los ${DIAS_GARANTIA} de la garantía: escalar a Manuel` };

  return { ok: true, via: "pedido" };
}
