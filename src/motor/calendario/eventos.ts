import { formatearValorUnidad } from "../formato";
import type { ValorFeed } from "../novedades";
import type { ModoPublicacion, Registro } from "../registro";
import {
  UNIDADES_REFERENCIA,
  type CodigoMercado,
  type Dato,
  type DefinicionCalculadora,
  type EntradaCalculadora,
  type FechaCalendario,
  type FechaISO,
  type Fuente,
  type Mercado,
  type PaisDefinido,
  type TramoVerificado,
  type ValorDato,
} from "../tipos";
import { esFechaISO, sumarDias, vigente } from "../vigencia";

// El calendario de una edición se arma solo con lo que el registro ya tiene verificado: tramos de
// datos.json que empiezan a regir, puntos de series de unidades de referencia (UTM, UR), novedades
// del país con vigenteDesde y las fechas fijas que un dato declara en `calendario` (pago del
// aguinaldo). Nada de fechas tipeadas acá: dato YMYL. Los avisos no entran: su `desde` es desde
// cuándo se muestran, no la fecha de la norma.

export const TIPOS_EVENTO = ["pago", "salario-minimo", "impuestos", "aportes", "laboral", "indices"] as const;
export type TipoEvento = (typeof TIPOS_EVENTO)[number];

export const DIAS_ATRAS = 61;
export const DIAS_ADELANTE = 365;

export interface FuenteEvento {
  organismo: string;
  titulo: string;
  url: `https://${string}`;
  verificadoEl: FechaISO;
}

export interface EventoCalendario {
  id: string;
  fecha: FechaISO;
  tipo: TipoEvento;
  origen: "dato" | "serie" | "novedad" | "fecha";
  titulo: string;
  texto?: string;
  valor?: ValorFeed;
  anterior?: ValorFeed;
  // Nombres de las zonas cuando el cambio es solo en algunas (hasta 3; si son más, va el rango).
  zonas?: readonly string[];
  // La fecha es un plazo («hasta el 20 de diciembre»), no el día exacto.
  limite?: boolean;
  fuente: FuenteEvento;
  // Slugs de las calculadoras publicadas de la edición, la principal primero.
  calculadoras: readonly string[];
}

export interface Excluido {
  id: string;
  motivo: string;
}

export type Calendario =
  | { ok: true; codigo: CodigoMercado; fecha: FechaISO; desde: FechaISO; hasta: FechaISO; eventos: EventoCalendario[]; excluidos: Excluido[]; faltan: string[] }
  | { ok: false; codigo: CodigoMercado; fecha: FechaISO; motivo: string };

type Fmt = Pick<Mercado, "locale" | "simbolos">;

function numero(n: number, unidad: string, m: Fmt): ValorFeed {
  return { tipo: "numero", texto: formatearValorUnidad(n, unidad, m.locale, m.simbolos) };
}

function valorDe(valor: ValorDato, unidad: string, m: Fmt): ValorFeed {
  if (typeof valor === "number") return numero(valor, unidad, m);
  if (Array.isArray(valor)) return { tipo: "tabla", filas: valor.length };
  const valores = Object.values(valor as Record<string, number>);
  return valores.length === 1 ? numero(valores[0], unidad, m) : { tipo: "valores", cantidad: valores.length };
}

function valorDeGrupo(valores: readonly ValorDato[], unidad: string, m: Fmt): ValorFeed {
  if (valores.length === 1) return valorDe(valores[0], unidad, m);
  const nums = valores.filter((v): v is number => typeof v === "number");
  if (nums.length !== valores.length) return valorDe(valores[0], unidad, m);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (min === max) return numero(min, unidad, m);
  return { tipo: "rango", min: formatearValorUnidad(min, unidad, m.locale, m.simbolos), max: formatearValorUnidad(max, unidad, m.locale, m.simbolos), zonas: valores.length };
}

const esUtilizable = (t: { estado: string; fuente?: Fuente }): t is TramoVerificado =>
  t.estado === "verificado" && t.fuente?.tipo === "primaria" && typeof t.fuente.url === "string" && t.fuente.url.startsWith("https://");

