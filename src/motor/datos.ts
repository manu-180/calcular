import { esFechaISO, hoyMasAdelantado } from "./vigencia";
import type {
  ArchivoAvisos,
  ArchivoDatos,
  ArchivoSeries,
  CodigoMercado,
  Dato,
  FechaISO,
  FilaEscala,
  Mercado,
  TipoDato,
  Tramo,
} from "./tipos";
import { esCodigoMercado, esMoneda, IDIOMAS, UNIDADES_REFERENCIA, UNIDADES_SIMPLES } from "./tipos";

export interface Validacion<T> {
  valor: T | null;
  errores: string[];
}

export const RE_ID_LOCAL = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RE_SLUG = RE_ID_LOCAL;

// Los datos son del país y las ediciones por idioma los comparten: ca.iva sirve para ca y para ca-fr.
export function paisDelMercado(mercado: CodigoMercado): string {
  return mercado.split("-")[0];
}

// zz y sus ediciones (zz-en) son de prueba: nunca se publican ni se ven en producción.
export function esMercadoDePrueba(mercado: CodigoMercado): boolean {
  return paisDelMercado(mercado) === "zz";
}

export function esIdDelMercado(id: unknown, mercado: CodigoMercado): id is string {
  if (typeof id !== "string") return false;
  const [pref, ...resto] = id.split(".");
  return (pref === mercado || pref === paisDelMercado(mercado)) && resto.length === 1 && RE_ID_LOCAL.test(resto[0]);
}

type Obj = Record<string, unknown>;
const esObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const esTexto = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const esNumero = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

const UNIDADES_FIJAS: readonly string[] = [...UNIDADES_REFERENCIA, ...UNIDADES_SIMPLES];
const esUnidad = (u: string): boolean => esMoneda(u) || UNIDADES_FIJAS.includes(u);
const HOSTS_DE_PRUEBA = /(^|\.)example\.(org|com|net)$/;

export function validarUrl(url: unknown, donde: string, mercado: CodigoMercado): string[] {
  if (typeof url !== "string" || url.length === 0) return [`${donde}: falta la url`];
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return [`${donde}: url inválida (${url})`];
  }
  if (u.protocol !== "https:") return [`${donde}: la url tiene que ser https (${url})`];
  if (!esMercadoDePrueba(mercado) && HOSTS_DE_PRUEBA.test(u.hostname)) return [`${donde}: url de ejemplo (${url}), solo vale en zz`];
  return [];
}

export function validarFuente(f: unknown, donde: string, mercado: CodigoMercado, hoy: FechaISO): string[] {
  if (!esObj(f)) return [`${donde}: falta la fuente`];
  const e: string[] = [];
  if (!esTexto(f.organismo)) e.push(`${donde}.organismo vacío`);
  if (!esTexto(f.titulo)) e.push(`${donde}.titulo vacío`);
  e.push(...validarUrl(f.url, `${donde}.url`, mercado));
  if (f.tipo !== "primaria" && f.tipo !== "secundaria") e.push(`${donde}.tipo tiene que ser "primaria" o "secundaria"`);
  if (!esFechaISO(f.verificadoEl)) e.push(`${donde}.verificadoEl no es una fecha AAAA-MM-DD`);
  else if (f.verificadoEl > hoy) e.push(`${donde}.verificadoEl (${f.verificadoEl}) está en el futuro`);
  if (f.nota !== undefined && typeof f.nota !== "string") e.push(`${donde}.nota tiene que ser texto`);
  return e;
}

