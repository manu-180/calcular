// Motor de las licencias especiales del art. 158 LCT. Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — esto no reemplaza al convenio. Calcula el PISO legal: los días del art. 158 sobre
// la fecha que declara la persona, la garantía de día hábil del art. 160 usando el calendario
// oficial de feriados, y el salario del art. 159 (que remite al 155). Un convenio colectivo puede
// dar más días o causales que la LCT no tiene, y en ese caso manda el convenio.
//
// FECHAS EN UTC, como en todo el sitio: cadenas AAAA-MM-DD operadas como días enteros.

import {
  DIVISOR_DIA_COMUN,
  DIVISOR_DIA_LICENCIA,
  LICENCIAS_ESPECIALES,
  type CausaLicencia,
  type LicenciaEspecial,
} from "@/data/licencias-especiales";
import { anioCompleto, esHabil, feriadoDe, primerHabilDesde } from "@/lib/feriados";
import { aISO, parseFechaISO, sumarDias } from "@/lib/licencias";

const r2 = (n: number) => Math.round(n * 100) / 100;

export function licenciaPorCausa(causa: CausaLicencia): LicenciaEspecial {
  const l = LICENCIAS_ESPECIALES.find((x) => x.causa === causa);
  if (!l) throw new Error(`Licencia especial desconocida: ${causa}`);
  return l;
}

export type DiaLicencia = {
  fecha: string;
  /** Nombre del día de la semana, ya en castellano. */
  diaSemana: string;
  habil: boolean;
  /** Nombre del feriado o día no laborable, si lo hay. */
  feriado: string | null;
  /** True si este día se agregó por la garantía del art. 160, no por el plazo del art. 158. */
  agregadoPorArt160: boolean;
};

export type AvisoLicenciaEspecial = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoLicenciaEspecial = {
  licencia: LicenciaEspecial;
  /** Días que fija el art. 158. */
  diasLey: number;
  /** Días que se gozan de hecho: los de la ley más los que agregue el art. 160. */
  diasTotales: number;
  dias: DiaLicencia[];
  inicio: string;
  fin: string;
  /** Primer día hábil en el que se vuelve a trabajar. */
  reintegro: string;
  /** Cuántos días hábiles de trabajo cubre efectivamente la licencia. */
  diasHabilesCubiertos: number;
  /** Valor del día según el art. 155 inc. a: sueldo mensual / 25. 0 si no se declaró sueldo. */
  valorDia: number;
  /** Lo que corresponde cobrar por los días de licencia. */
  totalLicencia: number;
  /** Lo que darían esos mismos días a valor día común (sueldo / 30). */
  totalADiaComun: number;
  /** La diferencia entre los dos: el plus que casi nunca se liquida. */
  plusPorElArt155: number;
  avisos: AvisoLicenciaEspecial[];
};

const DIAS_SEMANA = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
] as const;

export type EntradaLicenciaEspecial = {
  causa: CausaLicencia;
  /** Fecha del hecho (nacimiento, casamiento, fallecimiento, examen), en AAAA-MM-DD. */
  fechaInicio: string;
  /** Si en ese empleo el sábado es día de trabajo. Cambia qué es "día hábil" para el art. 160. */
  sabadoEsHabil: boolean;
  /** Sueldo bruto mensual. 0 si no se declaró. */
  brutoMensual: number;
};

/**
 * Calcula la licencia. La regla del art. 160 se aplica así: si dentro del tramo de días corridos
 * NO queda comprendido ningún día hábil, la licencia se extiende hasta incluir uno. Es la lectura
 * literal de "deberá necesariamente computarse un día hábil", y solo alcanza a los incisos a), c)
 * y d) —el matrimonio y el examen quedan expresamente afuera del artículo—.
 */
