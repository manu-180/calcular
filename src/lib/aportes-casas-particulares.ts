// Motor de los aportes de casas particulares (lo que el empleador le paga a ARCA). Funciones puras.
//
// ⚠️ LO QUE ESTA CALCULADORA RESUELVE Y NINGUNA OTRA: además del total del mes, calcula las DOS
// diferencias que ARCA declara como piso de derechos y que ninguna tabla publicada muestra —
// cuánto falta para que el aporte de obra social iguale la cuota de la categoría de 16 o más horas
// (sin eso el trabajador no accede a las prestaciones) y cuánto falta para que las contribuciones
// computen a los efectos jubilatorios. Con menos de 16 horas semanales, el empleador paga en regla
// y el trabajador igual queda sin cobertura si nadie completa la diferencia.

import {
  CONDICIONES,
  RANGOS,
  REGLAS_APORTES,
  TABLA_APORTES,
  type CondicionTrabajador,
  type FilaAportes,
  type RangoHoras,
} from "@/data/aportes-casas-particulares";

export type EntradaAportes = {
  /** Horas que el trabajador le presta a ESTE empleador por semana. */
  horasSemanales: number;
  condicion: CondicionTrabajador;
  /** Cuántas personas empleadas en las mismas condiciones (para el total del mes). */
  cantidadTrabajadores: number;
};

export type AvisoAportes = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoAportes = {
  rango: RangoHoras;
  rangoEtiqueta: string;
  condicionEtiqueta: string;
  /** La fila de la tabla oficial que corresponde. */
  fila: FilaAportes;
  /** Total por un trabajador. */
  totalPorTrabajador: number;
  /** Total del mes por la cantidad de trabajadores indicada. */
  totalMensual: number;
  /** Cuánto del total es la ART, en porcentaje: en los rangos bajos es la parte más cara. */
  proporcionArt: number;
  /** Diferencia hasta la cuota de obra social de 16+ horas. 0 si ya la alcanza o no corresponde. */
  faltaParaObraSocial: number;
  /** Diferencia hasta la contribución al SIPA de 16+ horas. 0 si ya la alcanza o no corresponde. */
  faltaParaJubilacion: number;
  avisos: AvisoAportes[];
};

export function rangoPorHoras(horasSemanales: number): RangoHoras {
  if (horasSemanales >= 16) return "16-o-mas";
  if (horasSemanales >= 12) return "12-a-16";
  return "menos-12";
}

export function filaDe(condicion: CondicionTrabajador, rango: RangoHoras): FilaAportes {
  const fila = TABLA_APORTES[condicion].find((f) => f.rango === rango);
  if (!fila) throw new Error(`Sin fila para ${condicion} / ${rango}`);
  return fila;
}

/** La fila de 16+ horas es el piso de derechos que fija ARCA para obra social y jubilación. */
function pisoDeDerechos(condicion: CondicionTrabajador): FilaAportes {
  return filaDe(condicion, "16-o-mas");
}

export function calcularAportes(entrada: EntradaAportes): ResultadoAportes {
  const horas = Math.max(0, entrada.horasSemanales);
  const cantidad = Math.max(1, Math.floor(entrada.cantidadTrabajadores || 1));
  const rango = rangoPorHoras(horas);
  const fila = filaDe(entrada.condicion, rango);
  const piso = pisoDeDerechos(entrada.condicion);

  const faltaParaObraSocial =
    fila.obraSocial === null || piso.obraSocial === null
      ? 0
      : Math.max(0, redondear(piso.obraSocial - fila.obraSocial));
  const faltaParaJubilacion =
    fila.sipa === null || piso.sipa === null ? 0 : Math.max(0, redondear(piso.sipa - fila.sipa));

  const avisos: AvisoAportes[] = [];

  if (rango === "16-o-mas") {
    avisos.push({
      tono: "ok",
      texto:
        "Con 16 horas semanales o más, el aporte alcanza el piso que ARCA exige para acceder a las prestaciones de la obra social y para que las contribuciones computen a los efectos jubilatorios.",
    });
  } else {
    if (faltaParaObraSocial > 0) {
      avisos.push({
        tono: "atencion",
        texto: `El empleador paga lo que corresponde por ${horas} horas semanales, pero con este rango el aporte de obra social NO alcanza el piso: faltan ${pesos(faltaParaObraSocial)} por mes para llegar a la cuota de la categoría de 16 o más horas, que es la que habilita las prestaciones. ${REGLAS_APORTES.pisoObraSocial}`,
      });
    }
    if (faltaParaJubilacion > 0) {
      avisos.push({
        tono: "atencion",
        texto: `Lo mismo con la jubilación: faltan ${pesos(faltaParaJubilacion)} por mes para que las contribuciones computen. ARCA lo dice expresamente: si las contribuciones del empleador no alcanzan esa suma, el trabajador puede pagar la diferencia.`,
      });
    }
  }

  if (entrada.condicion === "activo-menor-18") {
    avisos.push({
      tono: "atencion",
      texto:
        "Por ser menor de 18 años no se ingresan contribuciones al SIPA, así que este período no computa antigüedad jubilatoria. El resto (obra social y ART) se paga igual.",
    });
  }

  if (entrada.condicion === "jubilado") {
    avisos.push({
      tono: "atencion",
      texto:
        "Por estar jubilado no se ingresan aportes de obra social (la cobertura la da el INSSJP, PAMI), pero sí las contribuciones al SIPA y la cuota de ART, que es obligatoria para todo el personal.",
    });
  }

  if (horas > 48) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "La jornada máxima del régimen es de 48 horas semanales (art. 14.1 inc. a de la Ley 26.844). Por encima de eso corresponde pagar horas suplementarias con recargo, no ampliar la jornada.",
    });
  }

  return {
    rango,
    rangoEtiqueta: RANGOS.find((r) => r.id === rango)!.etiqueta,
    condicionEtiqueta: CONDICIONES.find((c) => c.id === entrada.condicion)!.etiqueta,
    fila,
    totalPorTrabajador: fila.total,
    totalMensual: redondear(fila.total * cantidad),
    proporcionArt: redondear((fila.art / fila.total) * 100, 1),
    faltaParaObraSocial,
    faltaParaJubilacion,
    avisos,
  };
}

function redondear(n: number, decimales = 2): number {
  const f = 10 ** decimales;
  return Math.round(n * f) / f;
}

function pesos(n: number): string {
  return `$${n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
