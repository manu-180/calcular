import type { FuenteHoras } from "./tipos";

// Cómo leer el salario mínimo de cada país del registro y pasarlo a una hora de trabajo. El monto SIEMPRE
// sale del registro (src/paises/<m>/datos.json, dato verificado y vigente hoy); acá solo se dice qué dato,
// qué categoría y, si la ley no fija un valor por hora, qué jornada legal usar, con su fuente.
//
// Un país que no está acá entra solo si su calculadora de salario mínimo trae un valor por hora de la
// ley (inferencia en src/lib/horas/indice.ts). Si no, queda excluido con motivo en check_horas: para
// sumarlo hace falta su jornada semanal leída en la fuente oficial, nunca un promedio ni un blog.

export interface RefDato {
  dato: string;
  // Para un dato «mapa»: la categoría. Para uno «por región»: la región (y `clave` si además es mapa).
  clave?: string;
  region?: string;
}

export type JornadaDeclarada =
  // Del registro: un dato en horas (por semana o por día, según `porDia`).
  | ({ porDia?: boolean } & RefDato)
  // Leída a mano en la fuente oficial. `hasta`: desde ese día deja de valer (una reforma ya publicada).
  | { horas: number; porDia?: boolean; fuente: FuenteHoras; desde?: string; hasta?: string };

export type DeclaracionMinimo =
  | { excluir: string }
  | {
      minimo: RefDato;
      periodo: "hora" | "mes" | "anio" | "semana" | "dia";
      jornada?: JornadaDeclarada;
      // Diario que paga también el día de descanso: días pagados por semana y su fuente.
      diasPagados?: { dias: number; fuente: FuenteHoras };
      // Mínimo que la ley paga 14 veces al año (como lo lleva Eurostat).
      pagas?: { pagas: number; fuente: FuenteHoras };
      // Mensual ÷ divisor horario de la norma (dato del registro).
      divisor?: RefDato;
    };

const V = "2026-10-23";

const f = (organismo: string, titulo: string, url: string): FuenteHoras => ({ organismo, titulo, url, verificadoEl: V });

