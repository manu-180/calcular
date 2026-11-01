import type {
  Aviso,
  AvisoResuelto,
  Dato,
  FechaISO,
  Mercado,
  PuntoSerie,
  Serie,
  TipoDato,
  TramoVerificado,
  ValorPorTipo,
} from "./tipos";

const RE_FECHA = /^(\d{4})-(\d{2})-(\d{2})$/;

export function esFechaISO(valor: unknown): valor is FechaISO {
  if (typeof valor !== "string") return false;
  const m = RE_FECHA.exec(valor);
  if (!m) return false;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.getUTCFullYear() === Number(m[1]) && d.getUTCMonth() === Number(m[2]) - 1 && d.getUTCDate() === Number(m[3]);
}

export function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  const d = new Date(`${fecha}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10) as FechaISO;
}

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  return Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${desde}T00:00:00Z`)) / 86_400_000);
}

// Un Intl.DateTimeFormat por zona, no por llamada: hoyEn() corre una vez por cada miembro de cada clúster
// de cada página (fechaDelClusterDesde), millones de veces en check_hreflang y en el sitemap, y cada
// constructor arma un objeto ICU de varios KB (la tercera corrida que tumbó la PC por RAM, 27/10/2026).
const formatosPorZona = new Map<string, Intl.DateTimeFormat>();

export function fechaEnZona(instante: Date, zonaHoraria: string): FechaISO {
  let f = formatosPorZona.get(zonaHoraria);
  if (!f) {
    f = new Intl.DateTimeFormat("en-CA", { timeZone: zonaHoraria, year: "numeric", month: "2-digit", day: "2-digit" });
    formatosPorZona.set(zonaHoraria, f);
  }
  return f.format(instante) as FechaISO;
}

// CALCULAR_HOY fija el día a mano (pruebas, fotos de rutas). CALCULAR_HOY_BUILD NO se lee a
// propósito: es el día del build en hora argentina (src/lib/hoy.ts) y congelaría a todos los
// mercados en esa fecha; las páginas intl se regeneran solas (revalidate) y toman el día de la
// zona del mercado. El navegador no llama a esto nunca: la fecha viaja como prop, si no el HTML y
// el JS podrían elegir tramos distintos.
export function hoyEn(mercado: Pick<Mercado, "zonaHoraria">, ahora: Date = new Date()): FechaISO {
  if (typeof window !== "undefined") {
    throw new Error("hoyEn() corre solo en el servidor: la fecha de referencia llega al cliente como prop");
  }
  const fijada = process.env.CALCULAR_HOY;
  if (fijada && esFechaISO(fijada)) return fijada;
  return fechaEnZona(ahora, mercado.zonaHoraria);
}

// La fecha de cada mercado en el mismo instante en que `mercado` está en `fecha`. Los equivalentes de una
// página (hreflang, sitemap) se evalúan así y no con la fecha de la página para todos: cerca de la
// medianoche, un dato que vence en un país lo sacaba del clúster de las páginas que ya estaban en el
// día siguiente y no del resto (NI, inflación, 2026-10-24: ~1.850 fallas en check_hreflang). Con una
// fecha que no es la de hoy se conserva la diferencia de días de ahora entre las zonas.
export function fechasDelMismoInstante(mercado: Pick<Mercado, "zonaHoraria">, fecha: FechaISO, ahora: Date = new Date()): (m: Pick<Mercado, "zonaHoraria">) => FechaISO {
  if (typeof window !== "undefined") return () => fecha;
  const base = hoyEn(mercado, ahora);
  const porZona = new Map<string, FechaISO>([[mercado.zonaHoraria, fecha]]);
  return (m) => {
    let f = porZona.get(m.zonaHoraria);
    if (!f) porZona.set(m.zonaHoraria, (f = sumarDias(fecha, diasEntre(base, hoyEn(m, ahora)))));
    return f;
  };
}

// La fecha de cada mercado vista desde una página de `desde` armada para `fecha`: corre `fecha` lo
// mismo que se corre hoy la zona de cada mercado respecto de la de `desde`. Con `fecha` = hoy de
// `desde` da el hoy de cada uno, así dos páginas del mismo clúster (Santiago y Sídney, que a la tarde
// de América ya están en días distintos) evalúan a cada mercado en el mismo día y listan el mismo
// clúster aunque una serie venza justo entre las dos fechas. Con CALCULAR_HOY todos dan la misma.
export function fechasDesde(desde: Pick<Mercado, "zonaHoraria">, fecha: FechaISO, ahora: Date = new Date()): (m: Pick<Mercado, "zonaHoraria">) => FechaISO {
  const base = hoyEn(desde, ahora);
  const porZona = new Map<string, FechaISO>();
  return (m) => {
    let f = porZona.get(m.zonaHoraria);
    if (!f) porZona.set(m.zonaHoraria, (f = sumarDias(fecha, diasEntre(base, hoyEn(m, ahora)))));
    return f;
  };
}

