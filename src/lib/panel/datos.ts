import "server-only";
import { servicio } from "@/lib/supabase/servicio";
import { PAGINAS, tituloDeRuta } from "@/data/navegacion";
import { CATALOGO, productoPorSlug } from "@/lib/mp";
import { FORMA_MERCADO, MERCADO_AR, esMercadoIntl, esMercadoMedido, mercadoMedido } from "@/lib/medicion/mercados";
import { catalogoIntl, type ProductoIntl } from "@/lib/pagos/catalogo-intl";
import { generarLecturas } from "@/lib/panel/lecturas";
import { extremos, sumarDias } from "@/lib/panel/fechas";
import { diaAR, medianocheAR } from "@/lib/hora-argentina";
import type {
  BocaDatos,
  BrazoPuente,
  Busqueda,
  FilaBoca,
  Sitio,
  SueldosBoca,
  Compra,
  Cuentas,
  EmbudoMercado,
  EmbudoProducto,
  EnVivo,
  FilaFuente,
  FilaMercado,
  FilaPagina,
  Ingresos,
  Kpi,
  KpiClave,
  PanelDatos,
  PasoEmbudo,
  Punto,
  Rango,
  Reparto,
} from "@/lib/panel/tipos";

const KPIS: KpiClave[] = ["visitantes", "usos", "tiempo", "interes", "checkouts", "ventas", "ingresos"];
const PASOS: PasoEmbudo["paso"][] = ["vio_oferta", "abrio_compra", "fue_a_pagar", "pago"];
const ESTADOS: Compra["estado"][] = ["aprobado", "reembolsado", "contracargo"];

type Crudo = Record<string, unknown>;

