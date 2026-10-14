import { esConcepto } from "./conceptos";
import { validarArchivoAvisos, validarArchivoDatos, validarArchivoSeries, validarMercado } from "./datos";
import { formatearFecha, formatearValorUnidad } from "./formato";
import { UNIVERSALES } from "./universales";
import { idiomasDe, instanciar, type ContextoUniversal, type Universal } from "./universales/tipos";
import { avisosVigentes, hoyMasAdelantado, ultimoPunto, valorSerie, vigente, vigentePorRegion } from "./vigencia";
import type {
  CodigoMercado,
  ContenidoCalculadora,
  Dato,
  DeclaracionPais,
  DefinicionCalculadora,
  EntradaCalculadora,
  EstadoPublicacion,
  FechaISO,
  Fuente,
  Mercado,
  OpcionDinamica,
  PaisDefinido,
  PropsCalculadora,
  PuntoSerie,
  Requisito,
  Serie,
  TipoDato,
  Unidad,
  ValorResuelto,
} from "./tipos";

export type ModoPublicacion = "produccion" | "interno";

// Una universal que el país usa, con lo que puede pisar: el slug (si su gente busca otra palabra),
// los datos que pide la universal (por ejemplo { tasa: "mx.iva-general" }) y el estado.
export interface UsoUniversal {
  id: string;
  slug?: string;
  datos?: Readonly<Record<string, string>>;
  estado?: EstadoPublicacion;
}

// "todas": las universales con textos en el idioma del mercado, menos las que choquen por concepto o
// por slug con una calculadora local y las que piden datos del país (esas entran con un ajuste).
export type SeleccionUniversales =
  | "todas"
  | { todas: true; excepto?: readonly string[]; ajustes?: readonly UsoUniversal[] }
  | readonly (string | UsoUniversal)[];

export interface DeclaracionConUniversales extends DeclaracionPais {
  universales?: SeleccionUniversales;
}

// Lo que el navegador necesita para rearmar la definición (src/motor/universales/cargadores.ts):
// datos planos, porque calcular() no cruza la frontera servidor-cliente.
export interface OrigenUniversal {
  id: string;
  contexto: ContextoUniversal;
}

export interface EntradaUniversal extends EntradaCalculadora {
  universal: OrigenUniversal;
}

export function esUniversal(entrada: EntradaCalculadora): entrada is EntradaUniversal {
  return typeof (entrada as Partial<EntradaUniversal>).universal === "object";
}

const sinClienteLocal = () => Promise.reject(new Error("una universal no tiene <slug>.cliente: la carga src/motor/universales/cargadores.ts"));

function contextoUniversal(mercado: Mercado, u: Universal<never>, uso: UsoUniversal): ContextoUniversal {
  return {
    id: `${mercado.codigo}.${u.id}`,
    slug: uso.slug ?? "",
    mercado: mercado.codigo,
    pais: mercado.pais,
    nombrePais: mercado.nombre,
    locale: mercado.locale,
    idioma: mercado.idioma,
    trato: mercado.trato,
    moneda: mercado.monedas[0],
    escala: mercado.escala ?? 1,
    unidades: mercado.unidades ?? "metrico",
    estado: uso.estado ?? "publicado",
    datos: uso.datos ?? {},
  };
}

// El contenido se arma la primera vez que alguien lo lee: 190 países por 40 universales son miles de
// textos con números formateados, y un build o un ISR solo necesita los de las páginas que pinta.
function entradaUniversal(u: Universal<never>, ctx: ContextoUniversal): EntradaUniversal {
  const definicion = u.definir({ ...ctx, slug: ctx.slug || u.textos[ctx.idioma]!.slug }, u.textos[ctx.idioma]!.ui(ctx.trato));
  let contenido: ContenidoCalculadora | undefined;
  return {
    definicion,
    get contenido() {
      return (contenido ??= instanciar(u, ctx).contenido);
    },
    cliente: sinClienteLocal,
    universal: { id: u.id, contexto: { ...ctx, slug: definicion.slug } },
  };
}

