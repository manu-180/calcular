import { CATEGORIAS, TOPE_MAXIMO, type Categoria } from "@/data/monotributo";

export type Actividad = "servicios" | "venta";

export type ResultadoCalculo =
  | { tipo: "ok"; categoria: Categoria; cuota: Cuota; margenHastaTope: number; porcentajeSobreFacturacion: number | null }
  | { tipo: "excedido"; tope: number };

export type Cuota = {
  impuestoIntegrado: number;
  sipa: number;
  obraSocial: number;
  total: number;
};

export function categoriaParaFacturacion(facturacionAnual: number): Categoria | null {
  if (facturacionAnual > TOPE_MAXIMO) return null;
  return CATEGORIAS.find((c) => facturacionAnual <= c.ingresosBrutosMax) ?? null;
}

export function cuotaMensual(
  categoria: Categoria,
  actividad: Actividad,
  trabajaEnRelacionDeDependencia: boolean
): Cuota {
  const impuestoIntegrado =
    actividad === "servicios" ? categoria.impuestoServicios : categoria.impuestoVenta;
  // Quien además trabaja en relación de dependencia ya aporta jubilación y obra social
  // por su empleo, por lo que solo paga el impuesto integrado.
  const sipa = trabajaEnRelacionDeDependencia ? 0 : categoria.sipa;
  const obraSocial = trabajaEnRelacionDeDependencia ? 0 : categoria.obraSocial;
  return {
    impuestoIntegrado,
    sipa,
    obraSocial,
    total: impuestoIntegrado + sipa + obraSocial,
  };
}

export function calcular(
  facturacionAnual: number,
  actividad: Actividad,
  trabajaEnRelacionDeDependencia: boolean
): ResultadoCalculo {
  const categoria = categoriaParaFacturacion(facturacionAnual);
  if (!categoria) return { tipo: "excedido", tope: TOPE_MAXIMO };
  const cuota = cuotaMensual(categoria, actividad, trabajaEnRelacionDeDependencia);
  const facturacionMensualPromedio = facturacionAnual / 12;
  return {
    tipo: "ok",
    categoria,
    cuota,
    margenHastaTope: categoria.ingresosBrutosMax - facturacionAnual,
    porcentajeSobreFacturacion:
      facturacionMensualPromedio > 0 ? (cuota.total / facturacionMensualPromedio) * 100 : null,
  };
}

export type ParametrosMonotributo = {
  /** Ingresos brutos de los últimos 12 meses. */
  ingresos: number;
  /** Superficie afectada a la actividad hoy, en m². 0 = no se informa. */
  superficieM2?: number;
  /** Energía eléctrica consumida en los últimos 12 meses, en kW. 0 = no se informa. */
  energiaKw?: number;
  /** Alquileres devengados en los últimos 12 meses. 0 = no se informa. */
  alquileres?: number;
};

export type CategoriaPorParametros =
  | { tipo: "ok"; categoria: Categoria; porIngresos: Categoria; manda: "ingresos" | "superficie" | "energia" | "alquileres" }
  | { tipo: "excedido"; parametro: "ingresos" | "superficie" | "energia" | "alquileres" };

/**
 * La categoría que corresponde mirando TODOS los parámetros, no solo la facturación. Ley 24.977,
 * Anexo, art. 9: «Se considerará al responsable correctamente categorizado, cuando se encuadre en
 * la categoría que corresponda al mayor valor de sus parámetros —ingresos brutos, magnitudes
 * físicas o alquileres devengados—». Superar el máximo de K en cualquiera es exclusión.
 */
export function categoriaPorParametros(p: ParametrosMonotributo): CategoriaPorParametros {
  const criterios = [
    ["ingresos", p.ingresos, (c: Categoria) => c.ingresosBrutosMax],
    ["superficie", p.superficieM2 ?? 0, (c: Categoria) => c.superficieM2],
    ["energia", p.energiaKw ?? 0, (c: Categoria) => c.energiaKw],
    ["alquileres", p.alquileres ?? 0, (c: Categoria) => c.alquileresMax],
  ] as const;

  let indice = 0;
  let manda: "ingresos" | "superficie" | "energia" | "alquileres" = "ingresos";
  let porIngresos = CATEGORIAS[0];
  for (const [nombre, valor, tope] of criterios) {
    const i = CATEGORIAS.findIndex((c) => valor <= tope(c));
    if (i === -1) return { tipo: "excedido", parametro: nombre };
    if (nombre === "ingresos") porIngresos = CATEGORIAS[i];
    if (i > indice) {
      indice = i;
      manda = nombre;
    }
  }
  return { tipo: "ok", categoria: CATEGORIAS[indice], porIngresos, manda };
}

export type ResultadoRecategorizacion =
  | { tipo: "excedido"; tope: number; actual: Categoria }
  | {
      tipo: "ok";
      actual: Categoria;
      nueva: Categoria;
      movimiento: "sube" | "baja" | "igual";
      cuotaActual: Cuota;
      cuotaNueva: Cuota;
      diferenciaMensual: number; // positiva si la nueva cuota es más cara
    };

export function compararRecategorizacion(
  catActual: string,
  facturacionAnual: number,
  actividad: Actividad,
  trabajaEnRelacionDeDependencia: boolean
): ResultadoRecategorizacion | null {
  const actual = CATEGORIAS.find((c) => c.cat === catActual);
  if (!actual) return null;

  const nueva = categoriaParaFacturacion(facturacionAnual);
  if (!nueva) return { tipo: "excedido", tope: TOPE_MAXIMO, actual };

  const idxActual = CATEGORIAS.indexOf(actual);
  const idxNueva = CATEGORIAS.indexOf(nueva);
  const cuotaActual = cuotaMensual(actual, actividad, trabajaEnRelacionDeDependencia);
  const cuotaNueva = cuotaMensual(nueva, actividad, trabajaEnRelacionDeDependencia);

  return {
    tipo: "ok",
    actual,
    nueva,
    movimiento: idxNueva > idxActual ? "sube" : idxNueva < idxActual ? "baja" : "igual",
    cuotaActual,
    cuotaNueva,
    diferenciaMensual: cuotaNueva.total - cuotaActual.total,
  };
}

export { formatARS } from "./formato";
