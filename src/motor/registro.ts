import { esConcepto } from "./conceptos";
import { esMercadoDePrueba, validarArchivoAvisos, validarArchivoDatos, validarArchivoSeries, validarMercado } from "./datos";
import { aplicarTextos, faltantesDeTextos, type TextosEdicion } from "./edicion";
import { formatearFecha, formatearValorUnidad } from "./formato";
import { UNIVERSALES } from "./universales";
import { PODADAS, type Podadas } from "./universales/poda";
import { idiomasDe, instanciar, type ContextoUniversal, type Universal } from "./universales/tipos";
import { avisosVigentes, hoyEn, hoyMasAdelantado, ultimoPunto, valorSerie, vigente, vigentePorRegion } from "./vigencia";
import type {
  Aviso,
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
  Novedad,
  OpcionDinamica,
  PaisDefinido,
  PropsCalculadora,
  PuntoSerie,
  Region,
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
  const definicion = u.definir({ ...ctx, slug: ctx.slug || u.textos[ctx.idioma]!.slug }, u.textos[ctx.idioma]!.ui(ctx.trato, ctx.locale));
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

// Edición de un país en otro idioma (ADR 0002, D3): /ca-fr reusa datos, series, avisos y detectores
// de /ca y escribe solo textos. Una calculadora del país entra cuando la edición trae sus textos y su
// contenido (traducciones); las que no, no se publican en la edición. Monedas, zona horaria,
// redondeo, escala y unidades son las del país: la edición declara código, nombre, locale, idioma,
// trato, estado y, si quiere, los nombres de las regiones en su idioma (mismos ids).
export type MercadoEdicion = Pick<Mercado, "codigo" | "nombre" | "locale" | "idioma" | "trato" | "estado"> & Partial<Pick<Mercado, "pais" | "regiones" | "simbolos">>;

export interface TraduccionCalculadora {
  textos: TextosEdicion;
  contenido: ContenidoCalculadora;
}

export interface DeclaracionEdicion {
  mercado: MercadoEdicion;
  traducciones?: readonly TraduccionCalculadora[];
  // Calculadoras propias de la edición (mercado e id con el código de la edición).
  calculadoras?: readonly EntradaCalculadora[];
  universales?: SeleccionUniversales;
  // Título y texto de cada aviso del país en el idioma de la edición, por id. Un aviso que alcanza a
  // la edición sin traducción es un error: un aviso que bloquea no se puede perder por el idioma.
  avisos?: Readonly<Record<string, { titulo?: string; texto: string }>>;
  // Nombre y etiquetas (opciones de un mapa) de datos y series del país, por id.
  datos?: Readonly<Record<string, { nombre?: string; etiquetas?: Readonly<Record<string, string>> }>>;
  novedades?: readonly Novedad[];
}

const sinClienteTraducido = () =>
  Promise.reject(new Error("una calculadora traducida no tiene <slug>.cliente: la arman los cargadores con la definición del país y los textos de la edición"));

function mercadoDeEdicion(base: Mercado, m: MercadoEdicion, errores: string[]): Mercado {
  const cod = m.codigo;
  if (base.codigo.includes("-") || base.codigo === "global") errores.push(`edición ${cod}: el país base ${base.codigo} no puede ser otra edición ni global`);
  if (cod !== `${base.codigo}-${m.idioma}`) errores.push(`edición ${cod}: el código tiene que ser ${base.codigo}-${m.idioma}`);
  if (m.idioma === base.idioma) errores.push(`edición ${cod}: está en ${m.idioma}, el mismo idioma que ${base.codigo}`);
  if (m.pais !== undefined && m.pais !== base.pais) errores.push(`edición ${cod}: pais ${m.pais} no es el de ${base.codigo} (${base.pais})`);
  let regiones: readonly Region[] | undefined = base.regiones;
  if (m.regiones) {
    const ids = (r?: readonly Region[]) => (r ?? []).map((x) => x.id).join(",");
    if (ids(m.regiones) !== ids(base.regiones)) errores.push(`edición ${cod}: las regiones tienen que ser las de ${base.codigo}, en el mismo orden (${ids(base.regiones)})`);
    else regiones = m.regiones;
  }
  return {
    ...base,
    codigo: cod,
    nombre: m.nombre,
    locale: m.locale,
    idioma: m.idioma,
    trato: m.trato,
    estado: m.estado,
    ...(regiones ? { regiones } : {}),
    ...(m.simbolos ? { simbolos: m.simbolos } : {}),
  };
}

export function definirEdicion(base: PaisDefinido, declaracion: DeclaracionEdicion): PaisDefinido {
  const errores: string[] = [];
  const mercado = mercadoDeEdicion(base.mercado, declaracion.mercado, errores);
  errores.push(...validarMercado(mercado));
  const cod = mercado.codigo;
  if (base.errores.length) errores.push(`edición ${cod}: el país ${base.mercado.codigo} tiene ${base.errores.length} errores de datos`);
  if (base.edicionDe) errores.push(`edición ${cod}: ${base.mercado.codigo} ya es una edición de ${base.edicionDe}`);

  const delPais = new Map(base.calculadoras.filter((c) => !esUniversal(c)).map((c) => [c.definicion.id, c]));
  const traducidas: EntradaCalculadora[] = [];
  const idsTraducidos = new Map<string, string>();
  for (const { textos, contenido } of declaracion.traducciones ?? []) {
    const original = delPais.get(textos.base);
    const donde = `edición ${cod}: textos de ${textos.base}`;
    if (!original) {
      errores.push(`${donde}: no es una calculadora local de ${base.mercado.codigo}`);
      continue;
    }
    const local = textos.base.slice(textos.base.indexOf(".") + 1);
    if (textos.calculadora !== `${cod}.${local}`) errores.push(`${donde}: calculadora tiene que ser "${cod}.${local}"`);
    const faltan = faltantesDeTextos(original.definicion, textos);
    if (faltan.length) errores.push(`${donde}: falta traducir ${faltan.join(", ")}`);
    traducidas.push({
      definicion: aplicarTextos(original.definicion, textos),
      contenido,
      cliente: sinClienteTraducido,
      traduccion: { mercado: base.mercado.codigo, archivo: original.definicion.slug, id: original.definicion.id },
    });
    idsTraducidos.set(textos.base, textos.calculadora);
  }

  const textosDatos = declaracion.datos ?? {};
  for (const id of Object.keys(textosDatos)) {
    if (!base.datos.some((d) => d.id === id) && !base.series.some((x) => x.id === id)) errores.push(`edición ${cod}: datos.${id} no es un dato ni una serie de ${base.mercado.codigo}`);
  }
  const datos = base.datos.map((d) => {
    const t = textosDatos[d.id];
    return t ? { ...d, ...(t.nombre ? { nombre: t.nombre } : {}), ...(t.etiquetas ? { etiquetas: { ...d.etiquetas, ...t.etiquetas } } : {}) } : d;
  });
  const series = base.series.map((x) => {
    const nombre = textosDatos[x.id]?.nombre;
    return nombre ? { ...x, nombre } : x;
  });

  const textosAvisos = declaracion.avisos ?? {};
  const avisos: Aviso[] = [];
  for (const a of base.avisos) {
    let aplicaA: Aviso["aplicaA"] = "*";
    if (a.aplicaA !== "*") {
      aplicaA = a.aplicaA.flatMap((x) => (esConcepto(x) ? [x] : idsTraducidos.has(x) ? [idsTraducidos.get(x)!] : []));
      if (aplicaA.length === 0) continue;
    }
    const t = textosAvisos[a.id];
    if (!t?.texto?.trim()) {
      errores.push(`edición ${cod}: el aviso ${a.id} alcanza a la edición y no tiene texto en ${mercado.idioma}`);
      continue;
    }
    avisos.push({ ...a, aplicaA, texto: t.texto, ...(t.titulo ? { titulo: t.titulo } : {}) });
  }
  for (const id of Object.keys(textosAvisos)) if (!base.avisos.some((a) => a.id === id)) errores.push(`edición ${cod}: avisos.${id} no es un aviso de ${base.mercado.codigo}`);

  const locales = [...traducidas, ...(declaracion.calculadoras ?? [])];
  const universales = declaracion.universales ? universalesDelPais(mercado, locales, declaracion.universales, errores) : [];
  return {
    mercado,
    datos,
    series,
    avisos,
    calculadoras: [...locales, ...universales],
    novedades: declaracion.novedades ?? [],
    detectores: [],
    errores,
    edicionDe: base.mercado.codigo,
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
  if (esMercadoDePrueba(pais.mercado.codigo) && modo === "produccion") return false;
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

// {{id}} número o serie (el punto vigente a la fecha) · {{id[clave]}} mapa · {{id[n].tasa}} fila n de
// una escala (desde 0; -1 es la última) y su campo: desde, hasta, tasa o cuotaFija · @region para
// datos por región · #desde la fecha desde la que rige (o la del punto de la serie).
const RE_MARCADOR = /\{\{\s*([a-z0-9]{2,6}\.[a-z0-9-]+)(?:\[(-?[a-z0-9-]+)\](?:\.(desde|hasta|tasa|cuotaFija))?)?(?:@([a-z0-9-]+))?(?:#(desde))?\s*\}\}/g;

export type CampoFila = "desde" | "hasta" | "tasa" | "cuotaFija";

export interface Marcador {
  texto: string;
  id: string;
  clave?: string;
  campo?: CampoFila;
  region?: string;
  desde: boolean;
}

export function marcadoresDe(texto: string): Marcador[] {
  return [...texto.matchAll(RE_MARCADOR)].map((m) => ({
    texto: m[0],
    id: m[1],
    ...(m[2] ? { clave: m[2] } : {}),
    ...(m[3] ? { campo: m[3] as CampoFila } : {}),
    ...(m[4] ? { region: m[4] } : {}),
    desde: m[5] === "desde",
  }));
}

function filaDeEscala(valor: unknown, indice: string, campo: CampoFila): unknown {
  if (!Array.isArray(valor) || !/^-?\d+$/.test(indice)) return undefined;
  const n = Number(indice);
  const fila: unknown = valor[n < 0 ? valor.length + n : n];
  return fila && typeof fila === "object" ? (fila as Record<string, unknown>)[campo] : undefined;
}

// {{anio}}: el año de la fecha del mercado. Va en title, description y h1 («Aguinaldo {{anio}}»): el
// año que la gente escribe en la búsqueda cambia cada 1 de enero y 1.379 textos lo tenían tipeado.
const RE_ANIO = /\{\{\s*anio\s*\}\}/g;

// ¿Hay algo que resolver en el texto? Un dato o {{anio}}, que no es un marcador de dato (search no
// depende del lastIndex de la regex global).
export function tieneMarcadores(texto: string): boolean {
  return marcadoresDe(texto).length > 0 || texto.search(RE_ANIO) >= 0;
}

export function hayLlavesSueltas(texto: string): boolean {
  return /\{\{|\}\}/.test(texto.replace(RE_MARCADOR, "").replace(RE_ANIO, ""));
}

interface ContextoRelleno {
  valores: Readonly<Record<string, ValorResuelto>>;
  usados: readonly DatoUsado[];
  unidades: Readonly<Record<string, Unidad>>;
  locale: string;
  simbolos?: Mercado["simbolos"];
  // Año de {{anio}}; sin él, el del reloj (checks y validaciones sin fecha de mercado).
  anio?: number;
  // Sin esto, un marcador que no se resuelve queda en el texto y sale por console.error.
  alFallar?: (marcador: string) => void;
}

function rellenar(texto: string, ctx: ContextoRelleno): string {
  return texto.replace(RE_ANIO, String(ctx.anio ?? new Date().getFullYear())).replace(RE_MARCADOR, (todo, id: string, clave?: string, campo?: CampoFila, region?: string, desde?: string) => {
    let unidad: Unidad | undefined = ctx.unidades[id];
    let valor: unknown = ctx.valores[id];
    if (desde) {
      const u = ctx.usados.find((x) => x.id === id && (region === undefined || x.region === region));
      if (u) return formatearFecha(u.desde, ctx.locale);
      (ctx.alFallar ?? ((m) => console.error(`[motor] marcador sin resolver: ${m}`)))(todo);
      return todo;
    }
    if (region !== undefined) valor = (valor as Record<string, unknown> | undefined)?.[region];
    if (campo !== undefined && clave !== undefined) {
      valor = filaDeEscala(valor, clave, campo);
      if (campo === "tasa") unidad = "%";
    } else if (clave !== undefined) valor = (valor as Record<string, unknown> | undefined)?.[clave];
    if (valor !== null && typeof valor === "object" && "valor" in valor) valor = (valor as { valor: unknown }).valor;
    if (typeof valor !== "number" || unidad === undefined) {
      (ctx.alFallar ?? ((m) => console.error(`[motor] marcador sin resolver: ${m}`)))(todo);
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
  // Universal podada (universales/poda.ts): noindex, fuera del sitemap y sin clúster.
  podada?: true;
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
  // Universal sin tráfico sacada del índice; una local nunca da true aunque figure en la lista.
  podada(codigo: CodigoMercado, slug: string): boolean;
  // La fecha con la que se evalúa cada mercado del clúster de una página de `codigo` (la página en `fecha`).
  fechaDelClusterDesde(codigo: CodigoMercado, fecha: FechaISO): (m: Mercado) => FechaISO;
  // La misma calculadora en las ediciones del país (ca/vacation-pay y ca-fr/paie-de-vacances),
  // incluida ella; vacío si no tiene. Es el clúster de una calculadora "propio" entre idiomas.
  hermanas(codigo: CodigoMercado, slug: string, fechaDe: (m: Mercado) => FechaISO, modo?: ModoPublicacion): Equivalente[];
  // Las ediciones visibles del país del mercado (ca y ca-fr), o solo él si tiene una.
  ediciones(codigo: CodigoMercado, modo?: ModoPublicacion): Mercado[];
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

export function crearRegistro(paises: readonly PaisDefinido[], podadas: Podadas = PODADAS): Registro {
  const porCodigo = new Map<CodigoMercado, PaisDefinido>();
  for (const p of paises) {
    if (porCodigo.has(p.mercado.codigo)) throw new Error(`Registro de países: el mercado ${p.mercado.codigo} está dos veces`);
    porCodigo.set(p.mercado.codigo, p);
  }
  const porSlug = new Map<CodigoMercado, ReadonlyMap<string, EntradaCalculadora>>();
  const porConcepto = new Map<string, { pais: PaisDefinido; entrada: EntradaCalculadora }[]>();
  // Clave: id de la calculadora en el país base; agrupa la original con sus traducciones.
  const porOrigen = new Map<string, { pais: PaisDefinido; entrada: EntradaCalculadora }[]>();
  const porPaisIso = new Map<string, PaisDefinido[]>();
  const agregar = <K, V>(mapa: Map<K, V[]>, clave: K, valor: V) => {
    let lista = mapa.get(clave);
    if (!lista) mapa.set(clave, (lista = []));
    lista.push(valor);
  };
  for (const p of paises) {
    porSlug.set(p.mercado.codigo, new Map(p.calculadoras.map((c) => [c.definicion.slug, c])));
    if (p.mercado.pais) agregar(porPaisIso, p.mercado.pais, p);
    for (const entrada of p.calculadoras) {
      if (!esUniversal(entrada)) agregar(porOrigen, entrada.traduccion?.id ?? entrada.definicion.id, { pais: p, entrada });
      const concepto = entrada.definicion.concepto;
      if (concepto !== "propio") agregar(porConcepto, concepto, { pais: p, entrada });
    }
  }

  const pais = (codigo: CodigoMercado) => porCodigo.get(codigo);
  const calculadora = (codigo: CodigoMercado, slug: string) => porSlug.get(codigo)?.get(slug);
  const esPodada = (codigo: CodigoMercado, entrada: EntradaCalculadora) => esUniversal(entrada) && Boolean(podadas.mercados[codigo]?.[entrada.universal.id]);

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
      if (!publicablesDe(p, fechaDe(p.mercado), modo).conjunto.has(entrada) || esPodada(p.mercado.codigo, entrada)) continue;
      salida.push({ mercado: p.mercado.codigo, locale: p.mercado.locale, slug: entrada.definicion.slug });
    }
    return salida;
  };

  const hermanasDe = (entrada: EntradaCalculadora, fechaDe: (m: Mercado) => FechaISO, modo: ModoPublicacion): Equivalente[] => {
    if (esUniversal(entrada)) return [];
    const grupo = porOrigen.get(entrada.traduccion?.id ?? entrada.definicion.id) ?? [];
    if (grupo.length < 2) return [];
    return grupo
      .filter(({ pais: p, entrada: e }) => publicablesDe(p, fechaDe(p.mercado), modo).conjunto.has(e))
      .map(({ pais: p, entrada: e }) => ({ mercado: p.mercado.codigo, locale: p.mercado.locale, slug: e.definicion.slug }));
  };

  // Concepto más hermanas, sin repetir mercado: una calculadora "propio" traducida forma su clúster
  // con las hermanas; una de concepto canónico ya las trae en el concepto.
  const equivalentesDe = (entrada: EntradaCalculadora, fechaDe: (m: Mercado) => FechaISO, modo: ModoPublicacion): Equivalente[] => {
    const salida = equivalentes(entrada.definicion.concepto, fechaDe, modo);
    const vistos = new Set(salida.map((e) => e.mercado));
    for (const h of hermanasDe(entrada, fechaDe, modo)) if (!vistos.has(h.mercado)) salida.push(h);
    return salida;
  };

  // Cada mercado del clúster se evalúa en SU fecha, no en la de la página: con la fecha de la página
  // para todos, en el cruce de medianoche entre zonas una serie que vence (ni.ipc el 25/10/2026) dejaba
  // a Nicaragua en el clúster de las páginas de América y afuera en las de Europa, y el hreflang dejaba
  // de ser recíproco (1.850 fallas en check_hreflang). Así, en un mismo instante, todas las páginas
  // describen el mismo clúster. La página misma sigue en la fecha que se le pasa.
  const fechaDelClusterDesde = (codigo: CodigoMercado, fecha: FechaISO) => (x: Mercado): FechaISO => (x.codigo === codigo ? fecha : hoyEn(x));

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
        contenido: rellenarContenido(entrada.contenido, { valores: r.valores, usados: r.usados, unidades: unidadesDe(p), locale: m.locale, simbolos: m.simbolos, anio: Number(fecha.slice(0, 4)) }),
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
        equivalentes: esPodada(m.codigo, entrada) ? [] : equivalentesDe(entrada, fechaDelClusterDesde(m.codigo, fecha), modo),
        cliente: entrada.cliente,
        ...(esUniversal(entrada) ? { universal: entrada.universal } : {}),
        ...(esPodada(m.codigo, entrada) ? { podada: true as const } : {}),
      };
    },
    equivalentes,
    podada: (codigo, slug) => {
      const entrada = calculadora(codigo, slug);
      return Boolean(entrada && esPodada(codigo, entrada));
    },
    fechaDelClusterDesde,
    hermanas: (codigo, slug, fechaDe, modo = "produccion") => {
      const entrada = calculadora(codigo, slug);
      return entrada ? hermanasDe(entrada, fechaDe, modo) : [];
    },
    ediciones: (codigo, modo = "produccion") => {
      const p = pais(codigo);
      if (!p?.mercado.pais) return p && mercadoVisible(p, modo) ? [p.mercado] : [];
      return (porPaisIso.get(p.mercado.pais) ?? []).filter((x) => mercadoVisible(x, modo)).map((x) => x.mercado);
    },
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