export function limitesDelRango(rango: Rango, ahora: Date = new Date()): { desde: Date; hasta: Date } {
  // Cada borde con su propia medianoche: si en el medio hubo un cambio de huso, no se arrastra el offset de hoy.
  const hoy = diaAR(ahora.getTime());
  const { inicio, fin } = extremos(rango, hoy);
  const desde = medianocheAR(inicio);
  if (Number.isNaN(desde.getTime())) throw new Error(`No se pudo calcular la medianoche argentina para ${ahora.toISOString()}`);
  if (fin >= hoy) return { desde, hasta: ahora };
  return { desde, hasta: medianocheAR(sumarDias(fin, 1)) };
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

function humanizar(segmento: string): string {
  let texto = segmento;
  try {
    texto = decodeURIComponent(segmento);
  } catch {}
  texto = texto.replace(/-/g, " ").trim();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Las páginas de calcularya son /<mercado>/<slug>: el título sale del slug y, mirando todos los
// países juntos, lleva el país para no confundir /mx/aguinaldo con /aguinaldo de calcular.ar.
export function tituloDePagina(path: string, filtro: string | null): string {
  const [, primero = "", ...resto] = path.split("/");
  if (!esMercadoIntl(primero)) return tituloDeRuta(path);
  const nombre = mercadoMedido(primero)?.nombre ?? primero.toUpperCase();
  const ultimo = resto.filter(Boolean).pop();
  const titulo = ultimo ? humanizar(ultimo) : "Inicio";
  return filtro ? titulo : `${titulo} · ${nombre}`;
}

function armarPaginas(crudo: unknown, filtro: string | null): FilaPagina[] {
  return lista(crudo, "paginas").map((p) => {
    const path = texto(p.path);
    const vistas = num(p.vistas);
    const usos = num(p.usos);
    return {
      path,
      titulo: tituloDePagina(path, filtro),
      vistas,
      visitantes: num(p.visitantes),
      usos,
      tasaUso: vistas > 0 ? usos / vistas : 0,
      tiempoMedianoMs: num(p.tiempoMedianoMs),
      compartidos: num(p.compartidos),
      interesCompra: num(p.interesCompra),
      checkouts: num(p.checkouts),
      ventas: num(p.ventas),
      ofertas: num(p.ofertas),
      ingresosUsd: num(p.ingresosUsd),
      producto: productoDePagina(path, p.producto),
      serieUsos: Array.isArray(p.serieUsos) ? p.serieUsos.map(num) : [],
    };
  });
}

let porIdIntl: Map<string, ProductoIntl> | null = null;

function productoIntlPorId(id: string): ProductoIntl | undefined {
  porIdIntl ??= new Map(catalogoIntl().map((p) => [p.id, p]));
  return porIdIntl.get(id);
}

// Siempre los productos del catálogo del mercado que se mira, aunque no tengan movimiento: un embudo
// que no aparece se lee como "no existe", y uno en cero se lee como "no vende", que es lo cierto. En
// Todos, el catálogo de calcular.ar y lo de calcularya que tuvo movimiento.
function armarEmbudos(crudo: unknown, mercado: string | null): EmbudoProducto[] {
  type Acumulado = { pasos: Map<string, number>; ingresos: number; ingresosUsd: number; moneda: string | null };
  const acumulado = new Map<string, Acumulado>();
  for (const e of lista(crudo, "embudos")) {
    const slug = slugCanonico(texto(e.producto)) ?? texto(e.producto);
    const actual: Acumulado = acumulado.get(slug) ?? { pasos: new Map<string, number>(), ingresos: 0, ingresosUsd: 0, moneda: null };
    for (const paso of lista(e.pasos ?? [], `embudos.${slug}.pasos`)) {
      const nombre = texto(paso.paso);
      actual.pasos.set(nombre, (actual.pasos.get(nombre) ?? 0) + num(paso.n));
    }
    actual.ingresos += num(e.ingresos);
    actual.ingresosUsd += num(e.ingresosUsd);
    if (typeof e.moneda === "string" && /^[A-Z]{3}$/.test(e.moneda)) actual.moneda = e.moneda;
    acumulado.set(slug, actual);
  }
  const armar = (producto: string, titulo: string, precio: number, moneda: string, deMercado: string | null): EmbudoProducto => {
    const datos = acumulado.get(producto);
    return {
      producto,
      titulo,
      mercado: deMercado,
      moneda: datos?.moneda ?? moneda,
      precio,
      pasos: PASOS.map((paso) => ({ paso, n: datos?.pasos.get(paso) ?? 0 })),
      ingresos: datos?.ingresos ?? 0,
      ingresosUsd: datos?.ingresosUsd ?? 0,
    };
  };
  const deIntl = (p: ProductoIntl) => {
    const nombre = mercadoMedido(p.mercado)?.nombre ?? p.mercado.toUpperCase();
    return armar(p.id, mercado ? p.tituloCorto : `${p.tituloCorto} · ${nombre}`, p.precioCentavos / 100, p.moneda, p.mercado);
  };
  const fijos =
    mercado === null || mercado === MERCADO_AR.codigo
      ? CATALOGO.map((p) => armar(p.slug, p.tituloCorto, p.precio, "ARS", null))
      : catalogoIntl()
          .filter((p) => p.mercado === mercado)
          .map(deIntl);
  const conocidos = new Set<string>(fijos.map((e) => e.producto));
  const otros = [...acumulado.keys()]
    .filter((id) => !conocidos.has(id))
    .map((id) => {
      const intl = productoIntlPorId(id);
      return intl ? deIntl(intl) : armar(id, id, 0, "ARS", null);
    });
  return [...fijos, ...otros];
}

function armarIngresos(crudo: unknown, compras: Compra[]): Ingresos {
  if (crudo === undefined) {
    // ca_panel de antes de 20261014120000: el KPI viene en pesos y no hay desglose; se arma con las
    // compras del período que trae la respuesta (hasta 50).
    const porMoneda = new Map<string, { monto: number; ventas: number }>();
    for (const c of compras.filter((x) => x.estado === "aprobado")) {
      const a = porMoneda.get(c.moneda) ?? { monto: 0, ventas: 0 };
      porMoneda.set(c.moneda, { monto: a.monto + c.monto, ventas: a.ventas + 1 });
    }
    return {
      moneda: "ARS",
      porMoneda: [...porMoneda].map(([moneda, a]) => ({ moneda, monto: a.monto, montoUsd: moneda === "USD" ? a.monto : null, ventas: a.ventas })),
      sinCotizacion: 0,
    };
  }
  const i = objeto(crudo, "ingresos");
  return {
    moneda: typeof i.moneda === "string" && /^[A-Z]{3}$/.test(i.moneda) ? i.moneda : "USD",
    porMoneda: lista(i.porMoneda ?? [], "ingresos.porMoneda").map((x) => ({
      moneda: texto(x.moneda),
      monto: num(x.monto),
      montoUsd: x.montoUsd === null || x.montoUsd === undefined ? null : num(x.montoUsd),
      ventas: num(x.ventas),
    })),
    sinCotizacion: num(i.sinCotizacion),
  };
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
      moneda: typeof c.moneda === "string" && /^[A-Z]{3}$/.test(c.moneda) ? c.moneda : "ARS",
      montoUsd: c.montoUsd === null || c.montoUsd === undefined ? null : num(c.montoUsd),
      pais: typeof c.pais === "string" && /^[A-Z]{2}$/.test(c.pais) ? c.pais : null,
      mercado: typeof c.mercado === "string" && FORMA_MERCADO.test(c.mercado) ? c.mercado : null,
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

function armarMercados(crudo: unknown): FilaMercado[] | null {
  if (crudo === undefined) return null;
  return lista(crudo, "mercados")
    .map((m) => {
      const ingresos = lista(m.ingresos ?? [], "mercados.ingresos").map((i) => ({ moneda: texto(i.moneda), monto: num(i.monto) }));
      const embudo: EmbudoMercado | null =
        m.usaron === undefined
          ? null
          : { visitas: num(m.visitantes), usaron: num(m.usaron), ofertas: num(m.ofertas), clics: num(m.clics), checkouts: num(m.checkouts), ventas: num(m.ventas) };
      return {
        mercado: texto(m.mercado),
        visitantes: num(m.visitantes),
        usos: num(m.usos),
        ventas: num(m.ventas),
        ingresos,
        ingresosUsd:
          m.ingresosUsd === undefined ? ingresos.filter((i) => i.moneda === "USD").reduce((a, i) => a + i.monto, 0) : num(m.ingresosUsd),
        embudo,
      };
    })
    .filter((m) => FORMA_MERCADO.test(m.mercado));
}

const sitio = (v: unknown): Sitio => (v === "intl" ? "intl" : "ar");
const mercadoDe = (v: unknown, s: Sitio): string => (typeof v === "string" && FORMA_MERCADO.test(v) ? v : s === "ar" ? "ar" : "global");
const nulo = (v: unknown): string | null => (typeof v === "string" && v ? v : null);

function filaBoca(f: Crudo): FilaBoca {
  return {
    clave: texto(f.clave) || "otro",
    compartidos: num(f.compartidos),
    personas: num(f.personas),
    llegadas: num(f.llegadas),
    nuevas: num(f.nuevas),
    usaron: num(f.usaron),
  };
}

function armarSueldos(crudo: unknown): SueldosBoca | null {
  if (crudo === null || crudo === undefined) return null;
  const s = objeto(crudo, "boca.sueldos");
  return {
    aportes: lista(s.aportes ?? [], "boca.sueldos.aportes").map((a) => ({ mercado: texto(a.mercado), aportes: num(a.aportes), pendientes: num(a.pendientes) })),
    celdas: lista(s.celdas ?? [], "boca.sueldos.celdas").map((c) => ({
      mercado: texto(c.mercado),
      publicadas: num(c.publicadas),
      cerca: num(c.cerca),
      ocupaciones: num(c.ocupaciones),
    })),
    publicadoEl: nulo(s.publicadoEl),
  };
}

// filtro = el mercado que se mira (null = todos): con un país elegido los títulos no llevan el país.
export function armarBoca(crudo: unknown, filtro: string | null): BocaDatos {
  const b = objeto(crudo, "ca_panel_boca");
  const r = objeto(b.resumen, "boca.resumen");
  const e = objeto(b.embebidos ?? {}, "boca.embebidos");
  return {
    granularidad: b.granularidad === "hora" ? "hora" : "dia",
    resumen: {
      compartidos: num(r.compartidos),
      compartidosAntes: num(r.compartidosAntes),
      personas: num(r.personas),
      llegadas: num(r.llegadas),
      nuevas: num(r.nuevas),
      usaron: num(r.usaron),
      nuevasUsaron: num(r.nuevasUsaron),
      propias: num(r.propias),
      sinCompartido: num(r.sinCompartido),
    },
    serie: lista(b.serie ?? [], "boca.serie").map((p) => ({ t: fecha(p.t), compartidos: num(p.compartidos), llegadas: num(p.llegadas), nuevas: num(p.nuevas) })),
    canales: lista(b.canales ?? [], "boca.canales").map(filaBoca),
    origenes: lista(b.origenes ?? [], "boca.origenes").map(filaBoca),
    paginas: lista(b.paginas ?? [], "boca.paginas").map((p) => {
      const s = sitio(p.sitio);
      const path = texto(p.path);
      return { ...filaBoca({ ...p, clave: path }), path, titulo: tituloDePagina(path, filtro), sitio: s, mercado: mercadoDe(p.mercado, s) };
    }),
    mercados: lista(b.mercados ?? [], "boca.mercados").map((m) => {
      const s = sitio(m.sitio);
      return { mercado: mercadoDe(m.mercado, s), sitio: s, compartidos: num(m.compartidos), personas: num(m.personas), llegadas: num(m.llegadas), nuevas: num(m.nuevas) };
    }),
    top: lista(b.top ?? [], "boca.top").map((t) => {
      const s = sitio(t.sitio);
      const path = texto(t.path);
      return {
        ref: texto(t.ref),
        path,
        titulo: path ? tituloDePagina(path, filtro) : "Página sin dato",
        sitio: s,
        mercado: mercadoDe(t.mercado, s),
        canal: texto(t.canal) || "otro",
        origen: texto(t.origen) || "otro",
        fecha: t.fecha ? fecha(t.fecha) : null,
        llegadas: num(t.llegadas),
        nuevas: num(t.nuevas),
        usaron: num(t.usaron),
      };
    }),
    puente: lista(b.puente ?? [], "boca.puente")
      .filter((x) => x.v === "con" || x.v === "sin")
      .map(
        (x): BrazoPuente => ({
          v: x.v as BrazoPuente["v"],
          exposiciones: num(x.exposiciones),
          personas: num(x.personas),
          clics: num(x.clics),
          compartieron: num(x.compartieron),
          siguieron: num(x.siguieron),
        }),
      ),
    embebidos: {
      vistas: num(e.vistas),
      visitantes: num(e.visitantes),
      usos: num(e.usos),
      sitios: lista(e.sitios ?? [], "boca.embebidos.sitios").map((x) => ({ host: texto(x.host), vistas: num(x.vistas), visitantes: num(x.visitantes), usos: num(x.usos) })),
      calculadoras: lista(e.calculadoras ?? [], "boca.embebidos.calculadoras").map((x) => {
        const path = texto(x.path);
        return { path, titulo: tituloDePagina(path.replace(/\/(embed|embebido)\//, "/"), filtro), mercado: texto(x.mercado), vistas: num(x.vistas), sitios: num(x.sitios), usos: num(x.usos) };
      }),
    },
    afiliados: lista(b.afiliados ?? [], "boca.afiliados").map((a) => ({
      socio: texto(a.socio),
      pais: typeof a.pais === "string" && /^[A-Z]{2}$/.test(a.pais) ? a.pais : null,
      mercado: texto(a.mercado),
      clics: num(a.clics),
      personas: num(a.personas),
    })),
    sueldos: armarSueldos(b.sueldos),
    sociales: lista(b.sociales ?? [], "boca.sociales").map((x) => ({ fuente: texto(x.fuente), sesiones: num(x.sesiones), personas: num(x.personas), usaron: num(x.usaron) })),
  };
}

export function armarPanel(
  rango: Rango,
  desde: Date,
  hasta: Date,
  crudo: unknown,
  generado: Date = new Date(),
  crudoBoca: unknown = null,
): PanelDatos {
  const r = objeto(crudo, "ca_panel");
  const granularidad = r.granularidad === "hora" ? "hora" : r.granularidad === "dia" ? "dia" : null;
  if (!granularidad) throw new Error("ca_panel devolvió un formato inesperado: falta la granularidad");
  const mercado = typeof r.mercado === "string" && esMercadoMedido(r.mercado) ? r.mercado : null;
  const compras = armarCompras(r.compras);
  const sinLecturas: Omit<PanelDatos, "lecturas"> = {
    rango,
    mercado,
    desde: desde.toISOString(),
    hasta: hasta.toISOString(),
    generado: generado.toISOString(),
    granularidad,
    kpis: armarKpis(r.kpis),
    ingresos: armarIngresos(r.ingresos, compras),
    paginas: armarPaginas(r.paginas, mercado),
    embudos: armarEmbudos(r.embudos, mercado),
    fuentes: armarFuentes(r.fuentes),
    dispositivos: reparto(r.dispositivos, "dispositivos"),
    paises: reparto(r.paises, "paises"),
    paisesCompra: r.paisesCompra === undefined ? null : reparto(r.paisesCompra, "paisesCompra"),
    busquedas: armarBusquedas(r.busquedas),
    compras,
    cuentas: armarCuentas(r.cuentas),
    vivo: armarVivo(r.vivo),
    mercados: armarMercados(r.mercados),
    boca: crudoBoca === null || crudoBoca === undefined ? null : armarBoca(crudoBoca, mercado),
    sinDatos: r.hayVistas !== true,
  };
  return { ...sinLecturas, lecturas: generarLecturas(sinLecturas) };
}

export function leerMercado(valor: unknown): string | null {
  return typeof valor === "string" && esMercadoMedido(valor) ? valor : null;
}

async function llamarPanel(desde: Date, hasta: Date, mercado: string | null, funcion = "ca_panel") {
  const args: Record<string, string> = { p_desde: desde.toISOString(), p_hasta: hasta.toISOString() };
  if (mercado) args.p_mercado = mercado;
  return servicio().rpc(funcion, args).abortSignal(AbortSignal.timeout(20_000));
}

// Boca en boca va en otra función y en paralelo con ca_panel: si falla o la base todavía no la tiene,
// el panel sale igual y la sección lo dice, en vez de tumbar todo.
async function llamarBoca(desde: Date, hasta: Date, mercado: string | null): Promise<unknown> {
  try {
    const { data, error } = await llamarPanel(desde, hasta, mercado, "ca_panel_boca");
    if (error) {
      if (error.code !== "PGRST202") console.error("[panel] ca_panel_boca falló", error.code, error.message);
      return null;
    }
    return data;
  } catch (e) {
    console.error("[panel] ca_panel_boca se cortó", e);
    return null;
  }
}

// Sin la migración de mercado ca_panel no acepta p_mercado (PGRST202). Hasta entonces todo lo
// medido es de calcular.ar: Argentina es el panel entero y un país de calcularya no tiene datos.
export async function cargarPanel(rango: Rango, mercado: string | null = null): Promise<PanelDatos> {
  const ahora = new Date();
  const { desde, hasta } = limitesDelRango(rango, ahora);
  const boca = llamarBoca(desde, hasta, mercado);
  let { data, error } = await llamarPanel(desde, hasta, mercado);
  let sinMigracion = false;
  if (error?.code === "PGRST202" && mercado) {
    sinMigracion = true;
    ({ data, error } = await llamarPanel(desde, hasta, null));
  }
  if (error) {
    const codigo = error.code ? ` [${error.code}]` : "";
    throw new Error(`No se pudieron leer los datos del panel (ca_panel): ${error.message}${codigo}`);
  }
  let datos = armarPanel(rango, desde, hasta, data, ahora);
  const crudoBoca = await boca;
  if (crudoBoca !== null) {
    try {
      datos = { ...datos, boca: armarBoca(crudoBoca, datos.mercado) };
    } catch (e) {
      console.error("[panel] ca_panel_boca devolvió algo que no se entiende", e);
    }
  }
  return sinMigracion && mercado === "ar" ? { ...datos, mercado: "ar" } : datos;
}
