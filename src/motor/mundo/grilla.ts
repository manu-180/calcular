import { esMercadoDePrueba } from "../datos";
import { ejecutar, mensajeDeError, valoresIniciales, type Crudos } from "../formulario";
import { mercadoVisible, resolverRequisito, type PaginaResuelta, type Registro } from "../registro";
import { textosMotor, type TextosMotor } from "../textos";
import type { EntradaCalculadora, FechaISO, PaisDefinido, ResultadoBase } from "../tipos";
import { hoyEn } from "../vigencia";
import { ADAPTADORES, esExclusion, type AdaptadorMundo, type ContextoAdaptador, type ValorFijo } from "./adaptadores";
import { BRUTOS_GRILLA } from "./calculo";
import { inferirMundo } from "./inferir";
import type { FuentePpa, GrillaMundo, PaisMundo, PuntoNeto } from "./tipos";

export interface TablaPpa {
  consultadoEl: string;
  fuente: { url: string };
  paises: Readonly<Record<string, { valor: number; anio: number }>>;
}

// Un dato de PPA anterior a 2019, o más de tres años detrás del más reciente de la tabla, no se
// publica: el Banco Mundial extrapola cada año a todo país con inflación medida, y uno que quedó
// atrás es uno donde dejó de hacerlo (hiperinflación, guerra, sin IPC).
export const ANIO_MINIMO_PPA = 2019;
export const ATRASO_MAXIMO_PPA = 3;

export function anioMinimoPpa(ppa: TablaPpa): number {
  const anios = Object.values(ppa.paises).map((p) => p.anio);
  return Math.max(ANIO_MINIMO_PPA, (anios.length ? Math.max(...anios) : ANIO_MINIMO_PPA) - ATRASO_MAXIMO_PPA);
}
export const FUENTE_PPA = { organismo: "Banco Mundial", indicador: "PA.NUS.PRVT.PP", url: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP" } as const;

// El año que la página muestra como «último disponible» es el de la tabla del Banco Mundial, no el de una
// PPA que el sitio lleva al día por su cuenta (Argentina, src/lib/mundo/ar.ts).
export function fuentePpaDe(ppa: TablaPpa): FuentePpa {
  const anios = Object.values(ppa.paises).map((p) => p.anio);
  return { ...FUENTE_PPA, consultadoEl: ppa.consultadoEl, anio: anios.length ? Math.max(...anios) : 0 };
}

export type MetodoMundo = "declarado" | "motor" | "inferido" | "ar";
export type Corrida = { ok: true; neto: number } | { ok: false; motivo: string };

// Un país listo para correr: devuelve el neto anual en moneda local para un bruto anual en moneda local.
export interface CandidatoMundo {
  mercado: string;
  iso: string;
  moneda: string;
  calculadora: string;
  ruta: string;
  sitio: "intl" | "ar";
  datosVerificadosEl: string;
  // Día y zona con que corre la calculadora: la grilla de un país se rehace cuando cambia su día.
  fecha: string;
  zonaHoraria: string;
  metodo: MetodoMundo;
  // Sueldos que paga la ley en el año (aguinaldo, 13.º, 14.º): «por mes» en la página es el del recibo.
  pagas: number;
  nota?: string;
  // PPA propia cuando la del Banco Mundial está congelada (Argentina): reemplaza la de la tabla.
  ppa?: { valor: number; anio: number };
  netoAnual(brutoAnualLocal: number): Corrida;
}

export interface ExclusionMundo {
  mercado: string;
  iso: string;
  calculadora?: string;
  metodo?: MetodoMundo;
  motivo: string;
}

export interface IncluidoMundo {
  pais: PaisMundo;
  metodo: MetodoMundo;
  nota?: string;
  extendidos: number;
  motivoTramoBajo?: string;
  agregados: number;
  recortados: number;
  ms: number;
}

export interface InformeMundo {
  grilla: GrillaMundo;
  incluidos: readonly IncluidoMundo[];
  excluidos: readonly ExclusionMundo[];
  ms: number;
}

const formateadores = new Map<string, Intl.NumberFormat>();
function texto2(valor: number, locale: string): string {
  let f = formateadores.get(locale);
  if (!f) formateadores.set(locale, (f = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })));
  return f.format(valor);
}