function universalesDelPais(mercado: Mercado, locales: readonly EntradaCalculadora[], seleccion: SeleccionUniversales, errores: string[]): EntradaUniversal[] {
  const conceptos = new Set<string>(locales.map((c) => c.definicion.concepto).filter((c) => c !== "propio"));
  const slugs = new Set(locales.map((c) => c.definicion.slug));
  const ids = new Set(locales.map((c) => c.definicion.id));
  const porId = new Map(UNIVERSALES.map((u) => [u.id, u]));
  const usos: { uso: UsoUniversal; explicito: boolean }[] = [];
  if (Array.isArray(seleccion)) {
    for (const x of seleccion as readonly (string | UsoUniversal)[]) usos.push({ uso: typeof x === "string" ? { id: x } : x, explicito: true });
  } else {
    const opciones = seleccion === "todas" ? {} : (seleccion as { excepto?: readonly string[]; ajustes?: readonly UsoUniversal[] });
    const excepto = new Set(opciones.excepto ?? []);
    const ajustes = new Map((opciones.ajustes ?? []).map((a) => [a.id, a]));
    for (const id of ajustes.keys()) if (!porId.has(id)) errores.push(`universal "${id}" en ${mercado.codigo}: no existe en src/motor/universales`);
    for (const u of UNIVERSALES) {
      const ajuste = ajustes.get(u.id);
      if (excepto.has(u.id) || (!ajuste && u.datos?.length)) continue;
      usos.push({ uso: ajuste ?? { id: u.id }, explicito: Boolean(ajuste) });
    }
  }

  const salida: EntradaUniversal[] = [];
  for (const { uso, explicito } of usos) {
    const u = porId.get(uso.id);
    const descartar = (motivo: string) => {
      if (explicito) errores.push(`universal ${uso.id} en ${mercado.codigo}: ${motivo}`);
    };
    if (!u) {
      descartar("no existe en src/motor/universales");
      continue;
    }
    if (!idiomasDe(u).includes(mercado.idioma)) {
      descartar(`no tiene textos en ${mercado.idioma}`);
      continue;
    }
    const faltan = (u.datos ?? []).filter((d) => !uso.datos?.[d]);
    if (faltan.length) {
      descartar(`faltan los datos ${faltan.join(", ")}`);
      continue;
    }
    if (conceptos.has(u.concepto)) {
      descartar(`el concepto ${u.concepto} ya lo cubre otra calculadora del país`);
      continue;
    }
    const entrada = entradaUniversal(u, contextoUniversal(mercado, u, uso));
    const { slug, id } = entrada.definicion;
    if (slugs.has(slug) || ids.has(id)) {
      descartar(`el slug ${slug} o el id ${id} ya los usa otra calculadora del país`);
      continue;
    }
    conceptos.add(u.concepto);
    slugs.add(slug);
    ids.add(id);
    salida.push(entrada);
  }
  return salida;
}

export function definirPais(declaracion: DeclaracionConUniversales): PaisDefinido {
  const { mercado } = declaracion;
  const hoy = hoyMasAdelantado();
  const errores: string[] = validarMercado(mercado);
  const datos = declaracion.datos === undefined ? { valor: { mercado: mercado.codigo, datos: [] }, errores: [] } : validarArchivoDatos(declaracion.datos, mercado, hoy);
  const series = declaracion.series === undefined ? { valor: { mercado: mercado.codigo, series: [] }, errores: [] } : validarArchivoSeries(declaracion.series, mercado, hoy);
  const avisos = declaracion.avisos === undefined ? { valor: { mercado: mercado.codigo, avisos: [] }, errores: [] } : validarArchivoAvisos(declaracion.avisos, mercado, hoy);
  errores.push(...datos.errores, ...series.errores, ...avisos.errores);
  const locales = declaracion.calculadoras ?? [];
  const universales = declaracion.universales ? universalesDelPais(mercado, locales, declaracion.universales, errores) : [];
  return {
    mercado,
    datos: datos.valor?.datos ?? [],
    series: series.valor?.series ?? [],
    avisos: avisos.valor?.avisos ?? [],
    calculadoras: [...locales, ...universales],
    novedades: declaracion.novedades ?? [],
    detectores: declaracion.detectores ?? [],
    errores,
  };
}