// La fecha más adelantada del planeta (UTC+14). Sirve para validar que una verificación no esté
// en el futuro sin rechazar a quien la cargó en su propia zona horaria.
export function hoyMasAdelantado(ahora: Date = new Date()): FechaISO {
  const fijada = process.env.CALCULAR_HOY;
  if (fijada && esFechaISO(fijada)) return fijada;
  return fechaEnZona(ahora, "Pacific/Kiritimati");
}

export function cubre(tramo: { desde: FechaISO; hasta?: FechaISO }, fecha: FechaISO): boolean {
  return tramo.desde <= fecha && (tramo.hasta === undefined || fecha <= tramo.hasta);
}

export class ErrorDeDatos extends Error {
  override name = "ErrorDeDatos";
}

export function tramoEn<T extends TipoDato>(dato: Dato<T>, fecha: FechaISO, region?: string) {
  if (dato.regiones && region === undefined) return undefined;
  const candidatos = dato.tramos.filter((t) => cubre(t, fecha) && (dato.regiones ? t.region === region : t.region === undefined));
  if (candidatos.length > 1) {
    throw new ErrorDeDatos(`${dato.id}: ${candidatos.length} tramos se solapan el ${fecha}${region ? ` en ${region}` : ""}`);
  }
  return candidatos[0];
}

function esVerificadoUtilizable<V>(t: { estado: string; valor?: V; fuente?: { tipo: string; url: string } }): boolean {
  return t.estado === "verificado" && t.valor !== undefined && t.fuente?.tipo === "primaria" && t.fuente.url.startsWith("https://");
}

export function vigente<T extends TipoDato>(
  dato: Dato<T>,
  fecha: FechaISO,
  region?: string,
): TramoVerificado<ValorPorTipo[T]> | null {
  const tramo = tramoEn(dato, fecha, region);
  if (!tramo || !esVerificadoUtilizable(tramo)) return null;
  return tramo as TramoVerificado<ValorPorTipo[T]>;
}

export function vigentePorRegion<T extends TipoDato>(
  dato: Dato<T>,
  fecha: FechaISO,
): Readonly<Record<string, TramoVerificado<ValorPorTipo[T]>>> | null {
  if (!dato.regiones || dato.regiones.length === 0) return null;
  const salida: Record<string, TramoVerificado<ValorPorTipo[T]>> = {};
  for (const region of dato.regiones) {
    const t = vigente(dato, fecha, region);
    if (!t) return null;
    salida[region] = t;
  }
  return salida;
}

export function ultimoPunto(serie: Pick<Serie, "puntos">): PuntoSerie | null {
  const p = serie.puntos[serie.puntos.length - 1];
  return p ? { fecha: p[0], valor: p[1] } : null;
}

export function valorSerie(serie: Serie, fecha: FechaISO): PuntoSerie | null {
  let elegido: PuntoSerie | null = null;
  for (const [f, v] of serie.puntos) {
    if (f <= fecha && (elegido === null || f > elegido.fecha)) elegido = { fecha: f, valor: v };
  }
  if (!elegido) return null;
  if (diasEntre(elegido.fecha, fecha) > serie.maxAntiguedadDias) return null;
  return elegido;
}

function aplicaA(aviso: Aviso, calculadora: { id: string; concepto: string }): boolean {
  return aviso.aplicaA === "*" || aviso.aplicaA.includes(calculadora.id) || aviso.aplicaA.includes(calculadora.concepto);
}

export function avisosVigentes(
  avisos: readonly Aviso[],
  fecha: FechaISO,
  calculadora?: { id: string; concepto: string },
): AvisoResuelto[] {
  return avisos
    .filter((a) => cubre(a, fecha) && (calculadora === undefined || aplicaA(a, calculadora)))
    .map(({ id, nivel, titulo, texto, fuente }) => ({ id, nivel, ...(titulo ? { titulo } : {}), texto, fuente }));
}