function aCrudo(valor: ValorFijo, locale: string): string | boolean {
  return typeof valor === "number" ? texto2(valor, locale) : valor;
}

interface Preparada {
  pagina: PaginaResuelta;
  base: Crudos;
  textos: TextosMotor;
}

function preparar(registro: Registro, pais: PaisDefinido, entrada: EntradaCalculadora, fecha: FechaISO): Preparada | string {
  const pagina = registro.pagina(pais.mercado.codigo, entrada.definicion.slug, fecha, "produccion");
  if (!pagina) {
    const motivos = registro.publicabilidad(pais.mercado.codigo, entrada.definicion.slug, fecha, "produccion").motivos;
    return `${entrada.definicion.id} no es publicable: ${motivos.join("; ") || "sin motivo"}`;
  }
  const bloqueos = pagina.props.avisos.filter((a) => a.nivel === "bloquea");
  if (bloqueos.length) return `${entrada.definicion.id} tiene avisos que bloquean el cálculo: ${bloqueos.map((a) => a.id).join(", ")}`;
  const m = pais.mercado;
  return {
    pagina,
    base: valoresIniciales(entrada.definicion.campos, pagina.props.contexto, pagina.props.opcionesDinamicas),
    textos: textosMotor(m.idioma, m.trato, m.locale),
  };
}

function correrUna(entrada: EntradaCalculadora, p: Preparada, crudos: Crudos): { ok: true; r: ResultadoBase } | { ok: false; motivo: string } {
  const e = ejecutar(entrada.definicion, crudos, p.pagina.props, p.textos);
  if (e.tipo === "ok") return { ok: true, r: e.resultado };
  if (e.tipo === "errores")
    return {
      ok: false,
      motivo: Object.entries(e.errores)
        .map(([campo, err]) => `campo ${campo}: ${mensajeDeError(err, p.textos)}`)
        .join("; "),
    };
  if (e.tipo === "bloqueado") return { ok: false, motivo: `avisos que bloquean: ${e.avisos.map((a) => a.id).join(", ")}` };
  if (e.tipo === "fallo") return { ok: false, motivo: e.mensaje };
  return { ok: false, motivo: "la calculadora no devolvió resultado" };
}

function numeroDe(r: ResultadoBase, clave: string): number {
  const v = r[clave];
  if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`el resultado no trae ${clave} como número`);
  return v;
}