export interface DatoUsado {
  id: string;
  nombre: string;
  clase: "dato" | "serie";
  unidad: Unidad;
  fuente: Fuente;
  desde: FechaISO;
  hasta?: FechaISO;
  region?: string;
}

export type Resolucion =
  | { ok: true; valores: Record<string, ValorResuelto>; usados: DatoUsado[] }
  | { ok: false; motivos: string[] };

const indicesDatos = new WeakMap<readonly Dato[], ReadonlyMap<string, Dato>>();
const indicesSeries = new WeakMap<readonly Serie[], ReadonlyMap<string, Serie>>();

function indice<T extends { id: string }>(cache: WeakMap<readonly T[], ReadonlyMap<string, T>>, lista: readonly T[]): ReadonlyMap<string, T> {
  let i = cache.get(lista);
  if (!i) cache.set(lista, (i = new Map(lista.map((x) => [x.id, x]))));
  return i;
}

export function datoDe(pais: Pick<PaisDefinido, "datos">, id: string): Dato | undefined {
  return indice(indicesDatos, pais.datos).get(id);
}

export function serieDe(pais: Pick<PaisDefinido, "series">, id: string): Serie | undefined {
  return indice(indicesSeries, pais.series).get(id);
}

function tipoBase(req: Requisito): TipoDato | "serie" {
  return req === "serie" ? "serie" : (req.replace("-por-region", "") as TipoDato);
}

export function resolverRequisito(
  pais: Pick<PaisDefinido, "datos" | "series">,
  id: string,
  req: Requisito,
  fecha: FechaISO,
): { ok: true; valor: ValorResuelto; usados: DatoUsado[] } | { ok: false; motivo: string } {
  if (req === "serie") {
    const serie = serieDe(pais, id);
    if (!serie) return { ok: false, motivo: `${id}: no existe en series.json` };
    const punto = valorSerie(serie, fecha);
    if (!punto) return { ok: false, motivo: `${id}: sin valor en los últimos ${serie.maxAntiguedadDias} días al ${fecha}` };
    return {
      ok: true,
      valor: punto,
      usados: [{ id, nombre: serie.nombre, clase: "serie", unidad: serie.unidad, fuente: serie.fuente, desde: punto.fecha }],
    };
  }
  const dato = datoDe(pais, id);
  if (!dato) return { ok: false, motivo: `${id}: no existe en datos.json` };
  const tipo = tipoBase(req);
  if (dato.tipo !== tipo) return { ok: false, motivo: `${id}: la calculadora lo pide como ${req} pero el dato es de tipo ${dato.tipo}` };
  const usado = (t: { desde: FechaISO; hasta?: FechaISO; region?: string; fuente: Fuente }): DatoUsado => ({
    id,
    nombre: dato.nombre,
    clase: "dato",
    unidad: dato.unidad,
    fuente: t.fuente,
    desde: t.desde,
    ...(t.hasta ? { hasta: t.hasta } : {}),
    ...(t.region ? { region: t.region } : {}),
  });
  if (req.endsWith("-por-region")) {
    if (!dato.regiones) return { ok: false, motivo: `${id}: se pide por región pero el dato no declara regiones` };
    const porRegion = vigentePorRegion(dato, fecha);
    if (!porRegion) return { ok: false, motivo: `${id}: falta un tramo verificado para alguna región al ${fecha}` };
    const valor: Record<string, ValorResuelto> = {};
    for (const [r, t] of Object.entries(porRegion)) valor[r] = t.valor as ValorResuelto;
    return { ok: true, valor: valor as ValorResuelto, usados: Object.values(porRegion).map(usado) };
  }
  if (dato.regiones) return { ok: false, motivo: `${id}: el dato tiene regiones; pedilo como ${req}-por-region` };
  const t = vigente(dato, fecha);
  if (!t) return { ok: false, motivo: `${id}: sin tramo verificado al ${fecha}` };
  return { ok: true, valor: t.valor as ValorResuelto, usados: [usado(t)] };
}

