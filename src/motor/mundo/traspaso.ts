import type { DefinicionCalculadora, ResultadoBase } from "../tipos";
import { ADAPTADORES, esExclusion, type AdaptadorMundo, type ContextoAdaptador } from "./adaptadores";
import { inferirMundo } from "./inferir";
import { calculadoraPrincipal, CLAVE_TRASPASO, edicionPrincipal } from "./rutas";

// Lo que viaja de la calculadora a la página del mundo: el bruto ANUAL (con aguinaldo y pagas extra) en
// la moneda del país. La página lo muestra «por mes» dividido por las pagas de ley del país, que es el
// sueldo del recibo, y la grilla lo compara como anual: ida y vuelta en la misma unidad.
export interface Traspaso {
  mercado: string;
  brutoAnual: number;
}

type Leible = Pick<DefinicionCalculadora, "campos" | "resultado" | "mundo">;

export interface EntradaTraspaso {
  // Edición donde se calculó (ca-fr también vale: se guarda la principal).
  mercado: string;
  calculadora: string;
  // Lo que tiene el formulario: textos tal como se tipearon, o números ya leídos.
  crudos: Readonly<Record<string, unknown>>;
  // Opcional: sin ella alcanza la tabla de adaptadores del motor; con ella también entra un país que
  // declaró `mundo` o que se infiere.
  definicion?: Leible;
  // El resultado del cálculo. Donde el adaptador lee el bruto del resultado (CTC de India, Países Bajos
  // con vakantiegeld o 13.º mes) es ese número, no el campo.
  resultado?: Readonly<Record<string, unknown>>;
}

// Número de lo que tipeó la persona sin saber el locale: el último separador seguido de 1 o 2 dígitos
// es el decimal; uno seguido de 3 dígitos es de miles («1.500» y «1,500» son mil quinientos, que en
// un sueldo es lo que se quiso decir). Sirve solo para el traspaso; la calculadora valida con su locale.
export function leerMonto(valor: unknown): number | null {
  if (typeof valor === "number") return Number.isFinite(valor) && valor > 0 ? valor : null;
  if (typeof valor !== "string") return null;
  const limpio = valor.replace(/[\s  '’]/g, "").replace(/[^\d.,-]/g, "");
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

function adaptadorPara(calculadora: string, principal: string, definicion?: Leible): AdaptadorMundo | null {
  if (definicion?.mundo) return "excluir" in definicion.mundo ? null : definicion.mundo;
  const tabla = ADAPTADORES[calculadora] ?? ADAPTADORES[principal];
  if (tabla) return esExclusion(tabla) ? null : tabla;
  if (!definicion) return null;
  const inf = inferirMundo(definicion);
  return inf.ok ? inf.mundo : null;
}

const positivo = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null);

// En el navegador no están los valores del país: un adaptador que los pide (Perú) tira y se usa el
// campo con las pagas de ley.
function brutoDelResultado(ad: AdaptadorMundo, resultado: Readonly<Record<string, unknown>>, crudos: Readonly<Record<string, unknown>>): number | null {
  const pagas = ad.pagasAnuales ?? 12;
  if (ad.brutoAnual) {
    const textos: Record<string, string | boolean> = {};
    for (const [k, v] of Object.entries(crudos)) if (typeof v === "string" || typeof v === "boolean") textos[k] = v;
    const ctx: ContextoAdaptador = {
      valores: {},
      crudos: textos,
      numero: (id) => {
        throw new Error(`sin el dato ${id} en el navegador`);
      },
    };
    try {
      return positivo(ad.brutoAnual(resultado as ResultadoBase, ctx));
    } catch {
      return null;
    }
  }
  if (ad.brutoResultado) {
    const v = positivo(resultado[ad.brutoResultado]);
    return v === null ? null : ad.periodoNeto === "anio" ? v : v * pagas;
  }
  return null;
}

export function traspasoDe(e: EntradaTraspaso): Traspaso | null {
  const ad = adaptadorPara(e.calculadora, calculadoraPrincipal(e.mercado, e.calculadora), e.definicion);
  if (!ad) return null;
  const { crudos } = e;
  if (ad.traspasoSi && Object.entries(ad.traspasoSi).some(([k, v]) => crudos[k] !== v)) return null;
  const mercado = edicionPrincipal(e.mercado);
  const delResultado = e.resultado ? brutoDelResultado(ad, e.resultado, crudos) : null;
  if (delResultado !== null) return { mercado, brutoAnual: Math.round(delResultado * 100) / 100 };
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
  const brutoAnual = Math.round(anual * 100) / 100;
  return brutoAnual > 0 ? { mercado, brutoAnual } : null;
}

// Sin bruto legible no se guarda nada.
export function guardarTraspaso(e: EntradaTraspaso): void {
  const t = traspasoDe(e);
  if (!t) return;
  try {
    sessionStorage.setItem(CLAVE_TRASPASO, JSON.stringify(t satisfies Traspaso));
  } catch (err) {
    console.warn("[mundo] no se pudo guardar el sueldo para la página del mundo", err);
  }
}

export function leerTraspaso(): Traspaso | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_TRASPASO);
    if (!crudo) return null;
    const t = JSON.parse(crudo) as Partial<Traspaso>;
    return typeof t.mercado === "string" && positivo(t.brutoAnual) !== null ? { mercado: t.mercado, brutoAnual: t.brutoAnual! } : null;
  } catch {
    return null;
  }
}
