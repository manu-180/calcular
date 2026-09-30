import "server-only";
import { servicio } from "@/lib/supabase/servicio";
import { PAGINAS, tituloDeRuta } from "@/data/navegacion";
import { CATALOGO, productoPorSlug } from "@/lib/mp";
import { generarLecturas } from "@/lib/panel/lecturas";
import type {
  Busqueda,
  Compra,
  Cuentas,
  EmbudoProducto,
  EnVivo,
  FilaFuente,
  FilaPagina,
  Kpi,
  KpiClave,
  PanelDatos,
  PasoEmbudo,
  Punto,
  Rango,
  Reparto,
} from "@/lib/panel/tipos";

const ZONA = "America/Argentina/Buenos_Aires";
const DIA_MS = 86_400_000;
const DIAS: Record<Rango, number> = { hoy: 1, "7d": 7, "30d": 30, "90d": 90 };
const KPIS: KpiClave[] = ["visitantes", "usos", "tiempo", "interes", "checkouts", "ventas", "ingresos"];
const PASOS: PasoEmbudo["paso"][] = ["vio_oferta", "abrio_compra", "fue_a_pagar", "pago"];
const ESTADOS: Compra["estado"][] = ["aprobado", "reembolsado", "contracargo"];

type Crudo = Record<string, unknown>;

export function limitesDelRango(rango: Rango, ahora: Date = new Date()): { desde: Date; hasta: Date } {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZoneName: "longOffset",
  }).formatToParts(ahora);
  const parte = (tipo: Intl.DateTimeFormatPartTypes) => partes.find((p) => p.type === tipo)?.value ?? "";
  const zona = parte("timeZoneName").replace("GMT", "");
  const offset = /^[+-]\d{2}:\d{2}$/.test(zona) ? zona : zona === "" ? "+00:00" : "-03:00";
  const medianoche = new Date(`${parte("year")}-${parte("month")}-${parte("day")}T00:00:00${offset}`);
  if (Number.isNaN(medianoche.getTime())) throw new Error(`No se pudo calcular la medianoche argentina para ${ahora.toISOString()}`);
  return { desde: new Date(medianoche.getTime() - (DIAS[rango] - 1) * DIA_MS), hasta: ahora };
}

function objeto(valor: unknown, campo: string): Crudo {
  if (!valor || typeof valor !== "object" || Array.isArray(valor)) {
    throw new Error(`ca_panel devolvió un formato inesperado: «${campo}» no es un objeto`);
  }
  return valor as Crudo;
}

function lista(valor: unknown, campo: string): Crudo[] {
  if (!Array.isArray(valor)) throw new Error(`ca_panel devolvió un formato inesperado: «${campo}» no es una lista`);
  return valor.map((v, i) => objeto(v, `${campo}[${i}]`));
}

function num(valor: unknown): number {
  const n = typeof valor === "number" ? valor : typeof valor === "string" ? Number(valor) : NaN;
  return Number.isFinite(n) ? n : 0;
}

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor : valor == null ? "" : String(valor);
}

function fecha(valor: unknown): string {
  const t = Date.parse(texto(valor));
  return Number.isNaN(t) ? texto(valor) : new Date(t).toISOString();
}

function slugCanonico(slug: string | null): string | null {
  if (!slug) return null;
  return productoPorSlug(slug)?.slug ?? slug;
}

function reparto(valor: unknown, campo: string): Reparto[] {
  return lista(valor, campo).map((r) => ({ clave: texto(r.clave), n: num(r.n) }));
}

function armarKpis(crudo: unknown): Kpi[] {
  const porClave = new Map(lista(crudo, "kpis").map((k) => [texto(k.clave), k]));
  return KPIS.map((clave) => {
    const k = porClave.get(clave);
    if (!k) throw new Error(`ca_panel devolvió un formato inesperado: falta el indicador «${clave}»`);
    const serie: Punto[] = lista(k.serie ?? [], `kpis.${clave}.serie`).map((p) => ({ t: fecha(p.t), v: num(p.v) }));
    return { clave, valor: num(k.valor), anterior: num(k.anterior), serie };
  });
}

function productoDePagina(path: string, delSql: unknown): string | null {
  const declarado = PAGINAS.find((p) => p.href === path)?.vende;
  return slugCanonico(declarado ?? (typeof delSql === "string" ? delSql : null));
}

function armarPaginas(crudo: unknown): FilaPagina[] {
  return lista(crudo, "paginas").map((p) => {
    const path = texto(p.path);
    const vistas = num(p.vistas);
    const usos = num(p.usos);
    return {
      path,
      titulo: tituloDeRuta(path),
      vistas,
      visitantes: num(p.visitantes),
      usos,
      tasaUso: vistas > 0 ? usos / vistas : 0,
      tiempoMedianoMs: num(p.tiempoMedianoMs),
      compartidos: num(p.compartidos),
      interesCompra: num(p.interesCompra),
      checkouts: num(p.checkouts),
      ventas: num(p.ventas),
      producto: productoDePagina(path, p.producto),
      serieUsos: Array.isArray(p.serieUsos) ? p.serieUsos.map(num) : [],
    };
  });
}

