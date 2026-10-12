import { resolverValores, type DatoUsado, type Registro } from "./registro";
import type { CodigoMercado, FechaISO, Fuente, PaisDefinido } from "./tipos";
import { diasEntre } from "./vigencia";

export interface SerieFresca {
  id: string;
  nombre: string;
  organismo: string;
  fecha: FechaISO;
  // null: no se sabe (se armó sin el país). false: el número lo carga una persona, no un detector.
  automatica: boolean | null;
}

export interface Frescura {
  verificadoEl: FechaISO | null;
  actualizadoEl: FechaISO | null;
  fuentes: Fuente[];
  series: SerieFresca[];
}

export interface FrescuraPais extends Frescura {
  // Series que el país declara pero que hoy no tienen un punto dentro de su maxAntiguedadDias: no se
  // pueden mostrar como "al día" y el hub no dice "hoy" por ellas.
  seriesAtrasadas: string[];
  vigilado: boolean;
}

const masNueva = (fechas: readonly (FechaISO | undefined | null)[]): FechaISO | null =>
  (fechas.filter(Boolean) as FechaISO[]).sort().at(-1) ?? null;
// «Datos verificados el…» promete que TODOS los datos de la página se leyeron en la fuente ese día:
// es la fecha más vieja la que no miente. La más nueva queda para «último cambio».
const masVieja = (fechas: readonly (FechaISO | undefined | null)[]): FechaISO | null =>
  (fechas.filter(Boolean) as FechaISO[]).sort().at(0) ?? null;

function seriesAutomaticas(pais: Pick<PaisDefinido, "detectores"> | undefined): ReadonlySet<string> | undefined {
  if (!pais) return undefined;
  return new Set(pais.detectores.flatMap((d) => (d.carril === "serie" ? [d.serie] : [])));
}

function fuentesUnicas(fuentes: readonly Fuente[]): Fuente[] {
  const porUrl = new Map<string, Fuente>();
  for (const f of fuentes) if (!porUrl.has(f.url)) porUrl.set(f.url, f);
  return [...porUrl.values()];
}

// Lo que ya resolvió una página (sus DatoUsado): la revisión más reciente de los tramos que usa y el
// último punto de sus series. Es la fecha que muestra el sello, no la del build.
export function frescuraDeUsados(usados: readonly DatoUsado[], automaticas?: ReadonlySet<string>): Frescura {
  const datos = usados.filter((u) => u.clase === "dato");
  const series = usados
    .filter((u) => u.clase === "serie")
    .map((u) => ({ id: u.id, nombre: u.nombre, organismo: u.fuente.organismo, fecha: u.desde, automatica: automaticas ? automaticas.has(u.id) : null }));
  return {
    verificadoEl: masVieja(datos.map((u) => u.fuente.verificadoEl)),
    actualizadoEl: masNueva(series.map((s) => s.fecha)),
    fuentes: fuentesUnicas(usados.map((u) => u.fuente)),
    series,
  };
}

export function frescuraDeCalculadora(registro: Registro, codigo: CodigoMercado, slug: string, fecha: FechaISO): Frescura | null {
  const pais = registro.pais(codigo);
  const entrada = registro.calculadora(codigo, slug);
  if (!pais || !entrada) return null;
  const r = resolverValores(pais, entrada.definicion, fecha);
  return r.ok ? frescuraDeUsados(r.usados, seriesAutomaticas(pais)) : null;
}

export function frescuraDePais(registro: Registro, codigo: CodigoMercado, fecha: FechaISO): FrescuraPais | null {
  const pais = registro.pais(codigo);
  if (!pais) return null;
  const automaticas = seriesAutomaticas(pais);
  const vigentes = registro.fichas(codigo, fecha).flatMap((f) => f.vigentes);
  const fichas = registro.fichasSeries(codigo, fecha);
  const series = fichas.flatMap((f) =>
    f.vigente ? [{ id: f.serie.id, nombre: f.serie.nombre, organismo: f.serie.fuente.organismo, fecha: f.vigente.fecha, automatica: automaticas?.has(f.serie.id) ?? null }] : [],
  );
  return {
    verificadoEl: masNueva(vigentes.map((v) => v.fuente.verificadoEl)),
    actualizadoEl: masNueva(series.map((s) => s.fecha)),
    fuentes: fuentesUnicas([...vigentes.map((v) => v.fuente), ...fichas.map((f) => f.serie.fuente)]),
    series,
    seriesAtrasadas: fichas.filter((f) => !f.vigente).map((f) => f.serie.id),
    vigilado: pais.detectores.length > 0,
  };
}

export type Cercania = "hoy" | "ayer" | "fecha";

// Contra el "hoy" de quien mira, no contra el del build: una página cacheada de ayer no puede decir
// "hoy". Por eso el sello lo resuelve en el navegador (FechaViva) y en el servidor queda la fecha.
export function cercania(fecha: FechaISO, hoy: FechaISO): Cercania {
  const d = diasEntre(fecha, hoy);
  return d === 0 ? "hoy" : d === 1 ? "ayer" : "fecha";
}
