// Qué novedad corresponde a los datos que hay HOY en src/data. Lo usan dos scripts y ninguna página
// (importa medio src/data, no tiene que viajar en ningún bundle):
//   · scripts/datos-vivos/novedades.ts agrega al registro las que falten, con la fecha del día.
//   · scripts/check_novedades.ts falla si alguna falta: un dato nuevo cargado a mano sin registrar
//     no llega a main.
// Los ids salen del período del dato y no de la fecha de la corrida: correrlo dos veces no duplica.
// Cada detector produce SOLO lo último de su serie; lo viejo ya quedó registrado cuando entró.

import { IPC_SERIE } from "../data/ipc-serie";
import { CANASTA_BASICA_FUENTE, CANASTA_BASICA_ULTIMO } from "../data/canasta-basica";
import { CANASTA_CRIANZA_FUENTE, CANASTA_CRIANZA_ULTIMO } from "../data/canasta-crianza";
import { MESES_PREVISIONALES } from "../data/prestaciones";
import { ASIGNACIONES_ULTIMA_CARGADA } from "../data/asignaciones";
import { APORTES_FUENTES, TABLA_APORTES, VIGENCIA_APORTES } from "../data/aportes-casas-particulares";
import { UMA_VIGENTE } from "../data/uma";
import { formatARS, formatPct } from "./formato";
import { mesConAnio, nombreDeMes, type Novedad } from "./novedades";

export type Candidata = Omit<Novedad, "cargadoEl">;