export function resolverValores(pais: Pick<PaisDefinido, "datos" | "series">, definicion: DefinicionCalculadora, fecha: FechaISO): Resolucion {
  const valores: Record<string, ValorResuelto> = {};
  const usados: DatoUsado[] = [];
  const motivos: string[] = [];
  for (const [id, req] of Object.entries(definicion.requiere)) {
    const r = resolverRequisito(pais, id, req, fecha);
    if (r.ok) {
      valores[id] = r.valor;
      usados.push(...r.usados);
    } else motivos.push(r.motivo);
  }
  return motivos.length ? { ok: false, motivos } : { ok: true, valores, usados };
}

function estadoVisible(estado: string, modo: ModoPublicacion): boolean {
  return estado === "publicado" || (modo === "interno" && estado === "interno");
}

export function mercadoVisible(pais: PaisDefinido, modo: ModoPublicacion): boolean {
  if (pais.errores.length) return false;
  if (pais.mercado.codigo === "zz" && modo === "produccion") return false;
  return estadoVisible(pais.mercado.estado, modo);
}

export interface Publicabilidad {
  publicable: boolean;
  motivos: string[];
}

export function publicabilidad(pais: PaisDefinido, entrada: EntradaCalculadora, fecha: FechaISO, modo: ModoPublicacion = "produccion"): Publicabilidad {
  const motivos: string[] = [];
  const def = entrada.definicion;
  if (pais.errores.length) motivos.push(`el mercado ${pais.mercado.codigo} tiene ${pais.errores.length} errores de datos`);
  if (!mercadoVisible(pais, modo) && pais.errores.length === 0) motivos.push(`el mercado ${pais.mercado.codigo} está en estado ${pais.mercado.estado}`);
  if (!estadoVisible(def.estado, modo)) motivos.push(`${def.id} está en estado ${def.estado}`);
  if (def.mercado !== pais.mercado.codigo) motivos.push(`${def.id} declara mercado ${def.mercado}`);
  if (!esConcepto(def.concepto)) motivos.push(`${def.id}: concepto desconocido ${def.concepto}`);
  const r = resolverValores(pais, def, fecha);
  if (!r.ok) motivos.push(...r.motivos);
  return { publicable: motivos.length === 0, motivos };
}