export function calcularLicenciaEspecial(
  e: EntradaLicenciaEspecial,
): ResultadoLicenciaEspecial | null {
  const licencia = licenciaPorCausa(e.causa);
  const inicio = parseFechaISO(e.fechaInicio);
  if (!inicio) return null;

  const dias: DiaLicencia[] = [];
  const empujar = (fecha: Date, agregadoPorArt160: boolean) => {
    const f = aISO(fecha);
    const fer = feriadoDe(f);
    dias.push({
      fecha: f,
      diaSemana: DIAS_SEMANA[fecha.getUTCDay()],
      habil: esHabil(fecha, e.sabadoEsHabil),
      feriado: fer ? fer.nombre : null,
      agregadoPorArt160,
    });
  };

  for (let i = 0; i < licencia.dias; i++) empujar(sumarDias(inicio, i), false);

  const avisos: AvisoLicenciaEspecial[] = [];

  // Art. 160: si el tramo no contiene ningún día hábil, se extiende hasta incluir uno.
  if (licencia.garantizaDiaHabil && !dias.some((d) => d.habil)) {
    let siguiente = sumarDias(inicio, licencia.dias);
    for (let i = 0; i < 30 && !dias.some((d) => d.habil); i++) {
      empujar(siguiente, true);
      siguiente = sumarDias(siguiente, 1);
    }
    const agregados = dias.filter((d) => d.agregadoPorArt160).length;
    avisos.push({
      tono: "ok",
      texto: `Los ${licencia.dias} día(s) que fija la ley caen íntegramente en domingo, feriado o día no laborable. El artículo 160 manda que en esta licencia se compute necesariamente un día hábil, así que se ${agregados === 1 ? "agrega un día" : `agregan ${agregados} días`} hasta llegar al primero que lo sea. Es el artículo que casi nadie aplica: sin él, la licencia se disolvía en el fin de semana.`,
    });
  } else if (!licencia.garantizaDiaHabil) {
    avisos.push({
      tono: "atencion",
      texto: `El artículo 160 (el que garantiza un día hábil cuando la licencia cae en domingo o feriado) alcanza SOLO a los incisos a), c) y d): nacimiento y los dos fallecimientos. Esta licencia es el ${licencia.inciso}, así que queda afuera: si los días caen en un fin de semana o en un feriado, no se recuperan.`,
    });
  }

  const fin = dias[dias.length - 1].fecha;
  const finDate = parseFechaISO(fin)!;
  const reintegro = aISO(primerHabilDesde(sumarDias(finDate, 1), e.sabadoEsHabil));

  const bruto = Number.isFinite(e.brutoMensual) ? Math.max(0, e.brutoMensual) : 0;
  const valorDia = r2(bruto / DIVISOR_DIA_LICENCIA);
  const valorDiaComun = bruto / DIVISOR_DIA_COMUN;
  const totalLicencia = r2(valorDia * dias.length);
  const totalADiaComun = r2(valorDiaComun * dias.length);

  if (bruto > 0) {
    avisos.push({
      tono: "ok",
      texto: `El artículo 159 dice que estas licencias son pagas y que el salario se calcula "con arreglo a lo dispuesto en el artículo 155": para el sueldo mensual, ese artículo manda dividir por VEINTICINCO, no por treinta. Son un 20% más por día. Sobre ${dias.length} día(s) la diferencia con el día común es de ${(totalLicencia - totalADiaComun).toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 })}, y es la misma cuenta del plus vacacional.`,
    });
  }

  if (licencia.topeAnual) {
    avisos.push({
      tono: "atencion",
      texto: `Ojo con el tope: son ${licencia.dias} días por examen, con un ${licencia.topeAnual.texto} (${licencia.inciso}). Y hay que acreditar el examen con el certificado del instituto, sobre un plan de estudios oficial o autorizado (art. 161).`,
    });
  }

  if (licencia.causa === "matrimonio") {
    avisos.push({
      tono: "ok",
      texto:
        "Se pueden pegar las vacaciones a la licencia por matrimonio, y no es un favor: el último párrafo del art. 164 dice que el empleador DEBE conceder el goce de las vacaciones acumuladas a esta licencia si se lo pide el trabajador, aun cuando eso altere la época en la que le tocaban.",
    });
  }

  const anio = Number(e.fechaInicio.slice(0, 4));
  if (!anioCompleto(anio)) {
    avisos.push({
      tono: "atencion",
      texto: `Para ${anio} todavía no se publicó la resolución que fija los días no laborables con fines turísticos (el Poder Ejecutivo puede fijar hasta tres por año, y tiene plazo hasta 50 días antes de que termine el año anterior). El cálculo usa los feriados de la Ley 27.399, que sí están; si después se agrega un día turístico en ese tramo, las fechas pueden correrse.`,
    });
  }

  return {
    licencia,
    diasLey: licencia.dias,
    diasTotales: dias.length,
    dias,
    inicio: dias[0].fecha,
    fin,
    reintegro,
    diasHabilesCubiertos: dias.filter((d) => d.habil).length,
    valorDia,
    totalLicencia,
    totalADiaComun,
    plusPorElArt155: r2(totalLicencia - totalADiaComun),
    avisos,
  };
}
