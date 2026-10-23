import type { DefinicionCalculadora } from "../tipos";
import { ADAPTADORES, esExclusion, type AdaptadorMundo } from "./adaptadores";
import { inferirMundo } from "./inferir";
import { CLAVE_TRASPASO } from "./rutas";

export interface Traspaso {
  mercado: string;
  brutoMensual: number;
}

type Leible = Pick<DefinicionCalculadora, "campos" | "resultado" | "mundo">;

// Número de lo que tipeó la persona sin saber el locale: el último separador seguido de 1 o 2 dígitos
// es el decimal; uno seguido de 3 dígitos es de miles («1.500» y «1,500» son mil quinientos, que en
// un sueldo es lo que se quiso decir). Sirve solo para el traspaso; la calculadora valida con su locale.
export function leerMonto(valor: unknown): number | null {
  if (typeof valor === "number") return Number.isFinite(valor) && valor > 0 ? valor : null;
  if (typeof valor !== "string") return null;
  const limpio = valor.replace(/[\s  '’]/g, "").replace(/[^\d.,-]/g, "");
  if (!/\d/.test(limpio)) return null;
  const ultimo = Math.max(limpio.lastIndexOf("."), limpio.lastIndexOf(","));
  let texto = limpio;
  if (ultimo >= 0) {
    const sep = limpio[ultimo];
    const decimales = limpio.length - ultimo - 1;
    const unaVez = limpio.indexOf(sep) === ultimo;
    const conOtro = limpio.includes(sep === "." ? "," : ".");
    const esDecimal = unaVez && decimales > 0 && (conOtro || decimales !== 3);
    texto = esDecimal ? `${limpio.slice(0, ultimo).replace(/[.,]/g, "")}.${limpio.slice(ultimo + 1)}` : limpio.replace(/[.,]/g, "");
  }
  const n = Number(texto);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function adaptadorPara(calculadora: string, definicion?: Leible): AdaptadorMundo | null {
  if (definicion?.mundo) return "excluir" in definicion.mundo ? null : definicion.mundo;
  const tabla = ADAPTADORES[calculadora];
  if (tabla) return esExclusion(tabla) ? null : tabla;
  if (!definicion) return null;
  const inf = inferirMundo(definicion);
  return inf.ok ? inf.mundo : null;
}

// Bruto anual / 12 de lo que la persona cargó: con aguinaldo u otras pagas de ley, el mensual que
// viaja es el total del año repartido en 12 (compararDesde lo multiplica por 12).
export function brutoMensualDeTraspaso(calculadora: string, crudos: Readonly<Record<string, unknown>>, definicion?: Leible): number | null {
  const ad = adaptadorPara(calculadora, definicion);
  if (!ad) return null;
  if (ad.traspasoSi && Object.entries(ad.traspasoSi).some(([k, v]) => crudos[k] !== v)) return null;
  const base = leerMonto(crudos[ad.bruto]);
  if (base === null) return null;
  const monto = base + (ad.sumarAlBruto ?? []).reduce((suma, id) => suma + (leerMonto(crudos[id]) ?? 0), 0);
  const pagas = ad.pagasAnuales ?? 12;
  let anual: number;
  if (ad.periodoPago) {
    const opcion = crudos[ad.periodoPago.campo];
    const aMes = typeof opcion === "string" ? ad.periodoPago.aMes[opcion] : undefined;
    if (aMes === undefined) return null;
    anual = monto * aMes * (ad.periodoBruto === "anio" ? 12 : pagas);
  } else {
    anual = ad.periodoBruto === "anio" ? monto : monto * pagas;
  }
  const mensual = Math.round((anual / 12) * 100) / 100;
  return mensual > 0 ? mensual : null;
}

// crudos: lo que tiene el formulario (textos tal como se tipearon, o números ya leídos). definicion es
// opcional: sin ella alcanza la tabla de adaptadores del motor; con ella también entra un país que
// declaró `mundo` o que se infiere. Sin bruto legible no se guarda nada.
export function guardarTraspaso(mercado: string, calculadora: string, crudos: Readonly<Record<string, unknown>>, definicion?: Leible): void {
  const brutoMensual = brutoMensualDeTraspaso(calculadora, crudos, definicion);
  if (brutoMensual === null) return;
  try {
    sessionStorage.setItem(CLAVE_TRASPASO, JSON.stringify({ mercado, brutoMensual } satisfies Traspaso));
  } catch (err) {
    console.warn("[mundo] no se pudo guardar el sueldo para la página del mundo", err);
  }
}

export function leerTraspaso(): Traspaso | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_TRASPASO);
    if (!crudo) return null;
    const t = JSON.parse(crudo) as Partial<Traspaso>;
    return typeof t.mercado === "string" && typeof t.brutoMensual === "number" && Number.isFinite(t.brutoMensual) && t.brutoMensual > 0 ? { mercado: t.mercado, brutoMensual: t.brutoMensual } : null;
  } catch {
    return null;
  }
}
