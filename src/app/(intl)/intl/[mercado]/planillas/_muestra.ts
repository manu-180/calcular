import type { ProductoIntl } from "@/lib/pagos/catalogo-intl";
import { mapaDePlanillaIntl } from "@/lib/pagos/ofertas-servidor";
import { contextoDesdeSerializado } from "@/motor/calculo";
import { formatearFecha, formatearMoneda, formatearNumero, formatearPorcentaje } from "@/motor/formato";
import { formatearFilas } from "@/motor/formulario";
import type { Campo, ContextoSerializado, DefinicionCalculadora, FechaISO } from "@/motor/tipos";
import type { ContextoSitio } from "@/motor/ui/contexto";

export interface FilaMuestra {
  fila: number | null;
  etiqueta: string;
  valor: string;
  tono: "entrada" | "resultado" | "total";
}

export interface MuestraPlanilla {
  archivo: string;
  hoja: string;
  pestanas: string[];
  calculo: string;
  filas: FilaMuestra[];
}

const MAX_ENTRADAS = 4;
const MAX_RESULTADOS = 6;

function porDefecto(c: Campo, hoy: FechaISO, primeraOpcion: string | null): unknown {
  switch (c.tipo) {
    case "si-no":
      return c.porDefecto ?? false;
    case "fecha":
      return c.porDefecto === "hoy" || c.porDefecto === undefined ? hoy : c.porDefecto;
    case "opcion":
    case "region":
    case "opcion-dato":
      return c.porDefecto ?? primeraOpcion;
    default:
      return c.porDefecto ?? (c.requerido === false ? null : 0);
  }
}

function textoEntrada(c: Campo, valor: unknown, ctx: ContextoSerializado): string | null {
  if (valor === null || valor === undefined) return null;
  switch (c.tipo) {
    case "moneda":
      return typeof valor === "number" ? formatearMoneda(valor, ctx.locale, ctx.moneda, undefined, ctx.simbolos?.[ctx.moneda]) : null;
    case "numero":
    case "entero":
      return typeof valor === "number" ? formatearNumero(valor, ctx.locale) : null;
    case "porcentaje":
      return typeof valor === "number" ? formatearPorcentaje(valor, ctx.locale) : null;
    case "fecha":
      return typeof valor === "string" ? formatearFecha(valor as FechaISO, ctx.locale, "corta") : null;
    case "si-no":
      return valor ? "Sí" : "No";
    case "opcion":
      return c.opciones.find((o) => o.valor === valor)?.etiqueta ?? null;
    case "region":
      return ctx.regiones.find((r) => r.id === valor)?.nombre ?? null;
    default:
      return typeof valor === "string" ? valor : null;
  }
}

// La hoja principal de la planilla (la del sueldo neto si la hay) con los datos que trae al abrirla y
// lo que calcula hoy con los valores oficiales vigentes: por el mismo calcular() de la calculadora
// gratis, no una captura que quede vieja. Sin mapa (un build sin planilla) o con un cálculo que no da,
// no hay vista previa y la landing sale sin ella.
export function muestraDePlanilla(ctx: ContextoSitio, producto: ProductoIntl): MuestraPlanilla | null {
  const mapa = mapaDePlanillaIntl(producto);
  if (!mapa) return null;
  const m = ctx.mercado;
  const candidatos = mapa.bloques
    .map((b) => ({ b, def: ctx.registro.calculadora(m.codigo, b.calculadora)?.definicion }))
    .filter((x): x is { b: (typeof mapa.bloques)[number]; def: DefinicionCalculadora } => !!x.def && !!x.b.muestra);
  const elegido = candidatos.find((x) => x.def.concepto === "sueldo-neto") ?? candidatos[0];
  if (!elegido) return null;
  const { b, def } = elegido;
  const pagina = ctx.registro.pagina(m.codigo, def.slug, ctx.fecha, ctx.modo);
  if (!pagina) return null;
  const props = pagina.props;

  const entrada: Record<string, unknown> = {};
  for (const c of def.campos) {
    const dinamicas = c.tipo === "opcion-dato" ? props.opcionesDinamicas[c.id] : undefined;
    const primera = c.tipo === "opcion" ? (c.opciones[0]?.valor ?? null) : c.tipo === "region" ? (props.contexto.regiones[0]?.id ?? null) : (dinamicas?.[0]?.valor ?? null);
    entrada[c.id] = c.id in b.muestra! ? b.muestra![c.id] : porDefecto(c, ctx.fecha, primera);
  }
  let resultado;
  try {
    resultado = def.calcular(entrada as never, props.valores as never, contextoDesdeSerializado(props.contexto));
  } catch {
    return null;
  }
  const calculadas = formatearFilas(def, resultado, props.contexto);
  if (!calculadas.length) return null;

  const filas: FilaMuestra[] = [];
  for (const c of def.campos) {
    if (filas.length >= MAX_ENTRADAS) break;
    if (!(c.id in b.muestra!)) continue;
    const texto = textoEntrada(c, entrada[c.id], props.contexto);
    const celda = b.celdas[c.id];
    if (texto === null || !celda) continue;
    filas.push({ fila: Number(celda.ref.replace(/^[A-Z]+/, "")), etiqueta: c.etiqueta, valor: texto, tono: "entrada" });
  }
  if (!filas.length) return null;
  const clave = calculadas.find((f) => f.destacada) ?? calculadas[calculadas.length - 1];
  const resto = calculadas.filter((f) => f !== clave).slice(0, MAX_RESULTADOS - 1);
  for (const f of resto) filas.push({ fila: null, etiqueta: f.etiqueta, valor: f.texto, tono: "resultado" });
  filas.push({ fila: null, etiqueta: clave.etiqueta, valor: clave.texto, tono: "total" });

  return { archivo: producto.archivo, hoja: b.hoja, pestanas: [...new Set(mapa.bloques.map((x) => x.hoja))], calculo: def.slug, filas };
}