export const MINIMOS: Readonly<Record<string, DeclaracionMinimo>> = {
  // Con valor por hora fijado por la ley o el decreto.
  us: { minimo: { dato: "us.min-wage-federal" }, periodo: "hora" },
  ca: { minimo: { dato: "ca.federal-minimum-wage" }, periodo: "hora" },
  br: { minimo: { dato: "br.salario-minimo-hora" }, periodo: "hora" },
  gb: { minimo: { dato: "gb.minimum-wage", clave: "21-and-over" }, periodo: "hora" },
  fr: { minimo: { dato: "fr.smic-horaire" }, periodo: "hora" },
  de: { minimo: { dato: "de.mindestlohn" }, periodo: "hora" },
  nl: { minimo: { dato: "nl.minimumloon", clave: "21-plus" }, periodo: "hora" },
  ie: { minimo: { dato: "ie.minimum-wage" }, periodo: "hora" },
  au: { minimo: { dato: "au.salario-minimo-hora" }, periodo: "hora" },
  nz: { minimo: { dato: "nz.minimum-wage", clave: "adult" }, periodo: "hora" },
  za: { minimo: { dato: "za.minimum-wage", clave: "general" }, periodo: "hora" },
  hk: { minimo: { dato: "hk.minimum-wage" }, periodo: "hora" },
  my: { minimo: { dato: "my.minimum-wage-hourly" }, periodo: "hora" },
  py: { minimo: { dato: "py.minimos", clave: "hora" }, periodo: "hora" },
  // Categorías: la de comercio de la zona principal, que es la que se usa como referencia general.
  pa: { minimo: { dato: "pa.salario-minimo-hora-region-1", clave: "comercio-menor-gran" }, periodo: "hora" },
  hn: { minimo: { dato: "hn.salario-minimo-hora", clave: "comercio-1-10" }, periodo: "hora" },
  ke: { minimo: { dato: "ke.minimum-wage-hourly", region: "cities", clave: "general" }, periodo: "hora" },
  tz: { minimo: { dato: "tz.minimum-wage-hourly", clave: "trade-business" }, periodo: "hora" },

  // La norma trae su propio divisor horario.
  uy: { minimo: { dato: "uy.smn" }, periodo: "mes", divisor: { dato: "uy.smn-divisor-hora" } },
  lu: { minimo: { dato: "lu.ssm-non-qualifie" }, periodo: "mes", divisor: { dato: "lu.heures-par-mois" } },

  // Mensual, con la jornada semanal del registro.
  cl: { minimo: { dato: "cl.imm" }, periodo: "mes", jornada: { dato: "cl.jornada-maxima" } },
  co: { minimo: { dato: "co.smmlv" }, periodo: "mes", jornada: { dato: "co.jornada-semanal" } },
  // España: el anual del real decreto (las 14 pagas ya sumadas).
  es: { minimo: { dato: "es.smi-anual" }, periodo: "anio", jornada: { dato: "es.jornada-maxima-semanal" } },
  // Costa Rica: el salario por jornada ordinaria ÷ las horas de la jornada diurna, los dos del decreto.
  cr: { minimo: { dato: "cr.salario-minimo-jornada", clave: "no-calificado" }, periodo: "dia", jornada: { dato: "cr.jornada-diaria", clave: "diurna", porDia: true } },

  // Mensual, con la jornada semanal leída en la ley (2026-10-23).
  ec: {
    minimo: { dato: "ec.sbu" },
    periodo: "mes",
    jornada: { horas: 40, fuente: f("Ministerio del Trabajo (Código del Trabajo, art. 47)", "Jornada máxima: 8 horas diarias, 40 semanales", "https://portal.compraspublicas.gob.ec/sercop/wp-content/uploads/2026/08/CODIGO-DEL-TRABAJO.pdf") },
  },
  pe: {
    minimo: { dato: "pe.rmv" },
    periodo: "mes",
    jornada: { horas: 48, fuente: f("Tribunal Constitucional (cita el art. 25 de la Constitución)", "Jornada ordinaria: 8 horas diarias o 48 semanales como máximo", "https://tc.gob.pe/jurisprudencia/2019/06845-2015-AA.pdf") },
  },
  gt: {
    minimo: { dato: "gt.salario-minimo-mensual", region: "ce1", clave: "no-agricola" },
    periodo: "mes",
    jornada: { horas: 48, fuente: f("Ministerio de Trabajo (Código de Trabajo, art. 116)", "Jornada diurna: 8 horas diarias, 48 a la semana", "https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Codigo-de-Trabajo.pdf") },
  },
  do: {
    minimo: { dato: "do.salario-minimo", clave: "grande" },
    periodo: "mes",
    jornada: { horas: 44, fuente: f("Ministerio de Trabajo (Código de Trabajo, art. 147)", "Jornada: 8 horas por día, 44 por semana", "https://transparencia.mt.gob.do/images/docs/publicaciones/codigo-de-trabajo.pdf") },
  },
  sv: {
    minimo: { dato: "sv.salario-minimo", region: "comercio-servicios" },
    periodo: "mes",
    jornada: { horas: 44, fuente: f("Código de Trabajo, art. 161", "Semana laboral diurna: 44 horas", "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF") },
  },
  pt: {
    minimo: { dato: "pt.rmmg" },
    periodo: "mes",
    jornada: { horas: 40, fuente: f("Procuradoria-Geral Distrital de Lisboa (Código do Trabalho, art. 203.º)", "Período normal de trabalho: 8 horas por dia e 40 por semana", "https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis&pagina=1&ficha=201") },
    pagas: { pagas: 14, fuente: f("Procuradoria-Geral Distrital de Lisboa (Código do Trabalho, arts. 263.º e 264.º)", "Subsídio de Natal e subsídio de férias, de um mês cada", "https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis&pagina=1&ficha=201") },
  },
  be: {
    minimo: { dato: "be.ggmmi" },
    periodo: "mes",
    jornada: { horas: 38, fuente: f("SPF Emploi, Travail et Concertation sociale", "Durée hebdomadaire: 38 heures effectives par semaine", "https://emploi.belgique.be/fr/themes/international/detachement/conditions-de-travail-respecter-en-cas-de-detachement-en-0") },
  },

  // México: el diario se paga los 7 días (art. 69 de la LFT) por 48 horas en 2026. La reforma
  // constitucional del 3/3/2026 baja a 46 horas desde el 1/1/2027: ese día la jornada vence y México sale
  // del índice hasta que alguien la actualice acá con su fuente.
  mx: {
    minimo: { dato: "mx.salario-minimo", region: "general" },
    periodo: "dia",
    jornada: {
      horas: 48,
      desde: "2026-01-01",
      hasta: "2026-12-31",
      fuente: f("Diario Oficial de la Federación (decreto del 3/3/2026, transitorio tercero)", "Jornada semanal máxima: 48 horas en 2026", "https://dof.gob.mx/nota_detalle.php?codigo=5781417&fecha=03/03/2026"),
    },
    diasPagados: { dias: 7, fuente: f("Cámara de Diputados (LFT, art. 69)", "Por cada seis días de trabajo, un día de descanso con goce de salario íntegro", "https://sitl.diputados.gob.mx/LXVI_leg/cuadros_comparativos/2PO2/0295-2PO2-26.pdf") },
  },

  // Excluidos a propósito.
  ni: { excluir: "la jornada semanal no se pudo leer en una fuente oficial (el digesto de la Asamblea rechaza la lectura)" },
  bo: { excluir: "la jornada semanal no se pudo leer en una fuente oficial" },
  pk: { excluir: "la jornada semanal (Factories Act, sección 34) no se pudo leer en una fuente oficial" },
  gh: { excluir: "el mínimo es diario y las horas de la jornada no se pudieron leer en una fuente oficial" },
  ph: { excluir: "el mínimo es diario y las horas de la jornada no se pudieron leer en una fuente oficial" },
  ng: { excluir: "la ley laboral no fija una jornada semanal (la deja al contrato)" },
  ve: { excluir: "el salario mínimo legal (130 bolívares desde 2022) no refleja el ingreso mínimo: casi todo se paga en bonos que no son salario" },
};
