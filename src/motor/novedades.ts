import { formatearValorUnidad } from "./formato";
import type { Registro } from "./registro";
import type { CodigoMercado, Dato, FechaISO, Fuente, Mercado, TramoVerificado, Unidad, ValorDato } from "./tipos";
import { sumarDias, valorSerie } from "./vigencia";

export type ValorFeed =
  | { tipo: "numero"; texto: string }
  | { tipo: "rango"; min: string; max: string; zonas: number }
  | { tipo: "tabla"; filas: number }
  | { tipo: "valores"; cantidad: number };

export interface DatoRevisado {
  id: string;
  nombre: string;
  valor: ValorFeed;
  desde: FechaISO;
  fuente: Fuente;
}

export type EntradaFeed =
  | { tipo: "editorial"; id: string; fecha: FechaISO; titulo: string; texto: string; vigenteDesde?: FechaISO; calculadoras: readonly string[]; fuente: Fuente }
  | { tipo: "dato"; id: string; fecha: FechaISO; dato: string; nombre: string; valor: ValorFeed; desde: FechaISO; hasta?: FechaISO; proximo: boolean; fuente: Fuente }
  | { tipo: "serie"; id: string; fecha: FechaISO; serie: string; nombre: string; valor: ValorFeed; anterior?: { fecha: FechaISO; valor: ValorFeed }; fuente: Fuente }
  | { tipo: "revision"; id: string; fecha: FechaISO; datos: DatoRevisado[]; organismos: string[] };

export interface OpcionesFeed {
  // Cuánto hacia atrás cuenta como "reciente" un tramo que empezó a regir.
  diasVigencia?: number;
  // Cuánto hacia atrás se listan las revisiones contra la fuente (una entrada por día).
  diasRevision?: number;
  // Cuánto hacia adelante se anuncian los tramos ya cargados que todavía no rigen.
  diasProximos?: number;
}

const ORDEN: Record<EntradaFeed["tipo"], number> = { editorial: 0, dato: 1, serie: 2, revision: 3 };

type Fmt = Pick<Mercado, "locale" | "simbolos">;

function numero(n: number, unidad: Unidad, m: Fmt): ValorFeed {
  return { tipo: "numero", texto: formatearValorUnidad(n, unidad, m.locale, m.simbolos) };
}

function valorDe(valor: ValorDato, unidad: Unidad, m: Fmt): ValorFeed {
  if (typeof valor === "number") return numero(valor, unidad, m);
  if (Array.isArray(valor)) return { tipo: "tabla", filas: valor.length };
  const valores = Object.values(valor as Record<string, number>);
  return valores.length === 1 ? numero(valores[0], unidad, m) : { tipo: "valores", cantidad: valores.length };
}

// Un dato por zona (salario mínimo por región, por ejemplo) se anuncia una vez por fecha: el rango
// entre la zona más baja y la más alta, no una entrada por zona.
function valorDeGrupo(tramos: readonly TramoVerificado[], dato: Dato, m: Fmt): ValorFeed {
  if (tramos.length === 1) return valorDe(tramos[0].valor, dato.unidad, m);
  const nums = tramos.map((t) => t.valor).filter((v): v is number => typeof v === "number");
  if (nums.length !== tramos.length) return valorDe(tramos[0].valor, dato.unidad, m);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (min === max) return numero(min, dato.unidad, m);
  return {
    tipo: "rango",
    min: formatearValorUnidad(min, dato.unidad, m.locale, m.simbolos),
    max: formatearValorUnidad(max, dato.unidad, m.locale, m.simbolos),
    zonas: tramos.length,
  };
}

const verificados = (dato: Dato) => dato.tramos.filter((t): t is TramoVerificado => t.estado === "verificado" && t.fuente?.tipo === "primaria");