const RE_MARCADOR = /\{\{\s*([a-z0-9]{2,6}\.[a-z0-9-]+)(?:\[([a-z0-9-]+)\])?(?:@([a-z0-9-]+))?(?:#(desde))?\s*\}\}/g;

export interface Marcador {
  texto: string;
  id: string;
  clave?: string;
  region?: string;
  desde: boolean;
}

export function marcadoresDe(texto: string): Marcador[] {
  return [...texto.matchAll(RE_MARCADOR)].map((m) => ({
    texto: m[0],
    id: m[1],
    ...(m[2] ? { clave: m[2] } : {}),
    ...(m[3] ? { region: m[3] } : {}),
    desde: m[4] === "desde",
  }));
}

export function hayLlavesSueltas(texto: string): boolean {
  return /\{\{|\}\}/.test(texto.replace(RE_MARCADOR, ""));
}

interface ContextoRelleno {
  valores: Readonly<Record<string, ValorResuelto>>;
  usados: readonly DatoUsado[];
  unidades: Readonly<Record<string, Unidad>>;
  locale: string;
  simbolos?: Mercado["simbolos"];
}

function rellenar(texto: string, ctx: ContextoRelleno): string {
  return texto.replace(RE_MARCADOR, (todo, id: string, clave?: string, region?: string, desde?: string) => {
    const unidad = ctx.unidades[id];
    let valor: unknown = ctx.valores[id];
    if (desde) {
      const u = ctx.usados.find((x) => x.id === id && (region === undefined || x.region === region));
      return u ? formatearFecha(u.desde, ctx.locale) : todo;
    }
    if (region !== undefined) valor = (valor as Record<string, unknown> | undefined)?.[region];
    if (clave !== undefined) valor = (valor as Record<string, unknown> | undefined)?.[clave];
    if (valor !== null && typeof valor === "object" && "valor" in valor) valor = (valor as { valor: unknown }).valor;
    if (typeof valor !== "number" || unidad === undefined) {
      console.error(`[motor] marcador sin resolver: ${todo}`);
      return todo;
    }
    return formatearValorUnidad(valor, unidad, ctx.locale, ctx.simbolos);
  });
}

export function rellenarContenido(contenido: ContenidoCalculadora, ctx: ContextoRelleno): ContenidoCalculadora {
  const r = (t: string) => rellenar(t, ctx);
  return {
    ...contenido,
    h1: r(contenido.h1),
    title: r(contenido.title),
    description: r(contenido.description),
    intro: contenido.intro.map(r),
    comoSeCalcula: contenido.comoSeCalcula.map(r),
    ...(contenido.ejemplo ? { ejemplo: contenido.ejemplo.map(r) } : {}),
    faq: contenido.faq.map((f) => ({ pregunta: r(f.pregunta), respuesta: r(f.respuesta) })),
    glosario: contenido.glosario.map((g) => ({ termino: r(g.termino), definicion: r(g.definicion) })),
  };
}

export interface Sello {
  verificadoMasViejo: FechaISO | null;
  fuentes: Fuente[];
  series: { id: string; nombre: string; organismo: string; fecha: FechaISO }[];
}

export function selloDe(usados: readonly DatoUsado[]): Sello {
  const datos = usados.filter((u) => u.clase === "dato");
  const fechas = datos.map((u) => u.fuente.verificadoEl).sort();
  const fuentes = new Map<string, Fuente>();
  for (const u of usados) if (!fuentes.has(u.fuente.url)) fuentes.set(u.fuente.url, u.fuente);
  return {
    verificadoMasViejo: fechas[0] ?? null,
    fuentes: [...fuentes.values()],
    series: usados.filter((u) => u.clase === "serie").map((u) => ({ id: u.id, nombre: u.nombre, organismo: u.fuente.organismo, fecha: u.desde })),
  };
}

export interface Equivalente {
  mercado: CodigoMercado;
  locale: string;
  slug: string;
}

export interface PaginaResuelta {
  mercado: Mercado;
  calculadora: { id: string; slug: string; concepto: string; producto?: string };
  contenido: ContenidoCalculadora;
  props: PropsCalculadora;
  sello: Sello;
  usados: DatoUsado[];
  equivalentes: Equivalente[];
  cliente: EntradaCalculadora["cliente"];
  universal?: OrigenUniversal;
}

export interface FichaDato {
  dato: Dato;
  vigentes: { region?: string; valor: unknown; desde: FechaISO; hasta?: FechaISO; fuente: Fuente }[];
}

// vigente es el punto que usa una calculadora ese día (con maxAntiguedadDias aplicado) y su fecha es
// la del sello "actualizado automáticamente"; ultimo puede estar en el futuro (UF por adelantado).
export interface FichaSerie {
  serie: Serie;
  vigente: PuntoSerie | null;
  ultimo: PuntoSerie | null;
}

export interface Registro {
  readonly paises: readonly PaisDefinido[];
  pais(codigo: CodigoMercado): PaisDefinido | undefined;
  mercados(modo?: ModoPublicacion): Mercado[];
  calculadora(codigo: CodigoMercado, slug: string): EntradaCalculadora | undefined;
  calculadorasPublicables(codigo: CodigoMercado, fecha: FechaISO, modo?: ModoPublicacion): EntradaCalculadora[];
  rutas(fechaDe: (m: Mercado) => FechaISO, modo?: ModoPublicacion): { mercado: CodigoMercado; slug: string }[];
  publicabilidad(codigo: CodigoMercado, slug: string, fecha: FechaISO, modo?: ModoPublicacion): Publicabilidad;
  pagina(codigo: CodigoMercado, slug: string, fecha: FechaISO, modo?: ModoPublicacion): PaginaResuelta | null;
  equivalentes(concepto: string, fechaDe: (m: Mercado) => FechaISO, modo?: ModoPublicacion): Equivalente[];
  fichas(codigo: CodigoMercado, fecha: FechaISO): FichaDato[];
  fichasSeries(codigo: CodigoMercado, fecha: FechaISO): FichaSerie[];
}

export function opcionesDinamicas(pais: PaisDefinido, definicion: DefinicionCalculadora, valores: Readonly<Record<string, ValorResuelto>>) {
  const salida: Record<string, OpcionDinamica[]> = {};
  for (const c of definicion.campos) {
    if (c.tipo !== "opcion-dato") continue;
    const mapa = valores[c.dato];
    const dato = datoDe(pais, c.dato);
    if (!mapa || typeof mapa !== "object" || Array.isArray(mapa)) continue;
    salida[c.id] = Object.keys(mapa).map((k) => ({ valor: k, etiqueta: dato?.etiquetas?.[k] ?? k }));
  }
  return salida;
}

// Tope del memo de publicables: una entrada por mercado, fecha y modo. El registro vive mientras vive
// el proceso (horas en un servidor con ISR) y la fecha avanza: sin tope crecería un día por vez.
const MEMO_MAXIMO = 4096;

export function crearRegistro(paises: readonly PaisDefinido[]): Registro {
  const porCodigo = new Map<CodigoMercado, PaisDefinido>();
  for (const p of paises) {
    if (porCodigo.has(p.mercado.codigo)) throw new Error(`Registro de países: el mercado ${p.mercado.codigo} está dos veces`);
    porCodigo.set(p.mercado.codigo, p);
  }
  const porSlug = new Map<CodigoMercado, ReadonlyMap<string, EntradaCalculadora>>();
  const porConcepto = new Map<string, { pais: PaisDefinido; entrada: EntradaCalculadora }[]>();
  for (const p of paises) {
    porSlug.set(p.mercado.codigo, new Map(p.calculadoras.map((c) => [c.definicion.slug, c])));
    for (const entrada of p.calculadoras) {
      const concepto = entrada.definicion.concepto;
      if (concepto === "propio") continue;
      let lista = porConcepto.get(concepto);
      if (!lista) porConcepto.set(concepto, (lista = []));
      lista.push({ pais: p, entrada });
    }
  }

  const pais = (codigo: CodigoMercado) => porCodigo.get(codigo);
  const calculadora = (codigo: CodigoMercado, slug: string) => porSlug.get(codigo)?.get(slug);

  const memo = new Map<string, { lista: EntradaCalculadora[]; conjunto: ReadonlySet<EntradaCalculadora> }>();
  const publicablesDe = (p: PaisDefinido, fecha: FechaISO, modo: ModoPublicacion) => {
    const clave = `${p.mercado.codigo}|${fecha}|${modo}`;
    let r = memo.get(clave);
    if (!r) {
      const lista = mercadoVisible(p, modo) ? p.calculadoras.filter((c) => publicabilidad(p, c, fecha, modo).publicable) : [];
      if (memo.size >= MEMO_MAXIMO) memo.clear();
      memo.set(clave, (r = { lista, conjunto: new Set(lista) }));
    }
    return r;
  };
  const publicables = (codigo: CodigoMercado, fecha: FechaISO, modo: ModoPublicacion) => {
    const p = pais(codigo);
    return p ? publicablesDe(p, fecha, modo).lista : [];
  };

  // O(k) con k = calculadoras de ese concepto en todo el registro, no O(todas las calculadoras).
  const equivalentes = (concepto: string, fechaDe: (m: Mercado) => FechaISO, modo: ModoPublicacion = "produccion"): Equivalente[] => {
    if (concepto === "propio") return [];
    const salida: Equivalente[] = [];
    for (const { pais: p, entrada } of porConcepto.get(concepto) ?? []) {
      if (!publicablesDe(p, fechaDe(p.mercado), modo).conjunto.has(entrada)) continue;
      salida.push({ mercado: p.mercado.codigo, locale: p.mercado.locale, slug: entrada.definicion.slug });
    }
    return salida;
  };

  const unidadesPorPais = new WeakMap<PaisDefinido, Readonly<Record<string, Unidad>>>();
  const unidadesDe = (p: PaisDefinido) => {
    let u = unidadesPorPais.get(p);
    if (!u) {
      const r: Record<string, Unidad> = {};
      for (const d of p.datos) r[d.id] = d.unidad;
      for (const s of p.series) r[s.id] = s.unidad;
      unidadesPorPais.set(p, (u = r));
    }
    return u;
  };

  return {
    paises,
    pais,
    mercados: (modo = "produccion") => paises.filter((p) => mercadoVisible(p, modo)).map((p) => p.mercado),
    calculadora,
    calculadorasPublicables: (codigo, fecha, modo = "produccion") => publicables(codigo, fecha, modo),
    rutas: (fechaDe, modo = "produccion") =>
      paises.flatMap((p) => publicables(p.mercado.codigo, fechaDe(p.mercado), modo).map((c) => ({ mercado: p.mercado.codigo, slug: c.definicion.slug }))),
    publicabilidad: (codigo, slug, fecha, modo = "produccion") => {
      const p = pais(codigo);
      const c = calculadora(codigo, slug);
      if (!p || !c) return { publicable: false, motivos: [`no existe ${codigo}/${slug}`] };
      return publicabilidad(p, c, fecha, modo);
    },
    pagina: (codigo, slug, fecha, modo = "produccion") => {
      const p = pais(codigo);
      const entrada = calculadora(codigo, slug);
      if (!p || !entrada || !publicablesDe(p, fecha, modo).conjunto.has(entrada)) return null;
      const def = entrada.definicion;
      const r = resolverValores(p, def, fecha);
      if (!r.ok) return null;
      const m = p.mercado;
      return {
        mercado: m,
        calculadora: { id: def.id, slug: def.slug, concepto: def.concepto, ...(def.producto ? { producto: def.producto } : {}) },
        contenido: rellenarContenido(entrada.contenido, { valores: r.valores, usados: r.usados, unidades: unidadesDe(p), locale: m.locale, simbolos: m.simbolos }),
        props: {
          valores: r.valores,
          contexto: {
            fecha,
            mercado: m.codigo,
            locale: m.locale,
            idioma: m.idioma,
            trato: m.trato,
            moneda: m.monedas[0],
            redondeo: def.redondeo ?? m.redondeo,
            regiones: m.regiones ?? [],
            ...(m.simbolos ? { simbolos: m.simbolos } : {}),
          },
          avisos: avisosVigentes(p.avisos, fecha, def),
          opcionesDinamicas: opcionesDinamicas(p, def, r.valores),
        },
        sello: selloDe(r.usados),
        usados: r.usados,
        equivalentes: equivalentes(def.concepto, () => fecha, modo),
        cliente: entrada.cliente,
        ...(esUniversal(entrada) ? { universal: entrada.universal } : {}),
      };
    },
    equivalentes,
    fichas: (codigo, fecha) => {
      const p = pais(codigo);
      if (!p) return [];
      return p.datos.map((dato) => {
        const regiones = dato.regiones ?? [undefined];
        const vigentes = regiones.flatMap((region) => {
          const t = vigente(dato, fecha, region);
          return t ? [{ ...(region ? { region } : {}), valor: t.valor, desde: t.desde, ...(t.hasta ? { hasta: t.hasta } : {}), fuente: t.fuente }] : [];
        });
        return { dato, vigentes };
      });
    },
    fichasSeries: (codigo, fecha) => (pais(codigo)?.series ?? []).map((serie) => ({ serie, vigente: valorSerie(serie, fecha), ultimo: ultimoPunto(serie) })),
  };
}
