import "server-only";
// Punto de entrada del índice «¿Cuántas horas de trabajo cuesta?» para páginas y checks. Conecta el
// registro de países, Argentina (src/data) y precios.json con el motor puro (src/motor/horas). Nunca tira:
// un país roto queda excluido con su motivo y la página de los demás sigue.
import { horasDe, porHoraDe, precioVigente, VIGENCIA_PRECIO_DIAS } from "@/motor/horas/calculo";
import { MINIMOS, type DeclaracionMinimo, type JornadaDeclarada, type RefDato } from "@/motor/horas/minimos";
import { PRODUCTOS } from "@/motor/horas/productos";
import type { ArchivoPrecios, CambioUsado, CeldaHoras, ConversionHora, ExclusionHoras, FilaHoras, FuenteHoras, IndiceHoras, InformeHoras, MinimoHora } from "@/motor/horas/tipos";
import { msHastaCambioDeDia, type TablaPpa } from "@/motor/mundo/grilla";
import tablaPpa from "@/motor/mundo/ppa.json";
import { esMercadoDePrueba } from "@/motor/datos";
import { datoDe, mercadoVisible, resolverRequisito, type DatoUsado } from "@/motor/registro";
import type { FechaISO, PaisDefinido, PuntoSerie, Requisito } from "@/motor/tipos";
import { hoyEn, hoyMasAdelantado } from "@/motor/vigencia";
import { hoyAR } from "@/lib/hoy";
import { ppaArgentina } from "@/lib/mundo/ar";
import { registro } from "@/paises";
import { minimoAr } from "./ar";
import precios from "./precios.json";

const PRECIOS = precios as ArchivoPrecios;
const PPA = tablaPpa as TablaPpa;
const ZONA_AR = "America/Argentina/Buenos_Aires";

const mensaje = (e: unknown) => (e instanceof Error ? e.message : String(e));

function fuenteDe(u: DatoUsado): FuenteHoras {
  return { organismo: u.fuente.organismo, titulo: u.fuente.titulo, url: u.fuente.url, verificadoEl: u.fuente.verificadoEl };
}

// El requisito con que se pide un dato sale del dato mismo: tipo y si tiene regiones.
function requisitoDe(pais: PaisDefinido, id: string): { ok: true; req: Requisito } | { ok: false; motivo: string } {
  const d = datoDe(pais, id);
  if (!d) return { ok: false, motivo: `${id}: no existe en datos.json` };
  if (d.tipo !== "numero" && d.tipo !== "mapa") return { ok: false, motivo: `${id}: es de tipo ${d.tipo}, se espera un número o un mapa` };
  return { ok: true, req: (d.regiones ? `${d.tipo}-por-region` : d.tipo) as Requisito };
}

type Leido = { ok: true; valor: number; usado: DatoUsado; nombre: string } | { ok: false; motivo: string };

function leerDato(pais: PaisDefinido, ref: RefDato, fecha: FechaISO): Leido {
  const q = requisitoDe(pais, ref.dato);
  if (!q.ok) return q;
  const req = q.req;
  const r = resolverRequisito(pais, ref.dato, req, fecha);
  if (!r.ok) return { ok: false, motivo: r.motivo };
  let v: unknown = r.valor;
  if (req.endsWith("-por-region")) {
    if (!ref.region) return { ok: false, motivo: `${ref.dato}: el dato es por región y falta la región` };
    v = (v as Record<string, unknown>)[ref.region];
  }
  if (req.startsWith("mapa")) {
    if (!ref.clave) return { ok: false, motivo: `${ref.dato}: el dato es un mapa y falta la categoría` };
    v = (v as Record<string, unknown> | undefined)?.[ref.clave];
  }
  if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) return { ok: false, motivo: `${ref.dato}: sin valor positivo para ${[ref.region, ref.clave].filter(Boolean).join(" / ") || "el país"}` };
  const usado = r.usados.find((u) => !ref.region || !u.region || u.region === ref.region) ?? r.usados[0];
  const d = datoDe(pais, ref.dato)!;
  const etiqueta = ref.clave ? (d.etiquetas?.[ref.clave] ?? ref.clave) : "";
  return { ok: true, valor: v, usado, nombre: etiqueta ? `${d.nombre}: ${etiqueta}` : d.nombre };
}

