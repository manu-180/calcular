import { esConcepto } from "./conceptos";
import { validarArchivoAvisos, validarArchivoDatos, validarArchivoSeries, validarMercado } from "./datos";
import { formatearFecha, formatearValorUnidad } from "./formato";
import { avisosVigentes, hoyMasAdelantado, valorSerie, vigente, vigentePorRegion } from "./vigencia";
import type {
  CodigoMercado,
  ContenidoCalculadora,
  Dato,
  DeclaracionPais,
  DefinicionCalculadora,
  EntradaCalculadora,
  FechaISO,
  Fuente,
  Mercado,
  OpcionDinamica,
  PaisDefinido,
  PropsCalculadora,
  Requisito,
  Serie,
  TipoDato,
  Unidad,
  ValorResuelto,
} from "./tipos";

export type ModoPublicacion = "produccion" | "interno";

export function definirPais(declaracion: DeclaracionPais): PaisDefinido {
  const { mercado } = declaracion;
  const hoy = hoyMasAdelantado();
  const errores: string[] = validarMercado(mercado);
  const datos = declaracion.datos === undefined ? { valor: { mercado: mercado.codigo, datos: [] }, errores: [] } : validarArchivoDatos(declaracion.datos, mercado, hoy);
  const series = declaracion.series === undefined ? { valor: { mercado: mercado.codigo, series: [] }, errores: [] } : validarArchivoSeries(declaracion.series, mercado, hoy);
  const avisos = declaracion.avisos === undefined ? { valor: { mercado: mercado.codigo, avisos: [] }, errores: [] } : validarArchivoAvisos(declaracion.avisos, mercado, hoy);
  errores.push(...datos.errores, ...series.errores, ...avisos.errores);
  return {
    mercado,
    datos: datos.valor?.datos ?? [],
    series: series.valor?.series ?? [],
    avisos: avisos.valor?.avisos ?? [],
    calculadoras: declaracion.calculadoras ?? [],
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
    const serie = pais.series.find((s) => s.id === id);
    if (!serie) return { ok: false, motivo: `${id}: no existe en series.json` };
    const punto = valorSerie(serie, fecha);
    if (!punto) return { ok: false, motivo: `${id}: sin valor en los últimos ${serie.maxAntiguedadDias} días al ${fecha}` };
    return {
      ok: true,
      valor: punto,
      usados: [{ id, nombre: serie.nombre, clase: "serie", unidad: serie.unidad, fuente: serie.fuente, desde: punto.fecha }],
    };
  }
  const dato = pais.datos.find((d) => d.id === id);
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
}

export interface FichaDato {
  dato: Dato;
  vigentes: { region?: string; valor: unknown; desde: FechaISO; hasta?: FechaISO; fuente: Fuente }[];
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
}

export function opcionesDinamicas(pais: PaisDefinido, definicion: DefinicionCalculadora, valores: Readonly<Record<string, ValorResuelto>>) {
  const salida: Record<string, OpcionDinamica[]> = {};
  for (const c of definicion.campos) {
    if (c.tipo !== "opcion-dato") continue;
    const mapa = valores[c.dato];
    const dato = pais.datos.find((d) => d.id === c.dato);
    if (!mapa || typeof mapa !== "object" || Array.isArray(mapa)) continue;
    salida[c.id] = Object.keys(mapa).map((k) => ({ valor: k, etiqueta: dato?.etiquetas?.[k] ?? k }));
  }
  return salida;
}

export function crearRegistro(paises: readonly PaisDefinido[]): Registro {
  const codigos = paises.map((p) => p.mercado.codigo);
  const repetido = codigos.find((c, i) => codigos.indexOf(c) !== i);
  if (repetido) throw new Error(`Registro de países: el mercado ${repetido} está dos veces`);

  const pais = (codigo: CodigoMercado) => paises.find((p) => p.mercado.codigo === codigo);

  const publicables = (codigo: CodigoMercado, fecha: FechaISO, modo: ModoPublicacion) => {
    const p = pais(codigo);
    if (!p || !mercadoVisible(p, modo)) return [];
    return p.calculadoras.filter((c) => publicabilidad(p, c, fecha, modo).publicable);
  };

  const equivalentes = (concepto: string, fechaDe: (m: Mercado) => FechaISO, modo: ModoPublicacion = "produccion") => {
    if (concepto === "propio") return [];
    return paises.flatMap((p) =>
      publicables(p.mercado.codigo, fechaDe(p.mercado), modo)
        .filter((c) => c.definicion.concepto === concepto)
        .map((c) => ({ mercado: p.mercado.codigo, locale: p.mercado.locale, slug: c.definicion.slug })),
    );
  };

  return {
    paises,
    pais,
    mercados: (modo = "produccion") => paises.filter((p) => mercadoVisible(p, modo)).map((p) => p.mercado),
    calculadora: (codigo, slug) => pais(codigo)?.calculadoras.find((c) => c.definicion.slug === slug),
    calculadorasPublicables: (codigo, fecha, modo = "produccion") => publicables(codigo, fecha, modo),
    rutas: (fechaDe, modo = "produccion") =>
      paises.flatMap((p) => publicables(p.mercado.codigo, fechaDe(p.mercado), modo).map((c) => ({ mercado: p.mercado.codigo, slug: c.definicion.slug }))),
    publicabilidad: (codigo, slug, fecha, modo = "produccion") => {
      const p = pais(codigo);
      const c = p?.calculadoras.find((x) => x.definicion.slug === slug);
      if (!p || !c) return { publicable: false, motivos: [`no existe ${codigo}/${slug}`] };
      return publicabilidad(p, c, fecha, modo);
    },
    pagina: (codigo, slug, fecha, modo = "produccion") => {
      const p = pais(codigo);
      const entrada = p?.calculadoras.find((x) => x.definicion.slug === slug);
      if (!p || !entrada || !publicabilidad(p, entrada, fecha, modo).publicable) return null;
      const def = entrada.definicion;
      const r = resolverValores(p, def, fecha);
      if (!r.ok) return null;
      const unidades: Record<string, Unidad> = {};
      for (const d of p.datos) unidades[d.id] = d.unidad;
      for (const s of p.series) unidades[s.id] = s.unidad;
      const m = p.mercado;
      return {
        mercado: m,
        calculadora: { id: def.id, slug: def.slug, concepto: def.concepto, ...(def.producto ? { producto: def.producto } : {}) },
        contenido: rellenarContenido(entrada.contenido, { valores: r.valores, usados: r.usados, unidades, locale: m.locale, simbolos: m.simbolos }),
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
  };
}

export function serieDe(pais: PaisDefinido, id: string): Serie | undefined {
  return pais.series.find((s) => s.id === id);
}