const fuenteDe = (f: Fuente): FuenteEvento => ({ organismo: f.organismo, titulo: f.titulo, url: f.url as `https://${string}`, verificadoEl: f.verificadoEl });

const igual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

// Tema del evento según las calculadoras que lo usan: lo que más le importa a quien cobra un sueldo
// gana (si el dato lo usa la calculadora del salario mínimo, es «salario mínimo» aunque también lo use
// la de horas extra).
const IMPUESTOS = new Set(["impuesto-renta", "retencion-honorarios", "regimen-simplificado", "iva"]);
const APORTES = new Set(["aportes-seguridad-social", "costo-empleador", "jubilacion"]);
const INDICES = new Set(["conversor-unidad", "inflacion", "tipo-de-cambio", "plazo-fijo"]);

function tipoDe(conceptos: ReadonlySet<string>, dato?: Pick<Dato, "tipo">): TipoEvento {
  const hay = (s: ReadonlySet<string>) => [...conceptos].some((c) => s.has(c));
  if (conceptos.has("salario-minimo")) return "salario-minimo";
  if (hay(IMPUESTOS)) return "impuestos";
  if (hay(APORTES)) return "aportes";
  if (conceptos.has("sueldo-neto")) return dato?.tipo === "escala" ? "impuestos" : "aportes";
  if (hay(INDICES)) return "indices";
  return "laboral";
}

// La calculadora principal de cada evento: la que más le sirve a un asalariado.
const PREFERENCIA = ["salario-minimo", "sueldo-neto", "bono-semestral", "decimo-cuarto", "impuesto-renta", "aportes-seguridad-social", "jubilacion", "costo-empleador"];
const rango = (d: DefinicionCalculadora) => {
  const i = PREFERENCIA.indexOf(d.concepto);
  return i === -1 ? PREFERENCIA.length : i;
};

function ordenar(lista: readonly EntradaCalculadora[]): EntradaCalculadora[] {
  return lista.map((c, i) => ({ c, i })).sort((a, b) => rango(a.c.definicion) - rango(b.c.definicion) || a.i - b.i).map((x) => x.c);
}

const RE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validarFechaCalendario(dato: Pick<Dato, "id" | "regiones">, f: FechaCalendario): string[] {
  const e: string[] = [];
  const donde = `${dato.id}.calendario.${String(f?.id)}`;
  if (!f || typeof f !== "object") return [`${dato.id}.calendario: una entrada no es un objeto`];
  if (typeof f.id !== "string" || !RE_ID.test(f.id)) e.push(`${donde}: id tiene que ser kebab-case`);
  if (f.tipo !== "pago" && f.tipo !== "vencimiento") e.push(`${donde}: tipo tiene que ser "pago" o "vencimiento"`);
  if (!Number.isInteger(f.mes) || f.mes < 1 || f.mes > 12) e.push(`${donde}: mes tiene que ser un entero de 1 a 12`);
  else if (!Number.isInteger(f.dia) || f.dia < 1 || f.dia > new Date(Date.UTC(2027, f.mes, 0)).getUTCDate()) e.push(`${donde}: día ${String(f.dia)} no existe en el mes ${f.mes} de un año no bisiesto`);
  if (typeof f.titulo !== "string" || !f.titulo.trim()) e.push(`${donde}: falta el título`);
  if (f.region !== undefined && !(dato.regiones ?? []).includes(f.region)) e.push(`${donde}: la región ${f.region} no es del dato`);
  if (dato.regiones?.length && f.region === undefined) e.push(`${donde}: el dato es por región; la fecha tiene que decir a qué región aplica`);
  return e;
}

function idiomaBase(registro: Registro, pais: PaisDefinido) {
  return pais.edicionDe ? registro.pais(pais.edicionDe)?.mercado.idioma : pais.mercado.idioma;
}