function mensaje(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// Arma el corredor de una calculadora del registro con su adaptador. Toda falla vuelve como motivo:
// la grilla excluye el país con ese texto, nunca en silencio.
function corredor(registro: Registro, pais: PaisDefinido, entrada: EntradaCalculadora, ad: AdaptadorMundo, fecha: FechaISO): { correr: (bruto: number) => Corrida; verificadoEl: string } | string {
  const def = entrada.definicion;
  const campo = def.campos.find((c) => c.id === ad.bruto);
  if (!campo || (campo.tipo !== "moneda" && campo.tipo !== "numero")) return `el campo de bruto «${ad.bruto}» no existe o no es numérico`;
  if (!def.resultado.some((f) => f.clave === ad.neto)) return `el resultado «${ad.neto}» no existe`;
  for (const id of Object.keys(ad.entrada ?? {})) if (!def.campos.some((c) => c.id === id)) return `el campo fijo «${id}» no existe`;
  const p = preparar(registro, pais, entrada, fecha);
  if (typeof p === "string") return p;
  const locale = pais.mercado.locale;

  let impuesto: { entrada: EntradaCalculadora; p: Preparada } | null = null;
  if (ad.impuesto) {
    const otra = pais.calculadoras.find((c) => c.definicion.id === ad.impuesto!.calculadora);
    if (!otra) return `no existe la calculadora de impuesto ${ad.impuesto.calculadora}`;
    const po = preparar(registro, pais, otra, fecha);
    if (typeof po === "string") return po;
    impuesto = { entrada: otra, p: po };
  }

  const fijos: Record<string, string | boolean> = {};
  for (const [k, v] of Object.entries(ad.entrada ?? {})) fijos[k] = aCrudo(v, locale);
  const numero = (id: string): number => {
    const r = resolverRequisito(pais, id, "numero", fecha);
    if (!r.ok) throw new Error(r.motivo);
    return r.valor as number;
  };
  const pagas = ad.pagasAnuales ?? 12;

  const evaluar = (valorCampo: number) => {
    const crudos: Record<string, string | boolean> = { ...p.base, ...fijos, [ad.bruto]: texto2(Math.round(valorCampo * 100) / 100, locale) };
    const ctx: ContextoAdaptador = { valores: p.pagina.props.valores, crudos, numero };
    if (ad.entradaSegun) for (const [k, v] of Object.entries(ad.entradaSegun(valorCampo, ctx))) crudos[k] = aCrudo(v, locale);
    const r = correrUna(entrada, p, crudos);
    if (!r.ok) return r;
    const porPeriodo = (clave: string) => (ad.periodoNeto === "anio" ? numeroDe(r.r, clave) : numeroDe(r.r, clave) * pagas);
    const bruto = ad.brutoAnual ? ad.brutoAnual(r.r, ctx) : ad.brutoResultado ? porPeriodo(ad.brutoResultado) : null;
    const neto = ad.netoAnual ? ad.netoAnual(r.r, ctx) : porPeriodo(ad.neto);
    return { ok: true as const, r: r.r, bruto, neto };
  };

  const aCampo = (bruto: number) => (ad.periodoBruto === "anio" ? bruto : bruto / pagas);
  const necesitaBuscar = !!(ad.brutoAnual || ad.brutoResultado);

  const correr = (brutoAnual: number): Corrida => {
    try {
      let x = aCampo(brutoAnual);
      let e = evaluar(x);
      if (!e.ok) return e;
      // El campo se redondea a centavos, así que el bruto real avanza a saltos: se corta cerca y el neto
      // se corrige en proporción.
      const cerca = (bruto: number) => Math.abs(bruto - brutoAnual) <= Math.max(0.5, brutoAnual * 1e-5);
      if (necesitaBuscar && !cerca(e.bruto!)) {
        // Secante sobre el valor del campo: el bruto real es casi lineal en él (CTC menos aportes del
        // empleador con tope, sueldo más un décimo fijo), así que converge en pocas vueltas.
        let xPrev = x;
        let fPrev = e.bruto! - brutoAnual;
        x = e.bruto! > 0 ? (x * brutoAnual) / e.bruto! : x * 2;
        let vueltas = 0;
        for (;;) {
          e = evaluar(x);
          if (!e.ok) return e;
          const f = e.bruto! - brutoAnual;
          if (cerca(e.bruto!)) break;
          if (++vueltas > 40) return { ok: false, motivo: `no se encontró el valor del campo que da un bruto anual de ${brutoAnual}` };
          const siguiente = f !== fPrev ? x - (f * (x - xPrev)) / (f - fPrev) : x * (brutoAnual / e.bruto!);
          xPrev = x;
          fPrev = f;
          x = siguiente > 0 ? siguiente : x / 2;
        }
      }
      let neto = necesitaBuscar && e.bruto! > 0 ? e.neto * (brutoAnual / e.bruto!) : e.neto;
      if (impuesto) {
        const crudos: Record<string, string | boolean> = { ...impuesto.p.base };
        for (const [k, v] of Object.entries(ad.impuesto!.entrada(e.r, brutoAnual))) crudos[k] = aCrudo(v, locale);
        const ri = correrUna(impuesto.entrada, impuesto.p, crudos);
        if (!ri.ok) return { ok: false, motivo: `${ad.impuesto!.calculadora}: ${ri.motivo}` };
        neto -= numeroDe(ri.r, ad.impuesto!.clave);
      }
      return { ok: true, neto };
    } catch (err) {
      return { ok: false, motivo: mensaje(err) };
    }
  };

  const fechas = [p.pagina.sello.verificadoMasViejo, impuesto?.p.pagina.sello.verificadoMasViejo].filter((f): f is FechaISO => !!f).sort();
  return { correr, verificadoEl: fechas[0] ?? fecha };
}

function adaptadorDe(def: EntradaCalculadora["definicion"], soloInferencia: boolean): { ad: AdaptadorMundo; metodo: MetodoMundo } | { motivo: string; metodo: MetodoMundo } {
  if (soloInferencia) {
    const r = inferirMundo(def);
    return r.ok ? { ad: r.mundo, metodo: "inferido" } : { motivo: `no se pudo inferir: ${r.motivo}`, metodo: "inferido" };
  }
  if (def.mundo) return "excluir" in def.mundo ? { motivo: def.mundo.excluir, metodo: "declarado" } : { ad: def.mundo, metodo: "declarado" };
  const tabla = ADAPTADORES[def.id];
  if (tabla) return esExclusion(tabla) ? { motivo: tabla.excluir, metodo: "motor" } : { ad: tabla, metodo: "motor" };
  const inf = inferirMundo(def);
  return inf.ok ? { ad: inf.mundo, metodo: "inferido" } : { motivo: `no se pudo inferir: ${inf.motivo}`, metodo: "inferido" };
}

// Una sola edición por país: la principal, cuyo código es el ISO del país (ca sí, ca-fr no).
function esEdicionPrincipal(p: PaisDefinido): boolean {
  const codigo = p.mercado.codigo;
  return codigo !== "global" && !esMercadoDePrueba(codigo) && !p.edicionDe && !!p.mercado.pais && codigo === p.mercado.pais.toLowerCase();
}

// soloInferencia ignora `mundo` y la tabla del motor: check_mundo lo usa para medir cuántos países
// entrarían solos, que es lo que le pasa a uno nuevo.
export function candidatosDelRegistro(registro: Registro, ahora: Date = new Date(), opciones: { soloInferencia?: boolean } = {}): { candidatos: CandidatoMundo[]; excluidos: ExclusionMundo[] } {
  const candidatos: CandidatoMundo[] = [];
  const excluidos: ExclusionMundo[] = [];
  for (const pais of registro.paises) {
    // Un país roto (datos mal cargados, una zona horaria inválida, una calculadora que tira) queda
    // afuera con su motivo: nunca rompe la grilla ni la página de los demás.
    try {
      if (!esEdicionPrincipal(pais) || !mercadoVisible(pais, "produccion")) continue;
      const r = candidatoDe(registro, pais, ahora, opciones.soloInferencia === true);
      if (Array.isArray(r)) excluidos.push(...r);
      else candidatos.push(r);
    } catch (err) {
      const codigo = String(pais?.mercado?.codigo ?? "?");
      excluidos.push({ mercado: codigo, iso: String(pais?.mercado?.pais ?? codigo).toUpperCase(), motivo: `el país tiró una excepción: ${mensaje(err)}` });
    }
  }
  return { candidatos, excluidos };
}

function candidatoDe(registro: Registro, pais: PaisDefinido, ahora: Date, soloInferencia: boolean): CandidatoMundo | ExclusionMundo[] {
  const m = pais.mercado;
  const iso = m.pais.toUpperCase();
  const fecha = hoyEn(m, ahora);
  const sueldos = pais.calculadoras.filter((c) => c.definicion.concepto === "sueldo-neto");
  if (!sueldos.length) return [{ mercado: m.codigo, iso, motivo: "no tiene calculadora de sueldo neto" }];
  const motivos: ExclusionMundo[] = [];
  for (const entrada of sueldos) {
    const def = entrada.definicion;
    let metodo: MetodoMundo | undefined;
    try {
      const a = adaptadorDe(def, soloInferencia);
      metodo = a.metodo;
      if ("motivo" in a) {
        motivos.push({ mercado: m.codigo, iso, calculadora: def.id, metodo, motivo: a.motivo });
        continue;
      }
      const pagas = a.ad.pagasAnuales ?? 12;
      if (!(pagas >= 12 && pagas <= 16)) {
        motivos.push({ mercado: m.codigo, iso, calculadora: def.id, metodo, motivo: `pagasAnuales ${pagas} fuera de 12 a 16` });
        continue;
      }
      const c = corredor(registro, pais, entrada, a.ad, fecha);
      if (typeof c === "string") {
        motivos.push({ mercado: m.codigo, iso, calculadora: def.id, metodo, motivo: c });
        continue;
      }
      const nota = "nota" in a.ad && typeof a.ad.nota === "string" ? a.ad.nota : undefined;
      return {
        mercado: m.codigo,
        iso,
        moneda: m.monedas[0],
        calculadora: def.id,
        ruta: `/${m.codigo}/${def.slug}`,
        sitio: "intl",
        datosVerificadosEl: c.verificadoEl,
        fecha,
        zonaHoraria: m.zonaHoraria,
        metodo,
        pagas,
        ...(nota ? { nota } : {}),
        netoAnual: c.correr,
      };
    } catch (err) {
      motivos.push({ mercado: m.codigo, iso, calculadora: def.id, ...(metodo ? { metodo } : {}), motivo: `la calculadora tiró una excepción al prepararla: ${mensaje(err)}` });
    }
  }
  return motivos;
}

// Redondeo de centavos al repartir el bruto en pagas y al pasar a dólares internacionales.
const TOLERANCIA_BRUTO = 1e-6;
// Una caída del neto de hasta 0,1 % al subir el bruto se acepta: son escalones que pone la ley (el
// umbral desde el que se paga el IRP de Paraguay), no errores del adaptador.
const TOLERANCIA_BAJADA = 1e-3;
// Un umbral de la ley que se cobra sobre todo el sueldo apenas se pasa (el subsidio para el empleo de
// México, el IRP de Paraguay, el MPF de Hong Kong) baja el neto de golpe: ganar un poco más deja menos
// en mano. Medido el 2026-10-23: MX -4,6 %, PY -8 %, HK -5 %. La grilla lo guarda como un escalón, dos
// puntos a menos de ESCALON_LEY de distancia (densificar), y entre ellos acepta una caída de hasta
// CAIDA_ESCALON. Una caída así entre puntos alejados sigue siendo un adaptador roto.
export const ESCALON_LEY = 1e-3;
const CAIDA_ESCALON = 0.15;
// Un crédito reembolsable (trattamento integrativo de Italia, CIS de Luxemburgo) puede dejar un neto
// mayor al bruto en sueldos bajos. Hasta este margen la grilla toma carga cero; más arriba es un
// adaptador roto (período mal puesto) y el país queda afuera.
const MARGEN_CREDITO = 0.15;
// Por debajo de este bruto, si la calculadora no acepta el monto (un Minijob en Alemania) o la ley
// tiene ahí un escalón (el límite de empleo marginal de Austria), la grilla extiende en proporción el
// primer punto desde el que todo valida, igual que netoAnualPpa fuera de la grilla. Son sueldos por
// debajo de un empleo de tiempo completo en esos países.
export const TECHO_TRAMO_BAJO = 20000;
const REDONDEO = 1e-4;

// La misma vara para los tres caminos (declarado, tabla del motor, inferido) y para calcular.ar.
export function validarPuntos(puntos: readonly PuntoNeto[]): string | null {
  for (let i = 0; i < puntos.length; i++) {
    const { bruto, neto } = puntos[i];
    if (!Number.isFinite(neto) || neto <= 0) return `en ${bruto} dólares internacionales el neto da ${neto}`;
    if (neto > bruto * (1 + TOLERANCIA_BRUTO)) return `en ${bruto} dólares internacionales el neto (${neto.toFixed(2)}) supera al bruto`;
    if (neto / bruto < 0.25) return `en ${bruto} dólares internacionales el neto es el ${((neto / bruto) * 100).toFixed(1)} % del bruto (mínimo 25 %)`;
    const escalon = i > 0 && bruto / puntos[i - 1].bruto < 1 + ESCALON_LEY;
    if (i > 0 && neto < puntos[i - 1].neto * (1 - (escalon ? CAIDA_ESCALON : TOLERANCIA_BAJADA)))
      return `el neto baja de ${puntos[i - 1].neto.toFixed(2)} a ${neto.toFixed(2)} al pasar de ${puntos[i - 1].bruto} a ${bruto} dólares internacionales`;
  }
  return null;
}

export interface PuntosCorridos {
  ok: true;
  puntos: PuntoNeto[];
  // Puntos del tramo bajo extendidos desde el primero válido, con el motivo del primer rechazo.
  extendidos: number;
  motivoTramoBajo?: string;
  // Puntos propios del país agregados entre dos BRUTOS_GRILLA (densificar).
  agregados: number;
  // Puntos donde un crédito reembolsable dejaba el neto por encima del bruto y se tomó carga cero.
  recortados: number;
}

// Corre la calculadora en un bruto en dólares internacionales y aplica la regla de los créditos.
function correrEn(c: CandidatoMundo, ppa: number, bruto: number) {
  const r = c.netoAnual(bruto * ppa);
  const donde = `en ${bruto} dólares internacionales (${Math.round(bruto * ppa)} ${c.moneda} al año)`;
  if (!r.ok) return { bruto, ok: false as const, motivo: `${donde}: ${r.motivo}` };
  let neto = r.neto / ppa;
  let credito = false;
  if (neto > bruto && neto <= bruto * (1 + MARGEN_CREDITO)) {
    credito = neto > bruto * (1 + REDONDEO);
    neto = bruto;
  }
  return { bruto, ok: true as const, neto: Math.round(neto * 100) / 100, credito };
}

// Entre dos puntos que encierran un escalón de la ley (el subsidio para el empleo de México, el umbral
// del IRP de Paraguay) la interpolación lineal se aparta de la calculadora. Se agrega el medio
// geométrico mientras el error ahí pase este margen; check_mundo mide ese mismo punto medio en cada
// tramo final y falla arriba de 1 %. Un tramo más angosto que ESCALON_LEY ya es un escalón (el salto
// de un umbral) y no se parte más: así un salto cuesta unas 7 corridas y no infinitas.
export const ERROR_INTERPOLACION = 0.004;

function densificar(c: CandidatoMundo, ppa: number, puntos: readonly PuntoNeto[], desde: number): PuntoNeto[] {
  const refinar = (a: PuntoNeto, b: PuntoNeto, nivel: number): PuntoNeto[] => {
    if (nivel >= 12 || b.bruto / a.bruto < 1 + ESCALON_LEY) return [];
    const bruto = Math.round(Math.sqrt(a.bruto * b.bruto));
    if (bruto <= a.bruto || bruto >= b.bruto) return [];
    const r = correrEn(c, ppa, bruto);
    if (!r.ok || !(r.neto > 0)) return [];
    const lineal = a.neto + ((bruto - a.bruto) / (b.bruto - a.bruto)) * (b.neto - a.neto);
    if (Math.abs(lineal - r.neto) / r.neto <= ERROR_INTERPOLACION) return [];
    const p = { bruto, neto: r.neto };
    return [...refinar(a, p, nivel + 1), p, ...refinar(p, b, nivel + 1)];
  };
  const salida: PuntoNeto[] = puntos.slice(0, desde + 1);
  for (let i = desde; i < puntos.length - 1; i++) salida.push(...refinar(puntos[i], puntos[i + 1], 0), puntos[i + 1]);
  return salida;
}

export function puntosDe(c: CandidatoMundo, ppa: number): PuntosCorridos | { ok: false; motivo: string } {
  const corridas = BRUTOS_GRILLA.map((bruto) => correrEn(c, ppa, bruto));
  let primerMotivo: string | null = null;
  for (let k = 0; k < corridas.length && corridas[k].bruto < TECHO_TRAMO_BAJO; k++) {
    const resto = corridas.slice(k);
    const falla = resto.find((x) => !x.ok);
    const puntos = resto.flatMap((x) => (x.ok ? [{ bruto: x.bruto, neto: x.neto }] : []));
    const motivo = falla && !falla.ok ? falla.motivo : validarPuntos(puntos);
    primerMotivo ??= motivo;
    if (motivo) continue;
    const proporcion = puntos[0].neto / puntos[0].bruto;
    const extendidos = BRUTOS_GRILLA.slice(0, k).map((b) => ({ bruto: b, neto: Math.round(b * proporcion * 100) / 100 }));
    const recortados = resto.filter((x) => x.ok && x.credito).length;
    const base = [...extendidos, ...puntos];
    // Si lo agregado no valida (un punto nuevo que baja más de lo tolerado), la grilla queda como estaba.
    const densa = densificar(c, ppa, base, k);
    const final = densa.length > base.length && !validarPuntos(densa) ? densa : base;
    return { ok: true, puntos: final, extendidos: k, agregados: final.length - base.length, recortados, ...(k && primerMotivo ? { motivoTramoBajo: primerMotivo } : {}) };
  }
  return { ok: false, motivo: primerMotivo ?? "ningún bruto de la grilla dio resultado" };
}

export type CachePuntos = Map<string, ReturnType<typeof puntosDe>>;

export function construirGrillaMundo(entrada: {
  candidatos: readonly CandidatoMundo[];
  excluidos?: readonly ExclusionMundo[];
  ppa: TablaPpa;
  generadoEl: string;
  // Puntos ya corridos por país, día y PPA: al cambiar el día en una zona solo se rehacen esos países.
  previos?: CachePuntos;
  nuevos?: CachePuntos;
}): InformeMundo {
  const inicio = Date.now();
  const paises: PaisMundo[] = [];
  const incluidos: IncluidoMundo[] = [];
  const excluidos: ExclusionMundo[] = [...(entrada.excluidos ?? [])];
  const minimo = anioMinimoPpa(entrada.ppa);
  for (const c of entrada.candidatos) {
    const t0 = Date.now();
    const base = { mercado: c.mercado, iso: c.iso, calculadora: c.calculadora, metodo: c.metodo };
    const dato = c.ppa ?? entrada.ppa.paises[c.iso];
    if (!dato || !(dato.valor > 0)) {
      excluidos.push({ ...base, motivo: "el Banco Mundial no tiene PPA de consumo privado para el país" });
      continue;
    }
    if (dato.anio < minimo) {
      excluidos.push({ ...base, motivo: `la última PPA del Banco Mundial es de ${dato.anio} (se exige ${minimo} o posterior)` });
      continue;
    }
    const clave = `${c.mercado}|${c.calculadora}|${c.fecha}|${dato.valor}`;
    let r = entrada.previos?.get(clave);
    if (!r) {
      try {
        r = puntosDe(c, dato.valor);
      } catch (err) {
        excluidos.push({ ...base, motivo: `la calculadora tiró una excepción: ${mensaje(err)}` });
        continue;
      }
    }
    entrada.nuevos?.set(clave, r);
    if (!r.ok) {
      excluidos.push({ ...base, motivo: r.motivo });
      continue;
    }
    const pais: PaisMundo = {
      mercado: c.mercado,
      iso: c.iso,
      moneda: c.moneda,
      ppa: dato.valor,
      anioPpa: dato.anio,
      pagas: c.pagas,
      calculadora: c.calculadora,
      ruta: c.ruta,
      sitio: c.sitio,
      puntos: r.puntos,
      datosVerificadosEl: c.datosVerificadosEl,
    };
    paises.push(pais);
    incluidos.push({
      pais,
      metodo: c.metodo,
      ...(c.nota ? { nota: c.nota } : {}),
      extendidos: r.extendidos,
      ...(r.motivoTramoBajo ? { motivoTramoBajo: r.motivoTramoBajo } : {}),
      agregados: r.agregados,
      recortados: r.recortados,
      ms: Date.now() - t0,
    });
  }
  paises.sort((a, b) => a.iso.localeCompare(b.iso));
  incluidos.sort((a, b) => a.pais.iso.localeCompare(b.pais.iso));
  excluidos.sort((a, b) => a.iso.localeCompare(b.iso));
  return {
    grilla: {
      version: 1,
      generadoEl: entrada.generadoEl,
      fuentePpa: fuentePpaDe(entrada.ppa),
      paises,
    },
    incluidos,
    excluidos,
    ms: Date.now() - inicio,
  };
}

const relojes = new Map<string, Intl.DateTimeFormat>();

// Milisegundos hasta la próxima medianoche en alguna de las zonas. Un día de cambio de horario dura
// 23 o 25 horas: la grilla se rehace una hora antes o después de más, sin efecto en los datos.
export function msHastaCambioDeDia(zonas: Iterable<string>, ahora: Date = new Date()): number {
  let minimo = Infinity;
  for (const zona of zonas) {
    let reloj = relojes.get(zona);
    if (!reloj) relojes.set(zona, (reloj = new Intl.DateTimeFormat("en-US", { timeZone: zona, hourCycle: "h23", hour: "2-digit", minute: "2-digit", second: "2-digit" })));
    const partes = Object.fromEntries(reloj.formatToParts(ahora).map((p) => [p.type, p.value]));
    const transcurrido = ((Number(partes.hour) * 60 + Number(partes.minute)) * 60 + Number(partes.second)) * 1000 + ahora.getMilliseconds();
    minimo = Math.min(minimo, 86_400_000 - transcurrido);
  }
  return minimo;
}
