import { formatARS, formatPctFijo } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import type { Caso } from "@/lib/prefill/inflacion";
import { mesTxt, type Informe } from "@/app/(ar)/informes/inflacion/_modelo";

export type Trato = "vos" | "usted";

/** Lo que la persona escribe en la página del informe. Nunca sale del navegador. */
export type Personales = {
  remitente: string;
  destinatario: string;
  /** «el diseño de la web», «las clases de inglés»… Opcional. */
  concepto: string;
  /** «el 1.° de noviembre»… Opcional: si falta, se usa el mes que viene. */
  vigencia: string;
  ciudad: string;
  trato: Trato;
};

export const PERSONALES_VACIOS: Personales = { remitente: "", destinatario: "", concepto: "", vigencia: "", ciudad: "", trato: "usted" };

export function tratoPorDefecto(c: Caso): Trato {
  return c === "deuda-presto" || c === "deuda-debo" ? "vos" : "usted";
}

export type Carta = {
  asunto: string;
  saludo: string;
  parrafos: string[];
  despedida: string;
  firma: string;
};

const ars = (n: number) => formatARS(n, 0);
const pct = (n: number) => formatPctFijo(n, 1);

/** «el 1.° de noviembre de 2026»: el mes siguiente al de emisión. */
export function vigenciaPorDefecto(emitidoIso: string | null | undefined): string {
  const base = emitidoIso && /^\d{4}-\d{2}-\d{2}$/.test(emitidoIso) ? emitidoIso : null;
  if (!base) return "el mes que viene";
  const [a, m] = base.split("-").map(Number);
  const total = a * 12 + m;
  const p = `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}`;
  return `el 1.° de ${mesTxt(p)}`;
}