const primero = (...fechas: (string | undefined)[]) => fechas.filter((f): f is string => Boolean(f)).sort()[0];

function leerJornada(pais: PaisDefinido, j: JornadaDeclarada, fecha: FechaISO): { ok: true; horas: number; fuente: FuenteHoras; hasta?: string } | { ok: false; motivo: string } {
  if ("horas" in j) {
    if (j.desde && fecha < j.desde) return { ok: false, motivo: `la jornada declarada rige desde ${j.desde}` };
    if (j.hasta && fecha > j.hasta) return { ok: false, motivo: `la jornada declarada (${j.horas} horas) venció el ${j.hasta}: hay que cargar la nueva con su fuente en src/motor/horas/minimos.ts` };
    return { ok: true, horas: j.horas, fuente: j.fuente, ...(j.hasta ? { hasta: j.hasta } : {}) };
  }
  const d = leerDato(pais, j, fecha);
  if (!d.ok) return { ok: false, motivo: `jornada: ${d.motivo}` };
  if (datoDe(pais, j.dato)?.unidad !== "horas") return { ok: false, motivo: `${j.dato}: la jornada no está en horas` };
  return { ok: true, horas: d.valor, fuente: fuenteDe(d.usado), ...(d.usado.hasta ? { hasta: d.usado.hasta } : {}) };
}

// Un país sin declaración entra si su calculadora de salario mínimo publicada pide un valor por hora en su
// moneda (el nombre o el id lo dicen). Si no, se lo excluye con lo que falta para sumarlo.
const POR_HORA = /hora|hour|horaire|stunde|uurloon|per-hour|hourly|時給|시급|时薪|時薪/i;

function inferir(pais: PaisDefinido, fecha: FechaISO): DeclaracionMinimo {
  const moneda = pais.mercado.monedas[0];
  const calcs = pais.calculadoras.filter((c) => c.definicion.concepto === "salario-minimo" && c.definicion.estado === "publicado");
  if (!calcs.length) return { excluir: "no tiene calculadora de salario mínimo publicada" };
  for (const c of calcs) {
    for (const [id, req] of Object.entries(c.definicion.requiere)) {
      if (req !== "numero") continue;
      const d = datoDe(pais, id);
      if (d && d.unidad === moneda && (POR_HORA.test(id) || POR_HORA.test(d.nombre)) && resolverRequisito(pais, id, "numero", fecha).ok) return { minimo: { dato: id }, periodo: "hora" };
    }
  }
  return { excluir: "su salario mínimo no es por hora y falta declarar la jornada legal con su fuente en src/motor/horas/minimos.ts" };
}

function minimoDe(pais: PaisDefinido, fecha: FechaISO): MinimoHora | string {
  const m = pais.mercado;
  const decl = MINIMOS[m.codigo] ?? inferir(pais, fecha);
  if ("excluir" in decl) return decl.excluir;
  const base = leerDato(pais, decl.minimo, fecha);
  if (!base.ok) return base.motivo;
  const conv: ConversionHora = { tipo: decl.periodo, monto: base.valor };
  let jornada: FuenteHoras | undefined;
  let hasta: string | undefined = base.usado.hasta;
  if (decl.divisor) {
    const d = leerDato(pais, decl.divisor, fecha);
    if (!d.ok) return `divisor: ${d.motivo}`;
    conv.tipo = "divisor";
    conv.divisor = d.valor;
    jornada = fuenteDe(d.usado);
    hasta = primero(hasta, d.usado.hasta);
  } else if (decl.periodo !== "hora") {
    if (!decl.jornada) return "falta la jornada legal para pasar el mínimo a horas";
    const j = leerJornada(pais, decl.jornada, fecha);
    if (!j.ok) return j.motivo;
    if (decl.jornada.porDia) conv.horasDia = j.horas;
    else conv.horasSemana = j.horas;
    jornada = j.fuente;
    hasta = primero(hasta, j.hasta);
    if (decl.periodo === "dia" && decl.diasPagados) {
      if (decl.jornada.porDia) return "un diario con días pagados necesita la jornada semanal";
      conv.diasPagados = decl.diasPagados.dias;
    }
    if (decl.periodo === "dia" && !decl.diasPagados && !decl.jornada.porDia) return "un mínimo diario sin días pagados necesita la jornada diaria";
    if (decl.pagas) conv.pagas = decl.pagas.pagas;
  }
  const porHora = porHoraDe(conv);
  if (!Number.isFinite(porHora) || porHora <= 0) return "el salario por hora no dio un número positivo";
  return {
    iso: m.pais.toUpperCase(),
    mercado: m.codigo,
    moneda: m.monedas[0],
    porHora,
    conversion: conv,
    nombre: base.nombre,
    fuente: fuenteDe(base.usado),
    ...(jornada ? { jornada } : {}),
    ...(hasta ? { vigenteHasta: hasta } : {}),
  };
}