export function validarEscala(v: unknown, donde: string): string[] {
  if (!Array.isArray(v) || v.length === 0) return [`${donde}: la escala tiene que ser una lista con al menos una fila`];
  const e: string[] = [];
  const filas = v as unknown[];
  filas.forEach((f, i) => {
    if (!esObj(f) || !esNumero(f.desde) || !esNumero(f.tasa) || !(f.hasta === null || esNumero(f.hasta))) {
      e.push(`${donde}[${i}]: fila inválida (desde, hasta o null, tasa en %)`);
      return;
    }
    if (f.cuotaFija !== undefined && !esNumero(f.cuotaFija)) e.push(`${donde}[${i}].cuotaFija no es número`);
    if (f.hasta !== null && (f.hasta as number) <= f.desde) e.push(`${donde}[${i}]: hasta tiene que ser mayor que desde`);
    if (f.hasta === null && i !== filas.length - 1) e.push(`${donde}[${i}]: solo la última fila puede tener hasta null`);
    if (i > 0) {
      const prev = filas[i - 1] as FilaEscala;
      if (esObj(prev) && esNumero(prev.hasta)) {
        const salto = (f.desde as number) - prev.hasta;
        if (salto < -1e-9 || salto > 0.0100001) e.push(`${donde}[${i}]: desde (${f.desde}) no continúa a la fila anterior (${prev.hasta})`);
      }
    }
  });
  return e;
}

export function validarValor(tipo: TipoDato, v: unknown, donde: string): string[] {
  if (tipo === "numero") return esNumero(v) ? [] : [`${donde}: tiene que ser un número`];
  if (tipo === "mapa") {
    if (!esObj(v) || Object.keys(v).length === 0) return [`${donde}: tiene que ser un objeto { clave: número }`];
    return Object.entries(v).flatMap(([k, n]) => {
      const e: string[] = [];
      if (!RE_ID_LOCAL.test(k)) e.push(`${donde}.${k}: clave inválida (minúsculas y guiones)`);
      if (!esNumero(n)) e.push(`${donde}.${k}: tiene que ser número`);
      return e;
    });
  }
  return validarEscala(v, donde);
}

function validarTramo(t: unknown, i: number, dato: Obj, mercado: CodigoMercado, hoy: FechaISO): string[] {
  const donde = `${dato.id}.tramos[${i}]`;
  if (!esObj(t)) return [`${donde}: no es un objeto`];
  const e: string[] = [];
  if (!esFechaISO(t.desde)) e.push(`${donde}.desde no es una fecha AAAA-MM-DD`);
  if (t.hasta !== undefined && !esFechaISO(t.hasta)) e.push(`${donde}.hasta no es una fecha AAAA-MM-DD`);
  if (esFechaISO(t.desde) && esFechaISO(t.hasta) && t.hasta < t.desde) e.push(`${donde}: hasta es anterior a desde`);
  const regiones = dato.regiones as string[] | undefined;
  if (regiones) {
    if (typeof t.region !== "string" || !regiones.includes(t.region)) e.push(`${donde}.region tiene que ser una de: ${regiones.join(", ")}`);
  } else if (t.region !== undefined) {
    e.push(`${donde}.region sobra: el dato no declara regiones`);
  }
  const tipo = dato.tipo as TipoDato;
  if (t.estado === "verificado") {
    if (t.valor === undefined) e.push(`${donde}: un tramo verificado necesita valor`);
    else e.push(...validarValor(tipo, t.valor, `${donde}.valor`));
    e.push(...validarFuente(t.fuente, `${donde}.fuente`, mercado, hoy));
    if (esObj(t.fuente) && t.fuente.tipo !== "primaria") e.push(`${donde}: verificado exige fuente primaria (diario oficial, ministerio, banco central o ente recaudador)`);
    if ("motivo" in t) e.push(`${donde}: un tramo verificado no lleva motivo`);
  } else if (t.estado === "no-verificado") {
    if (!esTexto(t.motivo)) e.push(`${donde}: un tramo no-verificado necesita motivo`);
    if (t.valor !== undefined) e.push(...validarValor(tipo, t.valor, `${donde}.valor`));
    if (t.fuente !== undefined) e.push(...validarFuente(t.fuente, `${donde}.fuente`, mercado, hoy));
  } else {
    e.push(`${donde}.estado tiene que ser "verificado" o "no-verificado"`);
  }
  return e;
}