// Una sola fuente para la carta que se ve en la hoja y la que se copia al portapapeles: si
// fueran dos, tarde o temprano dirían números distintos.
export function armarCarta(caso: Caso, inf: Informe, p: Personales, emitido?: string | null): Carta {
  const vos = p.trato === "vos";
  const t = (v: string, u: string) => (vos ? v : u);
  const dest = p.destinatario.trim();
  const concepto = p.concepto.trim();
  const vigencia = p.vigencia.trim() || vigenciaPorDefecto(emitido);
  const X = ars(inf.monto);
  const W = ars(inf.act.montoActualizado);
  const Z = pct(inf.act.variacionPct);
  const desde = mesTxt(inf.desde);
  const hasta = mesTxt(inf.hasta);
  const ultimo = inf.hastaEsUltimo ? `${hasta} (el último dato publicado)` : hasta;
  const segunIpc = `Según el Índice de Precios al Consumidor (IPC) del INDEC, entre ${desde} y ${ultimo} los precios subieron ${Z}`;
  const aPartir = vigencia.startsWith("el ") ? `a partir del ${vigencia.slice(3)}` : `a partir de ${vigencia}`;
  const adjunto = t(
    "Te mando el detalle de la cuenta, mes a mes y con la fuente oficial, para que lo puedas revisar.",
    "Le adjunto el detalle de la cuenta, mes a mes y con la fuente oficial, para que lo pueda revisar.",
  );
  const saludo = dest ? (vos ? `Hola, ${dest}:` : `${dest}:`) : vos ? "Hola:" : "A quien corresponda:";
  const firma = p.remitente.trim();

  switch (caso) {
    case "sueldo": {
      const b = inf.brecha;
      const parrafos = [t("Te escribo para pedirte una actualización de mi sueldo.", "Le escribo para pedirle una actualización de mi sueldo.")];
      if (b && !b.gana) {
        parrafos.push(
          `En ${desde} cobraba ${X}. ${segunIpc}. Para comprar hoy lo mismo que con aquel sueldo hacen falta ${W}. Hoy cobro ${ars(b.actual)}: son ${ars(-b.diferencia)} menos por mes, y para recuperar el poder de compra el sueldo tendría que subir un ${pct(b.aumentoNecesarioPct)}.`,
          t(
            `Te pido que lo llevemos a ${W}, que es el mismo sueldo de ${desde} expresado en pesos de hoy. ${adjunto}`,
            `Le pido que lo actualicemos a ${W}, que es el mismo sueldo de ${desde} expresado en pesos de hoy. ${adjunto}`,
          ),
        );
      } else if (b && b.gana) {
        parrafos.push(
          `En ${desde} cobraba ${X}. ${segunIpc}, y hoy cobro ${ars(b.actual)}: el sueldo acompañó a la inflación, y lo valoro.`,
          t(
            `Te propongo que sigamos actualizándolo con el mismo índice de forma periódica, para que no se atrase. ${adjunto}`,
            `Le propongo que lo sigamos actualizando con el mismo índice de forma periódica, para que no se atrase. ${adjunto}`,
          ),
        );
      } else {
        parrafos.push(
          `Mi sueldo es de ${X} desde ${desde}. ${segunIpc}. Para tener hoy el mismo poder de compra que en ${desde}, ese sueldo tendría que ser de ${W}.`,
          t(
            `Te pido que lo llevemos a ${W}, que es el mismo sueldo expresado en pesos de hoy. ${adjunto}`,
            `Le pido que lo actualicemos a ${W}, que es el mismo sueldo expresado en pesos de hoy. ${adjunto}`,
          ),
        );
      }
      parrafos.push(t("Cuando te quede cómodo, lo charlamos.", "Quedo a disposición para conversarlo cuando le quede cómodo."));
      return { asunto: "Pedido de actualización de sueldo", saludo, parrafos, despedida: t("Gracias,", "Saludos cordiales,"), firma };
    }
    case "honorarios": {
      const de = concepto ? ` por ${concepto}` : "";
      return {
        asunto: `Actualización de honorarios${concepto ? `: ${concepto}` : ""}`,
        saludo,
        parrafos: [
          t(`Te escribo para contarte que voy a actualizar mis honorarios${de}.`, `Le escribo para contarle que voy a actualizar mis honorarios${de}.`),
          `El valor actual, de ${X}, lo fijé en ${desde}. ${segunIpc}. Actualizado por ese índice, el mismo valor hoy es de ${W}.`,
          `${aPartir[0].toUpperCase()}${aPartir.slice(1)}, el valor va a ser de ${W}. No es un aumento real: es el mismo precio de ${desde}, expresado en pesos de hoy. ${adjunto}`,
          t("Gracias por la confianza de siempre. Si querés que lo hablemos, avisame.", "Gracias por la confianza de siempre. Si quiere que lo conversemos, quedo a disposición."),
        ],
        despedida: t("Un saludo,", "Saludos cordiales,"),
        firma,
      };
    }
    case "precio": {
      const de = concepto ? ` de ${concepto}` : "";
      return {
        asunto: concepto ? `Actualización del presupuesto: ${concepto}` : "Actualización de precio",
        saludo,
        parrafos: [
          t(`Te escribo por el presupuesto${de} que te pasé en ${desde}, por ${X}.`, `Le escribo por el presupuesto${de} que le pasé en ${desde}, por ${X}.`),
          `${segunIpc}. Actualizado por ese índice, el mismo presupuesto hoy es de ${W}.`,
          `Ese es el valor que puedo sostener ${aPartir}. ${adjunto}`,
          t("Cualquier duda, escribime.", "Cualquier duda, quedo a disposición."),
        ],
        despedida: t("Un saludo,", "Saludos cordiales,"),
        firma,
      };
    }
    case "deuda-presto":
      return {
        asunto: t("Sobre la plata que te presté", "Sobre el dinero que le presté"),
        saludo,
        parrafos: [
          t(`Te escribo por los ${X} que te presté en ${desde}.`, `Le escribo por los ${X} que le presté en ${desde}.`),
          `${segunIpc}. Eso quiere decir que, para que lo que ${t("me devuelvas", "me devuelva")} valga lo mismo que lo que ${t("te di", "le di")}, hoy son ${W}.`,
          t(
            `Te propongo que lo arreglemos en ese monto. ${adjunto} Si te queda más cómodo en cuotas, lo charlamos.`,
            `Le propongo que lo arreglemos en ese monto. ${adjunto} Si le resulta más cómodo en cuotas, lo conversamos.`,
          ),
        ],
        despedida: t("Gracias,", "Saludos cordiales,"),
        firma,
      };
    case "deuda-debo":
      return {
        asunto: t("Para devolverte lo que me prestaste", "Para devolverle lo que me prestó"),
        saludo,
        parrafos: [
          t(
            `Te escribo por los ${X} que me prestaste en ${desde}. Quiero devolvértelos sin que pierdas plata con la inflación.`,
            `Le escribo por los ${X} que me prestó en ${desde}. Quiero devolvérselos sin que pierda dinero con la inflación.`,
          ),
          `${segunIpc}. En pesos de hoy, esa plata equivale a ${W}.`,
          t(`Te propongo devolverte ese monto. ${adjunto}`, `Le propongo devolverle ese monto. ${adjunto}`),
        ],
        despedida: t("Gracias de nuevo,", "Gracias nuevamente,"),
        firma,
      };
  }
}

/** «Rosario, 6 de octubre de 2026». Sin fecha de emisión (vista previa), sólo la ciudad o nada. */
export function lugarYFecha(p: Pick<Personales, "ciudad">, emitido: string | null | undefined): string {
  const ciudad = p.ciudad.trim();
  const fecha = emitido ? fechaLarga(emitido) : "";
  return [ciudad, fecha].filter(Boolean).join(", ");
}

export function cartaEnTexto(c: Carta, ciudadFecha: string): string {
  return [ciudadFecha, `Asunto: ${c.asunto}`, c.saludo, ...c.parrafos, [c.despedida, c.firma].filter(Boolean).join("\n")]
    .filter(Boolean)
    .join("\n\n");
}