// Tipo de cambio oficial del registro para un precio en dólares: una serie en moneda local cuyo id o nombre
// dice dólar (la de venta si hay compra y venta). La resolución del registro ya exige que esté al día.
function cambioDe(pais: PaisDefinido, monedaPrecio: string, fecha: FechaISO): CambioUsado | string {
  if (monedaPrecio !== "USD") return `la tienda cobra en ${monedaPrecio} y no hay tipo de cambio oficial para esa moneda en el registro`;
  const local = pais.mercado.monedas[0];
  const candidatas = pais.series.filter((s) => s.unidad === local && /usd|d[oó]lar|tipo-cambio|tipo de cambio/i.test(`${s.id} ${s.nombre}`) && !/eur/i.test(s.id));
  candidatas.sort((a, b) => Number(/venta/i.test(b.id)) - Number(/venta/i.test(a.id)));
  for (const s of candidatas) {
    const r = resolverRequisito(pais, s.id, "serie", fecha);
    const punto = r.ok ? (r.valor as PuntoSerie) : null;
    if (r.ok && punto && punto.valor > 0) return { valor: punto.valor, fecha: punto.fecha, fuente: fuenteDe(r.usados[0]) };
  }
  return candidatas.length ? "el tipo de cambio oficial del registro no está al día" : "la tienda cobra en dólares y el registro no tiene tipo de cambio oficial del país";
}

function ppaDe(iso: string): number | null {
  if (iso === "AR") {
    const p = ppaArgentina(registro, PPA);
    return typeof p === "string" ? null : p.valor;
  }
  return PPA.paises[iso]?.valor ?? null;
}

function celdasDe(minimo: MinimoHora, pais: PaisDefinido | null, fecha: FechaISO, hoyPrecios: string, excluidos: ExclusionHoras[]): Record<string, CeldaHoras> {
  const celdas: Record<string, CeldaHoras> = {};
  const { iso, mercado } = minimo;
  const propios = PRECIOS.precios[iso] ?? {};
  for (const p of PRODUCTOS) {
    const sinDato = (motivo: string) => excluidos.push({ iso, mercado, producto: p.id, motivo });
    try {
      const precio = propios[p.id];
      if (!precio) {
        sinDato(PRECIOS.sinDato[iso]?.[p.id] ?? "sin precio leído en la tienda oficial");
        continue;
      }
      if (!precioVigente(precio.consultadoEl, hoyPrecios)) {
        sinDato(`el precio se leyó el ${precio.consultadoEl}, hace más de ${VIGENCIA_PRECIO_DIAS} días`);
        continue;
      }
      let precioLocal = precio.monto;
      let cambio: CambioUsado | undefined;
      if (precio.moneda !== minimo.moneda) {
        if (!pais) {
          sinDato(`la tienda cobra en ${precio.moneda} y no hay tipo de cambio para ${minimo.moneda}`);
          continue;
        }
        const c = cambioDe(pais, precio.moneda, fecha);
        if (typeof c === "string") {
          sinDato(c);
          continue;
        }
        cambio = c;
        precioLocal = precio.monto * c.valor;
      }
      const ppa = ppaDe(iso);
      if (ppa) {
        const internacional = precioLocal / ppa;
        if (internacional < p.rangoPpa[0] || internacional > p.rangoPpa[1]) {
          sinDato(`el precio (${precio.monto} ${precio.moneda}) da ${Math.round(internacional)} dólares internacionales, fuera del rango esperable: probablemente mal leído`);
          continue;
        }
      }
      celdas[p.id] = { producto: p.id, precio, precioLocal, ...(cambio ? { cambio } : {}), horas: horasDe(precioLocal, minimo.porHora) };
    } catch (err) {
      sinDato(`el cálculo tiró una excepción: ${mensaje(err)}`);
    }
  }
  return celdas;
}