/** ".../detalleAviso/primera/347832/20260923" → "2026-09-23". El B.O. pone la fecha en la URL. */
export function fechaDeUrlBO(url: string): string | undefined {
  const m = url.match(/\/(\d{4})(\d{2})(\d{2})(?:[/?#]|$)/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : undefined;
}

const pesos = (n: number) => formatARS(n, Number.isInteger(n) ? 0 : 2);
const pesosRedondos = (n: number) => formatARS(Math.round(n), 0);

function ipc(): Candidata[] {
  const [periodo, indice] = IPC_SERIE[IPC_SERIE.length - 1];
  const [, previo] = IPC_SERIE[IPC_SERIE.length - 2];
  const pct = Math.round((indice / previo - 1) * 1000) / 10;
  return [{
    id: `ipc-${periodo}`,
    serie: "ipc",
    organismo: "INDEC",
    tipo: "dato",
    titulo: `La inflación de ${nombreDeMes(periodo)} fue de ${formatPct(pct, 1)}`,
    detalle: `El INDEC publicó el índice de precios de ${mesConAnio(periodo)}. Ya lo usan las cuentas de inflación, ajuste de alquiler, plazo fijo y actualización de deudas laborales.`,
    fuente: { nombre: "INDEC · Índice de precios al consumidor", url: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31" },
    rutas: ["/inflacion", "/inflacion/alquiler", "/plazo-fijo", "/actualizacion-creditos-laborales"],
  }];
}

function canastaBasica(): Candidata[] {
  const u = CANASTA_BASICA_ULTIMO;
  return [{
    id: `canasta-basica-${u.periodo}`,
    serie: "canasta-basica",
    organismo: "INDEC",
    tipo: "dato",
    titulo: `Canasta básica de ${nombreDeMes(u.periodo)}: ${pesosRedondos(u.cbt)} por adulto`,
    detalle: `Es la línea de pobreza que marca el INDEC para una persona adulta en el Gran Buenos Aires en ${mesConAnio(u.periodo)}. La de indigencia quedó en ${pesosRedondos(u.cba)}.`,
    fuente: { nombre: "INDEC · Canasta básica alimentaria y total", url: CANASTA_BASICA_FUENTE.informe },
    rutas: ["/canasta-basica"],
  }];
}

function canastaCrianza(): Candidata[] {
  const u = CANASTA_CRIANZA_ULTIMO;
  return [{
    id: `canasta-crianza-${u.periodo}`,
    serie: "canasta-crianza",
    organismo: "INDEC",
    tipo: "dato",
    titulo: `Canasta de crianza de ${nombreDeMes(u.periodo)}`,
    detalle: `Criar a un chico de 6 a 12 años costó ${pesosRedondos(u.valores["6-a-12"].total)} en ${mesConAnio(u.periodo)}, sumando bienes y tiempo de cuidado. Es la referencia que usa la cuenta de cuota alimentaria.`,
    fuente: { nombre: "INDEC · Canasta de crianza", url: CANASTA_CRIANZA_FUENTE.informe },
    rutas: ["/cuota-alimentaria"],
  }];
}

function previsional(): Candidata[] {
  return MESES_PREVISIONALES.flatMap((m): Candidata[] => {
    const rige = `${m.periodo}-01`;
    const haberes: Candidata = {
      id: `haberes-${m.periodo}`,
      serie: "haberes",
      organismo: "ANSES",
      tipo: "dato",
      publicadoEl: fechaDeUrlBO(m.resolucionUrl),
      rigeDesde: rige,
      titulo: `Jubilaciones de ${nombreDeMes(m.periodo)}: suben ${formatPct(m.movilidad, 2)}`,
      detalle: `ANSES fijó la jubilación mínima en ${pesos(m.haberMinimo)} y la máxima en ${pesos(m.haberMaximo)}. La PUAM queda en ${pesos(m.puam)}.`,
      fuente: { nombre: `${m.resolucion} · Boletín Oficial`, url: m.resolucionUrl },
      rutas: ["/jubilacion", "/puam", "/pension-no-contributiva", "/edad-avanzada"],
    };
    if (!m.bono) return [haberes];
    const bono: Candidata = {
      id: `bono-${m.periodo}`,
      serie: "bono",
      organismo: "Gobierno nacional",
      tipo: "dato",
      publicadoEl: fechaDeUrlBO(m.bono.normaUrl),
      rigeDesde: rige,
      titulo: `Bono de ${formatARS(m.bono.monto, 0)} para jubilados en ${nombreDeMes(m.periodo)}`,
      detalle: `Lo confirmó el ${m.bono.norma}. Con la jubilación mínima, el total del mes llega a ${pesos(m.haberMinimo + m.bono.monto)}. Con haberes más altos el bono se achica, hasta desaparecer.`,
      fuente: { nombre: `${m.bono.norma} · Boletín Oficial`, url: m.bono.normaUrl },
      rutas: ["/jubilacion", "/puam", "/pension-no-contributiva"],
    };
    return [haberes, bono];
  });
}

function asignaciones(): Candidata[] {
  const t = ASIGNACIONES_ULTIMA_CARGADA;
  return [{
    id: `asignaciones-${t.periodo}`,
    serie: "asignaciones",
    organismo: "ANSES",
    tipo: "dato",
    publicadoEl: fechaDeUrlBO(t.resolucionUrl),
    rigeDesde: `${t.periodo}-01`,
    titulo: `Asignaciones familiares y AUH de ${nombreDeMes(t.periodo)}: suben ${formatPct(t.movilidad, 2)}`,
    detalle: `ANSES actualizó los montos y los topes de ingreso. Ojo: si una sola persona del hogar gana más de ${formatARS(t.topeIgfIndividual, 0)} por mes, el grupo entero deja de cobrar.`,
    fuente: { nombre: `${t.resolucion} · Boletín Oficial`, url: t.resolucionUrl },
    rutas: ["/asignaciones-familiares"],
  }];
}

function aportesCasas(): Candidata[] {
  const m = VIGENCIA_APORTES.archivoPdf.match(/-(\d{2})-(\d{2})\.pdf$/);
  if (!m) return [];
  const periodo = `20${m[2]}-${m[1]}`;
  const fila = TABLA_APORTES["activo-mayor-18"].find((f) => f.rango === "16-o-mas");
  return [{
    id: `aportes-casas-${periodo}`,
    serie: "aportes-casas",
    organismo: "ARCA",
    tipo: "dato",
    titulo: `Aportes de casas particulares de ${nombreDeMes(periodo)}`,
    detalle: fila
      ? `ARCA publicó lo que se paga por mes por una trabajadora registrada en ${mesConAnio(periodo)}. Con 16 horas semanales o más son ${pesos(fila.total)}, entre obra social, jubilación y ART.`
      : `ARCA publicó la tabla de aportes, contribuciones y ART de ${mesConAnio(periodo)}.`,
    fuente: { nombre: "ARCA · Aportes, contribuciones y ART de casas particulares", url: APORTES_FUENTES.lista[0].url },
    rutas: ["/aportes-empleada-domestica", "/deduccion-empleada-domestica"],
  }];
}

function uma(): Candidata[] {
  const u = UMA_VIGENTE;
  const periodo = u.desde.slice(0, 7);
  return [{
    id: `uma-${periodo}`,
    serie: "uma",
    organismo: "Corte Suprema",
    tipo: "dato",
    publicadoEl: u.resolucionFecha,
    rigeDesde: u.desde,
    titulo: `UMA de ${nombreDeMes(periodo)}: ${formatARS(u.valor, 0)}`,
    detalle: `La Corte Suprema fijó el valor de la unidad que se usa para regular honorarios desde ${mesConAnio(periodo)} (Resolución ${u.resolucion}).`,
    fuente: { nombre: `Corte Suprema · Resolución ${u.resolucion}`, url: `https://www.csjn.gov.ar/documentos/descargar?ID=${u.docId}` },
    rutas: ["/honorarios-periciales"],
  }];
}

export function novedadesDeLosDatos(): Candidata[] {
  return [...ipc(), ...canastaBasica(), ...canastaCrianza(), ...previsional(), ...asignaciones(), ...aportesCasas(), ...uma()];
}
