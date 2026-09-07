// Motor del salario mínimo, vital y móvil. Funciones puras, sin estado ni fetch.
//
// LAS TRES COSAS QUE CASI NINGUNA NOTA DICE, y que son todo el contenido de esta calculadora:
//
//   1. El número que se publica es el de la JORNADA LEGAL COMPLETA. La propia resolución lo dice:
//      es para "los trabajadores mensualizados que cumplen la jornada legal completa de trabajo…
//      con excepción de las situaciones previstas en los artículos 92 ter y 198… que lo percibirán
//      en su debida proporción". Quien trabaja media jornada NO tiene derecho a ese número: tiene
//      derecho a la mitad. Publicar el titular sin esa frase le contesta mal a media Argentina.
//   2. El valor por hora NO se prorratea: $1.919 la hora es $1.919 la hora se trabajen 20 o 48
//      horas. Lo que se prorratea es el mensual. Por eso el cálculo se hace por las dos vías y
//      tienen que cerrar (mensual × proporción ≈ porHora × horas mensuales).
//   3. El SMVM es el piso ABSOLUTO, no el sueldo de nadie con convenio: si hay convenio colectivo,
//      el piso real es la escala de la categoría, que en toda actividad registrada es más alta.
//
// La escala sale de `SMVM_SERIE` (data/desempleo.ts), fuente única. Acá no se copia ningún monto.

import { SMVM_SERIE, SMVM_ULTIMO, type MesSmvm } from "@/data/desempleo";
import { smvmVigente } from "@/lib/desempleo";
import {
  HORAS_MENSUALES_JORNADA_COMPLETA as HORAS_MES,
  JORNADA_LEGAL_SEMANAL as JORNADA,
} from "@/data/salario-minimo";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type AvisoSmvm = { tono: "info" | "atencion" | "alerta"; texto: string };

export type ResultadoSalarioMinimo = {
  /** Mes de la escala efectivamente usado. */
  mes: MesSmvm;
  /** ¿El mes pedido todavía no llegó? (la Res. 4/2026 dejó fijados meses futuros). */
  esFuturo: boolean;
  /** Horas semanales tomadas para el cálculo, ya acotadas a la jornada legal. */
  horasSemanales: number;
  /** Fracción de la jornada legal: 1 en jornada completa. */
  proporcion: number;
  /** Horas mensuales equivalentes a esas horas semanales, en la escala de la resolución. */
  horasMensuales: number;
  /** El piso mensual que le corresponde a esa jornada. */
  mensual: number;
  /** El piso mensual de la jornada legal completa, para comparar. */
  mensualJornadaCompleta: number;
  /** Valor hora oficial del jornalizado: NO se prorratea. */
  porHora: number;
  /** Control cruzado: el mismo piso calculado por horas. Tiene que dar lo mismo salvo redondeo. */
  mensualPorHoras: number;
  comparacion: {
    sueldoBruto: number;
    diferencia: number;
    estado: "debajo" | "igual" | "encima";
  } | null;
  avisos: AvisoSmvm[];
};

/** El mes de la escala para un período AAAA-MM; sin período, el vigente por fecha. */
export function mesDeEscala(periodo?: string): MesSmvm {
  if (!periodo) return smvmVigente().mes;
  return SMVM_SERIE.find((m) => m.periodo === periodo) ?? smvmVigente().mes;
}

export function calcularSalarioMinimo(params: {
  /** Período AAAA-MM. Por defecto, el vigente por fecha. */
  periodo?: string;
  /** Horas semanales trabajadas. Por defecto, la jornada legal completa. */
  horasSemanales?: number;
  /** Sueldo bruto mensual actual, para comparar contra el piso. Opcional. */
  sueldoBruto?: number;
}): ResultadoSalarioMinimo {
  const mes = mesDeEscala(params.periodo);
  const vigente = smvmVigente().mes;
  const esFuturo = mes.periodo > vigente.periodo;

  const pedidas = Number.isFinite(params.horasSemanales as number)
    ? (params.horasSemanales as number)
    : JORNADA;
  const excedeJornada = pedidas > JORNADA;
  const horasSemanales = Math.min(Math.max(pedidas || 0, 0), JORNADA);

  const proporcion = horasSemanales / JORNADA;
  const horasMensuales = r2(horasSemanales * (HORAS_MES / JORNADA));
  const mensual = r2(mes.mensual * proporcion);
  const mensualPorHoras = r2(mes.porHora * horasMensuales);

  const bruto = Math.max(0, params.sueldoBruto || 0);
  const comparacion = bruto > 0
    ? {
        sueldoBruto: bruto,
        diferencia: r2(bruto - mensual),
        estado: (bruto < mensual ? "debajo" : bruto > mensual ? "encima" : "igual") as
          | "debajo"
          | "igual"
          | "encima",
      }
    : null;

  const avisos: AvisoSmvm[] = [];

  if (excedeJornada) {
    avisos.push({
      tono: "atencion",
      texto:
        `Cargaste más de ${JORNADA} horas semanales, que es la jornada legal. El piso no sube por ` +
        "encima del salario mínimo de jornada completa: las horas que la superan son horas extra y " +
        "se pagan con recargo del 50% o del 100%, que es otro cálculo.",
    });
  }

  if (proporcion > 0 && proporcion < 1) {
    avisos.push({
      tono: "info",
      texto:
        "Trabajás menos que la jornada legal, así que el piso es la proporción: la resolución exceptúa " +
        "expresamente a los artículos 92 ter y 198 de la LCT, que «lo percibirán en su debida proporción». " +
        "El valor por hora, en cambio, no se prorratea.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El salario mínimo es un piso absoluto, no un sueldo de referencia: si tu actividad tiene convenio " +
      "colectivo, el piso que te corresponde es el básico de tu categoría, que es más alto. El SMVM sólo " +
      "manda cuando no hay convenio o cuando la escala del convenio quedó por debajo.",
  });

  avisos.push({
    tono: "info",
    texto:
      "Es un monto en dinero y excluye las asignaciones familiares: el artículo 118 de la LCT dice que " +
      "esos subsidios «son independientes del derecho a la percepción del salario mínimo vital», y la " +
      "resolución lo repite en su artículo 1º.",
  });

  if (esFuturo) {
    avisos.push({
      tono: "info",
      texto:
        `Estás mirando ${mes.periodo}, un mes que todavía no llegó. No es una proyección nuestra: la ` +
        "Resolución 4/2026 lo dejó fijado en el Boletín Oficial junto con todos los meses hasta abril de 2027.",
    });
  }

  if (mes.periodo === SMVM_ULTIMO.periodo) {
    avisos.push({
      tono: "info",
      texto:
        `${mes.periodo} es el último mes con norma dictada. Para los meses posteriores hace falta una ` +
        "resolución nueva del Consejo del Salario: acá no se proyecta ningún monto.",
    });
  }

  return {
    mes,
    esFuturo,
    horasSemanales,
    proporcion,
    horasMensuales,
    mensual,
    mensualJornadaCompleta: mes.mensual,
    porHora: mes.porHora,
    mensualPorHoras,
    comparacion,
    avisos,
  };
}

/** Variación porcentual de un mes contra el anterior de la escala. null en el primero. */
export function variacionMensual(periodo: string): number | null {
  const i = SMVM_SERIE.findIndex((m) => m.periodo === periodo);
  if (i <= 0) return null;
  return Math.round(((SMVM_SERIE[i].mensual / SMVM_SERIE[i - 1].mensual) - 1) * 1000) / 10;
}