export function validarSolapes(dato: Pick<Dato, "id" | "tramos" | "regiones">): string[] {
  const e: string[] = [];
  const grupos = new Map<string, Tramo[]>();
  for (const t of dato.tramos) {
    const k = t.region ?? "";
    grupos.set(k, [...(grupos.get(k) ?? []), t]);
  }
  for (const [region, tramos] of grupos) {
    for (let i = 1; i < tramos.length; i++) {
      const a = tramos[i - 1];
      const b = tramos[i];
      if (b.desde <= a.desde) e.push(`${dato.id}: tramos fuera de orden${region ? ` en ${region}` : ""} (${b.desde} después de ${a.desde}); ordenalos por desde`);
      else if (a.hasta === undefined || a.hasta >= b.desde) {
        e.push(`${dato.id}: el tramo desde ${a.desde} se solapa con el que empieza ${b.desde}${region ? ` en ${region}` : ""} (poné hasta al anterior)`);
      }
    }
  }
  return e;
}

function validarDato(d: unknown, i: number, mercado: Mercado, hoy: FechaISO): string[] {
  if (!esObj(d)) return [`datos[${i}]: no es un objeto`];
  const id = String(d.id);
  const e: string[] = [];
  if (!esIdDelMercado(d.id, mercado.codigo)) e.push(`datos[${i}].id "${id}" tiene que ser "${mercado.codigo}.<kebab-case>"`);
  if (!esTexto(d.nombre)) e.push(`${id}.nombre vacío`);
  if (d.tipo !== "numero" && d.tipo !== "mapa" && d.tipo !== "escala") e.push(`${id}.tipo tiene que ser "numero", "mapa" o "escala"`);
  if (typeof d.unidad !== "string" || !esUnidad(d.unidad)) e.push(`${id}.unidad "${String(d.unidad)}" no es una unidad conocida`);
  if (d.regiones !== undefined) {
    const declaradas = (mercado.regiones ?? []).map((r) => r.id);
    if (!Array.isArray(d.regiones) || d.regiones.length === 0) e.push(`${id}.regiones tiene que ser una lista no vacía`);
    else for (const r of d.regiones) if (!declaradas.includes(r)) e.push(`${id}.regiones: "${r}" no está en mercado.regiones`);
  }
  if (d.etiquetas !== undefined && (!esObj(d.etiquetas) || !Object.values(d.etiquetas).every(esTexto))) e.push(`${id}.etiquetas tiene que ser { clave: texto }`);
  if (d.proximaRevision !== undefined && !esFechaISO(d.proximaRevision)) e.push(`${id}.proximaRevision no es una fecha`);
  if (!Array.isArray(d.tramos) || d.tramos.length === 0) {
    e.push(`${id}: necesita al menos un tramo`);
    return e;
  }
  if (e.length) return e;
  d.tramos.forEach((t, j) => e.push(...validarTramo(t, j, d, mercado.codigo, hoy)));
  if (e.length === 0) e.push(...validarSolapes(d as unknown as Dato));
  return e;
}

function validarEncabezado(json: unknown, clave: string, mercado: Mercado): { e: string[]; lista: unknown[] } {
  if (!esObj(json)) return { e: ["el archivo no es un objeto JSON"], lista: [] };
  const e: string[] = [];
  if (json.mercado !== mercado.codigo) e.push(`"mercado" tiene que ser "${mercado.codigo}"`);
  const lista = json[clave];
  if (!Array.isArray(lista)) return { e: [...e, `falta la lista "${clave}"`], lista: [] };
  const ids = lista.map((x) => (esObj(x) ? x.id : undefined));
  const repetidos = ids.filter((x, i) => x !== undefined && ids.indexOf(x) !== i);
  if (repetidos.length) e.push(`ids repetidos: ${[...new Set(repetidos)].join(", ")}`);
  return { e, lista };
}

export function validarArchivoDatos(json: unknown, mercado: Mercado, hoy: FechaISO = hoyMasAdelantado()): Validacion<ArchivoDatos> {
  const { e, lista } = validarEncabezado(json, "datos", mercado);
  lista.forEach((d, i) => e.push(...validarDato(d, i, mercado, hoy)));
  return { valor: e.length ? null : (json as ArchivoDatos), errores: e.map((x) => `datos.json: ${x}`) };
}