// El registro de lo que cambió en un país, armado solo con lo que ya está en sus archivos: las
// novedades que escribe el país, los tramos de datos.json que empezaron a regir (o que ya están
// cargados y rigen pronto), el último punto de cada serie que publica el cron y las revisiones contra
// la fuente oficial. Nada de esto se escribe a mano: cada commit del cron o de un PR de normas lo mueve.
export function feedDe(registro: Registro, codigo: CodigoMercado, fecha: FechaISO, opciones: OpcionesFeed = {}): EntradaFeed[] {
  const pais = registro.pais(codigo);
  if (!pais) return [];
  const m = pais.mercado;
  const { diasVigencia = 120, diasRevision = 45, diasProximos = 90 } = opciones;
  const desdeVigencia = sumarDias(fecha, -diasVigencia);
  const desdeRevision = sumarDias(fecha, -diasRevision);
  const hastaProximos = sumarDias(fecha, diasProximos);
  const salida: EntradaFeed[] = [];

  for (const n of pais.novedades) {
    if (n.fecha > fecha) continue;
    salida.push({
      tipo: "editorial",
      id: `nota-${n.id}`,
      fecha: n.fecha,
      titulo: n.titulo,
      texto: n.texto,
      ...(n.vigenteDesde ? { vigenteDesde: n.vigenteDesde } : {}),
      calculadoras: n.calculadoras,
      fuente: n.fuente,
    });
  }

  const anunciados = new Set<TramoVerificado>();
  for (const dato of pais.datos) {
    const grupos = new Map<FechaISO, TramoVerificado[]>();
    for (const t of verificados(dato)) {
      const rigeHace = t.desde <= fecha && t.desde >= desdeVigencia;
      // Un tramo futuro se anuncia recién cuando ya está cargado (verificadoEl en el pasado).
      const rigePronto = t.desde > fecha && t.desde <= hastaProximos && t.fuente.verificadoEl <= fecha;
      if (!rigeHace && !rigePronto) continue;
      grupos.set(t.desde, [...(grupos.get(t.desde) ?? []), t]);
    }
    for (const [desde, tramos] of grupos) {
      const proximo = desde > fecha;
      const fuente = tramos[0].fuente;
      const hasta = tramos[0].hasta;
      for (const t of tramos) anunciados.add(t);
      salida.push({
        tipo: "dato",
        id: `dato-${dato.id}-${desde}`,
        // El anuncio de algo que todavía no rige tiene la fecha en que se cargó, no la de vigencia:
        // un feed con fechas futuras se ordena mal en cualquier lector.
        fecha: proximo ? fuente.verificadoEl : desde,
        dato: dato.id,
        nombre: dato.nombre,
        valor: valorDeGrupo(tramos, dato, m),
        desde,
        ...(hasta ? { hasta } : {}),
        proximo,
        fuente,
      });
    }
  }

  const revisiones = new Map<FechaISO, DatoRevisado[]>();
  for (const ficha of registro.fichas(codigo, fecha)) {
    const tramosVigentes = verificados(ficha.dato).filter((t) => t.desde <= fecha && (t.hasta === undefined || fecha <= t.hasta));
    const porRevision = new Map<FechaISO, TramoVerificado[]>();
    for (const t of tramosVigentes) {
      if (anunciados.has(t) || t.fuente.verificadoEl < desdeRevision || t.fuente.verificadoEl > fecha) continue;
      porRevision.set(t.fuente.verificadoEl, [...(porRevision.get(t.fuente.verificadoEl) ?? []), t]);
    }
    for (const [dia, tramos] of porRevision) {
      revisiones.set(dia, [
        ...(revisiones.get(dia) ?? []),
        { id: ficha.dato.id, nombre: ficha.dato.nombre, valor: valorDeGrupo(tramos, ficha.dato, m), desde: tramos[0].desde, fuente: tramos[0].fuente },
      ]);
    }
  }
  for (const [dia, datos] of revisiones) {
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    salida.push({ tipo: "revision", id: `revision-${dia}`, fecha: dia, datos, organismos: [...new Set(datos.map((d) => d.fuente.organismo))].sort((a, b) => a.localeCompare(b, "es")) });
  }

  for (const serie of pais.series) {
    const punto = valorSerie(serie, fecha);
    if (!punto) continue;
    const previos = serie.puntos.filter(([f]) => f < punto.fecha);
    const prev = previos.at(-1);
    salida.push({
      tipo: "serie",
      id: `serie-${serie.id}-${punto.fecha}`,
      fecha: punto.fecha,
      serie: serie.id,
      nombre: serie.nombre,
      valor: numero(punto.valor, serie.unidad, m),
      ...(prev ? { anterior: { fecha: prev[0], valor: numero(prev[1], serie.unidad, m) } } : {}),
      fuente: serie.fuente,
    });
  }

  return salida.sort((a, b) => b.fecha.localeCompare(a.fecha) || ORDEN[a.tipo] - ORDEN[b.tipo] || a.id.localeCompare(b.id));
}

export function ultimaEntrada(feed: readonly EntradaFeed[]): FechaISO | null {
  return feed.reduce<FechaISO | null>((max, e) => (max === null || e.fecha > max ? e.fecha : max), null);
}