function esPrincipal(p: PaisDefinido): boolean {
  const c = p.mercado.codigo;
  return c !== "global" && !esMercadoDePrueba(c) && !p.edicionDe && !!p.mercado.pais && c === p.mercado.pais.toLowerCase();
}

export function construirInformeHoras(ahora: Date = new Date()): InformeHoras {
  const filas: FilaHoras[] = [];
  const excluidos: ExclusionHoras[] = [];
  const agregar = (minimo: MinimoHora | string, iso: string, mercado: string, pais: PaisDefinido | null, fecha: FechaISO) => {
    if (typeof minimo === "string") {
      excluidos.push({ iso, mercado, motivo: minimo });
      return;
    }
    const celdas = celdasDe(minimo, pais, fecha, fecha, excluidos);
    if (!Object.keys(celdas).length) {
      excluidos.push({ iso, mercado, motivo: "ningún producto con precio vigente en la tienda oficial" });
      return;
    }
    filas.push({ iso, mercado, minimo, celdas });
  };
  for (const pais of registro.paises) {
    const codigo = String(pais?.mercado?.codigo ?? "?");
    const iso = String(pais?.mercado?.pais ?? codigo).toUpperCase();
    try {
      if (!esPrincipal(pais) || !mercadoVisible(pais, "produccion")) continue;
      const fecha = hoyEn(pais.mercado, ahora);
      agregar(minimoDe(pais, fecha), iso, codigo, pais, fecha);
    } catch (err) {
      excluidos.push({ iso, mercado: codigo, motivo: `el país tiró una excepción: ${mensaje(err)}` });
    }
  }
  try {
    const fecha = hoyAR() as FechaISO;
    agregar(minimoAr(fecha), "AR", "ar", null, fecha);
  } catch (err) {
    excluidos.push({ iso: "AR", mercado: "ar", motivo: `calcular.ar tiró una excepción: ${mensaje(err)}` });
  }
  filas.sort((a, b) => a.iso.localeCompare(b.iso));
  const indice: IndiceHoras = { version: 1, generadoEl: hoyMasAdelantado(ahora), preciosActualizadosEl: PRECIOS.actualizadoEl, filas };
  return { indice, excluidos };
}

const VACIO: InformeHoras = { indice: { version: 1, generadoEl: "", preciosActualizadosEl: "", filas: [] }, excluidos: [{ iso: "*", mercado: "*", motivo: "el índice no se pudo armar" }] };
const REINTENTO_MS = 10 * 60_000;
let estado: { hasta: number; informe: InformeHoras } | null = null;

// Vale hasta la próxima medianoche de alguna zona de los países incluidos: así un precio que cumple 120
// días o un mínimo que vence salen ese mismo día en su país. Armarlo cuesta milisegundos.
export function informeHoras(): InformeHoras {
  const ahora = Date.now();
  if (estado && ahora < estado.hasta) return estado.informe;
  try {
    const momento = new Date(ahora);
    const informe = construirInformeHoras(momento);
    const zonas = new Set([...informe.indice.filas.map((f) => registro.pais(f.mercado as never)?.mercado.zonaHoraria ?? ZONA_AR), ZONA_AR]);
    const hasta = process.env.CALCULAR_HOY ? Infinity : ahora + msHastaCambioDeDia(zonas, momento) + 1000;
    estado = { hasta, informe };
    return informe;
  } catch (err) {
    console.error("[horas] informeHoras", err);
    estado = { hasta: ahora + REINTENTO_MS, informe: VACIO };
    return VACIO;
  }
}

export function indiceHoras(): IndiceHoras {
  return informeHoras().indice;
}