export function validarArchivoSeries(json: unknown, mercado: Mercado, hoy: FechaISO = hoyMasAdelantado()): Validacion<ArchivoSeries> {
  const { e, lista } = validarEncabezado(json, "series", mercado);
  lista.forEach((s, i) => {
    if (!esObj(s)) return void e.push(`series[${i}]: no es un objeto`);
    const id = String(s.id);
    if (!esIdDelMercado(s.id, mercado.codigo)) e.push(`series[${i}].id "${id}" tiene que ser "${mercado.codigo}.<kebab-case>"`);
    if (!esTexto(s.nombre)) e.push(`${id}.nombre vacío`);
    if (typeof s.unidad !== "string" || !esUnidad(s.unidad)) e.push(`${id}.unidad desconocida`);
    if (!["diaria", "semanal", "mensual", "trimestral", "anual"].includes(String(s.frecuencia))) e.push(`${id}.frecuencia inválida`);
    if (!esNumero(s.maxAntiguedadDias) || s.maxAntiguedadDias <= 0) e.push(`${id}.maxAntiguedadDias tiene que ser un número positivo`);
    e.push(...validarFuente(s.fuente, `${id}.fuente`, mercado.codigo, hoy));
    if (esObj(s.fuente) && s.fuente.tipo !== "primaria") e.push(`${id}.fuente: una serie se publica sola, así que solo acepta fuente primaria`);
    if (!Array.isArray(s.puntos) || s.puntos.length === 0) return void e.push(`${id}.puntos vacío`);
    let anterior = "";
    s.puntos.forEach((p: unknown, j: number) => {
      if (!Array.isArray(p) || p.length !== 2 || !esFechaISO(p[0]) || !esNumero(p[1])) return void e.push(`${id}.puntos[${j}]: tiene que ser ["AAAA-MM-DD", número]`);
      if (p[0] <= anterior) e.push(`${id}.puntos[${j}]: fechas repetidas o fuera de orden (${p[0]})`);
      anterior = p[0];
    });
  });
  return { valor: e.length ? null : (json as ArchivoSeries), errores: e.map((x) => `series.json: ${x}`) };
}

export function validarArchivoAvisos(json: unknown, mercado: Mercado, hoy: FechaISO = hoyMasAdelantado()): Validacion<ArchivoAvisos> {
  const { e, lista } = validarEncabezado(json, "avisos", mercado);
  lista.forEach((a, i) => {
    if (!esObj(a)) return void e.push(`avisos[${i}]: no es un objeto`);
    const id = String(a.id);
    if (!esIdDelMercado(a.id, mercado.codigo)) e.push(`avisos[${i}].id "${id}" tiene que ser "${mercado.codigo}.<kebab-case>"`);
    if (!["info", "cautela", "bloquea"].includes(String(a.nivel))) e.push(`${id}.nivel tiene que ser info, cautela o bloquea`);
    if (!esFechaISO(a.desde)) e.push(`${id}.desde no es una fecha`);
    if (a.hasta !== undefined && (!esFechaISO(a.hasta) || (esFechaISO(a.desde) && a.hasta < a.desde))) e.push(`${id}.hasta inválido`);
    if (a.aplicaA !== "*" && (!Array.isArray(a.aplicaA) || a.aplicaA.length === 0 || !a.aplicaA.every(esTexto))) e.push(`${id}.aplicaA tiene que ser "*" o una lista de ids de calculadora o conceptos`);
    if (!esTexto(a.texto)) e.push(`${id}.texto vacío`);
    if (a.titulo !== undefined && !esTexto(a.titulo)) e.push(`${id}.titulo vacío`);
    e.push(...validarFuente(a.fuente, `${id}.fuente`, mercado.codigo, hoy));
  });
  return { valor: e.length ? null : (json as ArchivoAvisos), errores: e.map((x) => `avisos.json: ${x}`) };
}