// Siempre los cuatro productos del catálogo, aunque no tengan movimiento: un embudo que no
// aparece se lee como "no existe", y uno en cero se lee como "no vende", que es lo cierto.
function armarEmbudos(crudo: unknown): EmbudoProducto[] {
  const acumulado = new Map<string, { pasos: Map<string, number>; ingresos: number }>();
  for (const e of lista(crudo, "embudos")) {
    const slug = slugCanonico(texto(e.producto)) ?? texto(e.producto);
    const actual = acumulado.get(slug) ?? { pasos: new Map<string, number>(), ingresos: 0 };
    for (const paso of lista(e.pasos ?? [], `embudos.${slug}.pasos`)) {
      const nombre = texto(paso.paso);
      actual.pasos.set(nombre, (actual.pasos.get(nombre) ?? 0) + num(paso.n));
    }
    actual.ingresos += num(e.ingresos);
    acumulado.set(slug, actual);
  }
  const armar = (producto: string, titulo: string, precio: number): EmbudoProducto => {
    const datos = acumulado.get(producto);
    return {
      producto,
      titulo,
      precio,
      pasos: PASOS.map((paso) => ({ paso, n: datos?.pasos.get(paso) ?? 0 })),
      ingresos: datos?.ingresos ?? 0,
    };
  };
  const delCatalogo = CATALOGO.map((p) => armar(p.slug, p.tituloCorto, p.precio));
  const conocidos = new Set<string>(CATALOGO.map((p) => p.slug));
  const otros = [...acumulado.keys()].filter((slug) => !conocidos.has(slug)).map((slug) => armar(slug, slug, 0));
  return [...delCatalogo, ...otros];
}

function armarFuentes(crudo: unknown): FilaFuente[] {
  return lista(crudo, "fuentes").map((f) => ({
    fuente: texto(f.fuente),
    visitantes: num(f.visitantes),
    usos: num(f.usos),
    ventas: num(f.ventas),
  }));
}

function armarBusquedas(crudo: unknown): Busqueda[] {
  return lista(crudo, "busquedas").map((b) => ({ q: texto(b.q), n: num(b.n), sinResultados: b.sinResultados === true }));
}

function armarCompras(crudo: unknown): Compra[] {
  return lista(crudo, "compras").map((c) => {
    const estado = texto(c.estado) as Compra["estado"];
    return {
      id: texto(c.id),
      fecha: fecha(c.fecha),
      producto: slugCanonico(texto(c.producto)) ?? texto(c.producto),
      monto: num(c.monto),
      emailEnmascarado: texto(c.emailEnmascarado),
      conCuenta: c.conCuenta === true,
      desde: typeof c.desde === "string" && c.desde ? c.desde : null,
      estado: ESTADOS.includes(estado) ? estado : "aprobado",
    };
  });
}

function armarCuentas(crudo: unknown): Cuentas {
  const c = objeto(crudo, "cuentas");
  return {
    total: num(c.total),
    nuevas: num(c.nuevas),
    verificadas: num(c.verificadas),
    conCompras: num(c.conCompras),
    perfiles: reparto(c.perfiles ?? [], "cuentas.perfiles"),
  };
}

function armarVivo(crudo: unknown): EnVivo {
  const v = objeto(crudo, "vivo");
  return { ahora: num(v.ahora), paginas: reparto(v.paginas ?? [], "vivo.paginas") };
}

export function armarPanel(rango: Rango, desde: Date, hasta: Date, crudo: unknown, generado: Date = new Date()): PanelDatos {
  const r = objeto(crudo, "ca_panel");
  const granularidad = r.granularidad === "hora" ? "hora" : r.granularidad === "dia" ? "dia" : null;
  if (!granularidad) throw new Error("ca_panel devolvió un formato inesperado: falta la granularidad");
  const sinLecturas: Omit<PanelDatos, "lecturas"> = {
    rango,
    desde: desde.toISOString(),
    hasta: hasta.toISOString(),
    generado: generado.toISOString(),
    granularidad,
    kpis: armarKpis(r.kpis),
    paginas: armarPaginas(r.paginas),
    embudos: armarEmbudos(r.embudos),
    fuentes: armarFuentes(r.fuentes),
    dispositivos: reparto(r.dispositivos, "dispositivos"),
    paises: reparto(r.paises, "paises"),
    busquedas: armarBusquedas(r.busquedas),
    compras: armarCompras(r.compras),
    cuentas: armarCuentas(r.cuentas),
    vivo: armarVivo(r.vivo),
    sinDatos: r.hayVistas !== true,
  };
  return { ...sinLecturas, lecturas: generarLecturas(sinLecturas) };
}

export async function cargarPanel(rango: Rango): Promise<PanelDatos> {
  const ahora = new Date();
  const { desde, hasta } = limitesDelRango(rango, ahora);
  const { data, error } = await servicio()
    .rpc("ca_panel", { p_desde: desde.toISOString(), p_hasta: hasta.toISOString() })
    .abortSignal(AbortSignal.timeout(20_000));
  if (error) {
    const codigo = error.code ? ` [${error.code}]` : "";
    throw new Error(`No se pudieron leer los datos del panel (ca_panel): ${error.message}${codigo}`);
  }
  return armarPanel(rango, desde, hasta, data, ahora);
}