export function calendarioDe(registro: Registro, codigo: CodigoMercado, fecha: FechaISO, modo: ModoPublicacion = "produccion"): Calendario {
  try {
    return armar(registro, codigo, fecha, modo);
  } catch (err) {
    // Un país roto se queda sin calendario; nunca tumba la página, el sitemap ni el build.
    console.error(`[calendario] ${codigo}`, err);
    return { ok: false, codigo, fecha, motivo: `error al armar el calendario: ${err instanceof Error ? err.message : String(err)}` };
  }
}

function armar(registro: Registro, codigo: CodigoMercado, fecha: FechaISO, modo: ModoPublicacion): Calendario {
  const pais = registro.pais(codigo);
  if (!pais) return { ok: false, codigo, fecha, motivo: "no existe en el registro" };
  if (codigo === "global") return { ok: false, codigo, fecha, motivo: "global no es un país" };
  if (pais.errores.length) return { ok: false, codigo, fecha, motivo: `el país tiene ${pais.errores.length} errores de datos` };
  if (!esFechaISO(fecha)) return { ok: false, codigo, fecha, motivo: `fecha inválida ${String(fecha)}` };
  const m = pais.mercado;
  const desde = sumarDias(fecha, -DIAS_ATRAS);
  const hasta = sumarDias(fecha, DIAS_ADELANTE);
  const enVentana = (f: FechaISO) => f >= desde && f <= hasta;
  const publicadas = registro.calculadorasPublicables(codigo, fecha, modo);
  const queUsan = (id: string) => ordenar(publicadas.filter((c) => Object.prototype.hasOwnProperty.call(c.definicion.requiere, id)));
  const conceptos = (lista: readonly EntradaCalculadora[]) => new Set(lista.map((c) => c.definicion.concepto as string));
  const base = pais.edicionDe ? registro.pais(pais.edicionDe) : undefined;
  const sinTraducir = (dato: Dato) => Boolean(base && base.mercado.idioma !== m.idioma && base.datos.find((d) => d.id === dato.id)?.nombre === dato.nombre);
  const nombreRegion = (id: string) => m.regiones?.find((r) => r.id === id)?.nombre ?? id;
  const eventos: EventoCalendario[] = [];
  const excluidos: Excluido[] = [];
  const datoDelEvento = new Map<EventoCalendario, string>();
  const tomados = new Set<EventoCalendario>();

  for (const dato of pais.datos) {
    const porRegion = new Map<string, TramoVerificado[]>();
    for (const t of dato.tramos) {
      if (!esUtilizable(t)) continue;
      const k = t.region ?? "";
      porRegion.set(k, [...(porRegion.get(k) ?? []), t]);
    }
    const porFecha = new Map<FechaISO, { t: TramoVerificado; previo?: TramoVerificado }[]>();
    for (const tramos of porRegion.values()) {
      tramos.sort((a, b) => a.desde.localeCompare(b.desde));
      tramos.forEach((t, i) => {
        if (!enVentana(t.desde)) return;
        const previo = i > 0 ? tramos[i - 1] : undefined;
        if (previo && igual(previo.valor, t.valor)) return;
        // Sin tramo anterior, el desde puede ser el día en que se cargó el dato y no el de la norma:
        // solo cuenta si se cargó antes de que empiece a regir.
        if (!previo && t.desde <= t.fuente.verificadoEl) return;
        porFecha.set(t.desde, [...(porFecha.get(t.desde) ?? []), { t, ...(previo ? { previo } : {}) }]);
      });
    }
    for (const [dia, grupo] of porFecha) {
      const id = `dato-${dato.id}-${dia}`;
      if (sinTraducir(dato)) {
        excluidos.push({ id, motivo: `${dato.id}: el nombre no está traducido al ${m.idioma} en la edición` });
        continue;
      }
      const calcs = queUsan(dato.id);
      if (!calcs.length) {
        excluidos.push({ id, motivo: `ninguna calculadora publicada usa ${dato.id}` });
        continue;
      }
      const previos = grupo.flatMap((g) => (g.previo ? [g.previo.valor] : []));
      const regiones = grupo.map((g) => g.t.region).filter((r): r is string => Boolean(r));
      const todas = dato.regiones?.length ?? 0;
      const evento: EventoCalendario = {
        id,
        fecha: dia,
        tipo: tipoDe(conceptos(calcs), dato),
        origen: "dato",
        titulo: dato.nombre,
        valor: valorDeGrupo(grupo.map((g) => g.t.valor), dato.unidad, m),
        ...(previos.length === grupo.length ? { anterior: valorDeGrupo(previos, dato.unidad, m) } : {}),
        ...(regiones.length && regiones.length < todas && regiones.length <= 3 ? { zonas: regiones.map(nombreRegion) } : {}),
        fuente: fuenteDe(grupo[0].t.fuente),
        calculadoras: calcs.map((c) => c.definicion.slug),
      };
      eventos.push(evento);
      datoDelEvento.set(evento, dato.id);
    }

    for (const f of dato.calendario ?? []) {
      const errores = validarFechaCalendario(dato, f);
      const raiz = `fecha-${dato.id}-${String(f?.id)}`;
      if (errores.length) {
        excluidos.push({ id: raiz, motivo: errores.join("; ") });
        continue;
      }
      let titulo = f.titulo;
      let texto = f.texto;
      if (m.idioma !== idiomaBase(registro, pais)) {
        const tr = f.traducciones?.[m.idioma];
        if (!tr?.titulo?.trim()) {
          excluidos.push({ id: raiz, motivo: `sin traducción al ${m.idioma} en ${dato.id}.calendario.${f.id}.traducciones` });
          continue;
        }
        titulo = tr.titulo;
        texto = tr.texto;
      }
      const elegida = f.calculadora ? publicadas.find((c) => c.definicion.id === f.calculadora) : undefined;
      const calcs = elegida ? [elegida, ...queUsan(dato.id).filter((c) => c !== elegida)] : queUsan(dato.id);
      if (!calcs.length) {
        excluidos.push({ id: raiz, motivo: `ninguna calculadora publicada usa ${dato.id}${f.calculadora ? ` y ${f.calculadora} no está publicada` : ""}` });
        continue;
      }
      for (let anio = Number(desde.slice(0, 4)); anio <= Number(hasta.slice(0, 4)); anio++) {
        const dia = `${anio}-${String(f.mes).padStart(2, "0")}-${String(f.dia).padStart(2, "0")}` as FechaISO;
        if (!enVentana(dia)) continue;
        const id = `${raiz}-${anio}`;
        const t = vigente(dato, dia, f.region);
        if (!t) {
          excluidos.push({ id, motivo: `${dato.id} no tiene tramo verificado al ${dia}` });
          continue;
        }
        eventos.push({
          id,
          fecha: dia,
          tipo: f.tipo === "pago" ? "pago" : tipoDe(conceptos(calcs), dato),
          origen: "fecha",
          titulo,
          ...(texto ? { texto } : {}),
          limite: true,
          ...(f.region ? { zonas: [nombreRegion(f.region)] } : {}),
          fuente: fuenteDe(t.fuente),
          calculadoras: calcs.map((c) => c.definicion.slug),
        });
      }
    }
  }

  // Solo series de unidades de referencia (UTM, UR): su punto es el valor que rige desde esa fecha.
  // El punto de un índice (IPC) es el mes medido, no el día en que se publica: no es una fecha.
  for (const serie of pais.series) {
    const unidad = serie.id.slice(serie.id.indexOf(".") + 1).toUpperCase();
    if (serie.frecuencia === "diaria" || serie.frecuencia === "semanal") continue;
    if (!(UNIDADES_REFERENCIA as readonly string[]).includes(unidad)) continue;
    if (!serie.fuente.url.startsWith("https://")) continue;
    if (base && base.mercado.idioma !== m.idioma && base.series.find((x) => x.id === serie.id)?.nombre === serie.nombre) {
      excluidos.push({ id: `serie-${serie.id}`, motivo: `${serie.id}: el nombre no está traducido al ${m.idioma} en la edición` });
      continue;
    }
    const calcs = queUsan(serie.id);
    serie.puntos.forEach(([dia, v], i) => {
      if (!enVentana(dia)) return;
      const id = `serie-${serie.id}-${dia}`;
      if (!calcs.length) return void excluidos.push({ id, motivo: `ninguna calculadora publicada usa ${serie.id}` });
      const previo = serie.puntos[i - 1];
      eventos.push({
        id,
        fecha: dia,
        tipo: "indices",
        origen: "serie",
        titulo: serie.nombre,
        valor: numero(v, serie.unidad, m),
        ...(previo ? { anterior: numero(previo[1], serie.unidad, m) } : {}),
        fuente: fuenteDe(serie.fuente),
        calculadoras: calcs.map((c) => c.definicion.slug),
      });
    });
  }

  for (const n of pais.novedades) {
    const dia = n.vigenteDesde;
    if (!dia || !enVentana(dia) || n.fecha > fecha) continue;
    const id = `nota-${n.id}`;
    if (n.fuente.tipo !== "primaria" || !n.fuente.url.startsWith("https://")) {
      excluidos.push({ id, motivo: "la fuente de la novedad no es primaria con https" });
      continue;
    }
    const calcs = ordenar(publicadas.filter((c) => n.calculadoras.includes(c.definicion.id)));
    // La nota y el tramo que anuncia son el mismo cambio: el evento queda uno, con el título humano de
    // la nota y el valor del tramo. Solo si no hay duda: el dato lo pide la calculadora de la nota (la
    // primera que nombra, la del tema), ese día cambia un único dato de los que pide y ninguna otra nota
    // se lo llevó. Con dos candidatos la nota va aparte: Suiza 2027-01-01 cambia el tarifario federal
    // y el tope del pilar 3a, y la nota del tarifario le ponía «Bundessteuer 2027» al tope del 3a.
    const propia = publicadas.find((c) => c.definicion.id === n.calculadoras[0]);
    const candidatos = propia
      ? eventos.filter((e) => {
          const id = datoDelEvento.get(e);
          return e.origen === "dato" && e.fecha === dia && id !== undefined && Object.prototype.hasOwnProperty.call(propia.definicion.requiere, id);
        })
      : [];
    if (candidatos.length === 1 && !tomados.has(candidatos[0])) {
      tomados.add(candidatos[0]);
      candidatos[0].titulo = n.titulo;
      candidatos[0].texto = n.texto;
      continue;
    }
    if (!calcs.length) {
      excluidos.push({ id, motivo: "ninguna de sus calculadoras está publicada en la edición" });
      continue;
    }
    eventos.push({
      id,
      fecha: dia,
      // La primera calculadora que nombra la nota es la del tema; las demás son las que también toca.
      tipo: tipoDe(conceptos(publicadas.filter((c) => c.definicion.id === n.calculadoras[0]))),
      origen: "novedad",
      titulo: n.titulo,
      texto: n.texto,
      fuente: fuenteDe(n.fuente),
      calculadoras: calcs.map((c) => c.definicion.slug),
    });
  }

  eventos.sort((a, b) => a.fecha.localeCompare(b.fecha) || TIPOS_EVENTO.indexOf(a.tipo) - TIPOS_EVENTO.indexOf(b.tipo) || a.id.localeCompare(b.id));

  // Lo que falta cargar: una calculadora de bono (aguinaldo, décimo, gratificación) publicada sin la
  // fecha de pago declarada en ninguno de sus datos.
  const faltan: string[] = [];
  for (const c of publicadas) {
    if (!["bono-semestral", "decimo-cuarto", "reparto-utilidades"].includes(c.definicion.concepto)) continue;
    const conFecha = Object.keys(c.definicion.requiere).some((id) => pais.datos.find((d) => d.id === id)?.calendario?.some((f) => f.tipo === "pago"));
    if (!conFecha) faltan.push(`fecha de pago de ${c.definicion.id} (${c.definicion.concepto})`);
  }
  return { ok: true, codigo, fecha, desde, hasta, eventos, excluidos, faltan };
}

// Una edición tiene página si hay al menos una fecha por delante: un calendario con solo pasado no le
// sirve a nadie.
export function esPublicable(c: Calendario): c is Extract<Calendario, { ok: true }> {
  return c.ok && c.eventos.some((e) => e.fecha >= c.fecha);
}