export function validarMercado(m: unknown): string[] {
  if (!esObj(m)) return ["mercado: no es un objeto"];
  const e: string[] = [];
  const cod = String(m.codigo);
  if (!/^[A-Z]{2}$/.test(String(m.pais)) && m.codigo !== "global") e.push(`mercado ${cod}: pais tiene que ser ISO 3166-1 alfa-2 en mayúsculas`);
  if (!esTexto(m.nombre)) e.push(`mercado ${cod}: nombre vacío`);
  try {
    const [canon] = Intl.getCanonicalLocales(String(m.locale));
    if (canon !== m.locale) e.push(`mercado ${cod}: locale "${String(m.locale)}" no es canónico (sería "${canon}")`);
  } catch {
    e.push(`mercado ${cod}: locale inválido`);
  }
  if (!(IDIOMAS as readonly unknown[]).includes(m.idioma)) e.push(`mercado ${cod}: idioma tiene que ser uno de ${IDIOMAS.join(", ")}`);
  // Sin la extensión, Intl escribe ٣٬٥٠٠ en ar-EG y fechas de la Hégira en ar-SA (Chrome): los
  // sitios financieros árabes usan dígitos latinos y calendario gregoriano (ADR 0002, D9).
  if (m.idioma === "ar" && !String(m.locale).endsWith("-u-ca-gregory-nu-latn")) e.push(`mercado ${cod}: un locale árabe lleva -u-ca-gregory-nu-latn (por ejemplo "ar-EG-u-ca-gregory-nu-latn")`);
  if (!esCodigoMercado(cod)) e.push(`mercado ${cod}: el código tiene que ser global, zz o un ISO 3166-1 alfa-2 en minúscula con sufijo de idioma opcional`);
  else if (cod !== "global" && cod !== "zz") {
    const [pais, sufijo] = cod.split("-");
    if (pais !== String(m.pais).toLowerCase()) e.push(`mercado ${cod}: el código no coincide con el país ${String(m.pais)}`);
    if (sufijo !== undefined && sufijo !== m.idioma) e.push(`mercado ${cod}: una edición con sufijo -${sufijo} tiene que tener idioma "${sufijo}"`);
  }
  if (!["vos", "tu", "usted"].includes(String(m.trato))) e.push(`mercado ${cod}: trato tiene que ser vos, tu o usted`);
  if (!Array.isArray(m.monedas) || m.monedas.length === 0 || !m.monedas.every((x) => typeof x === "string" && esMoneda(x))) e.push(`mercado ${cod}: monedas inválidas`);
  try {
    new Intl.DateTimeFormat("en", { timeZone: String(m.zonaHoraria) });
  } catch {
    e.push(`mercado ${cod}: zonaHoraria "${String(m.zonaHoraria)}" no existe`);
  }
  if (!["borrador", "interno", "publicado"].includes(String(m.estado))) e.push(`mercado ${cod}: estado inválido`);
  if (esMercadoDePrueba(cod) && m.estado === "publicado") e.push(`mercado ${cod}: es de prueba y nunca puede estar publicado`);
  if (m.regiones !== undefined) {
    if (!Array.isArray(m.regiones) || m.regiones.length < 2) e.push(`mercado ${cod}: regiones, si existe, lleva al menos dos`);
    else {
      const ids = m.regiones.map((r: unknown) => (esObj(r) ? r.id : undefined));
      if (!ids.every((x) => typeof x === "string" && RE_ID_LOCAL.test(x))) e.push(`mercado ${cod}: ids de región en kebab-case`);
      if (new Set(ids).size !== ids.length) e.push(`mercado ${cod}: regiones repetidas`);
      if (!m.regiones.every((r: unknown) => esObj(r) && esTexto(r.nombre))) e.push(`mercado ${cod}: cada región necesita nombre`);
    }
  }
  if (m.simbolos !== undefined) {
    const monedas = Array.isArray(m.monedas) ? m.monedas : [];
    if (!esObj(m.simbolos) || !Object.entries(m.simbolos).every(([k, v]) => monedas.includes(k) && esTexto(v))) {
      e.push(`mercado ${cod}: simbolos tiene que ser { MONEDA_DEL_MERCADO: "símbolo" }`);
    }
  }
  const r = m.redondeo;
  if (!esObj(r) || !Number.isInteger(r.decimales) || (r.decimales as number) < 0 || (r.decimales as number) > 6 || !["mitad-arriba", "mitad-par", "truncar"].includes(String(r.modo))) {
    e.push(`mercado ${cod}: redondeo tiene que ser { decimales: 0 a 6, modo: "mitad-arriba" | "mitad-par" | "truncar" }`);
  }
  return e;
}
