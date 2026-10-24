import type { ConversionHora } from "./tipos";

// Un precio leído hace más de esto no se publica: el país queda sin ese producto hasta la próxima
// lectura. Así un precio viejo nunca aparece aunque el refresco deje de correr.
export const VIGENCIA_PRECIO_DIAS = 120;

// Una «jornada» en la página son 8 horas, en todos los países, para que los días se comparen entre sí.
export const HORAS_JORNADA = 8;

// Piso del check: con menos países el índice no se publica como «mundial».
export const MINIMO_PAISES = 10;

export const SEMANAS_POR_ANIO = 52;

// El salario de la ley llevado a una hora de trabajo:
// - hora: la ley ya fija el valor por hora.
// - mes: mensual × pagas al año ÷ 52 semanas ÷ horas semanales (pagas 12 salvo que la ley lo pague 14 veces).
// - anio: anual ÷ 52 ÷ horas semanales.
// - semana: semanal ÷ horas semanales.
// - dia: con días pagados por semana (el diario cubre el descanso), diario × días ÷ horas semanales;
//   si no, diario ÷ horas de la jornada diaria.
// - divisor: mensual ÷ el divisor horario que fija la propia norma (Uruguay 200, Luxemburgo 173).
export function porHoraDe(c: ConversionHora): number {
  switch (c.tipo) {
    case "hora":
      return c.monto;
    case "mes":
      return (c.monto * (c.pagas ?? 12)) / SEMANAS_POR_ANIO / req(c.horasSemana, "horasSemana");
    case "anio":
      return c.monto / SEMANAS_POR_ANIO / req(c.horasSemana, "horasSemana");
    case "semana":
      return c.monto / req(c.horasSemana, "horasSemana");
    case "dia":
      return c.diasPagados ? (c.monto * c.diasPagados) / req(c.horasSemana, "horasSemana") : c.monto / req(c.horasDia, "horasDia");
    case "divisor":
      return c.monto / req(c.divisor, "divisor");
  }
}

function req(n: number | undefined, nombre: string): number {
  if (!n || !Number.isFinite(n) || n <= 0) throw new Error(`falta ${nombre} para pasar el salario a horas`);
  return n;
}

export function horasDe(precioLocal: number, porHora: number): number {
  if (!(precioLocal > 0) || !(porHora > 0)) throw new Error("precio o salario por hora inválido");
  return precioLocal / porHora;
}

export function diasEntre(desde: string, hasta: string): number {
  return Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${desde}T00:00:00Z`)) / 86_400_000);
}

export function precioVigente(consultadoEl: string, hoy: string): boolean {
  const d = diasEntre(consultadoEl, hoy);
  return Number.isFinite(d) && d >= 0 && d <= VIGENCIA_PRECIO_DIAS;
}

// Horas para mostrar: menos de una hora va en minutos; menos de 10, con un decimal; más, enteras.
export type Duracion = { unidad: "min"; valor: number } | { unidad: "h"; valor: number; decimales: 0 | 1 };

export function duracion(horas: number): Duracion {
  if (horas < 1) return { unidad: "min", valor: Math.max(1, Math.round(horas * 60)) };
  if (horas < 10) return { unidad: "h", valor: Math.round(horas * 10) / 10, decimales: 1 };
  return { unidad: "h", valor: Math.round(horas), decimales: 0 };
}

export function jornadas(horas: number): number {
  return horas / HORAS_JORNADA;
}
