import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.it;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Sei ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} con i valori ufficiali in vigore.`,
    ultimoDato: "Ultimo dato caricato",
    ir: (pais) => `Vai ai calcolatori ${g.para(pais)}`,
    otro: "Scegli un altro paese",
    argentina: "I tuoi calcolatori sono su calcular.ar, con i dati ufficiali dell'Argentina.",
    argentinaIr: "Vai su calcular.ar",
    neutroTitulo: (paises) => `${paises} paesi, ognuno con le sue leggi e la sua valuta`,
    neutroTexto: "Consultiamo le fonti ufficiali ogni giorno.",
    neutroIr: "Vedi i paesi",
  },
  selector: {
    buscar: "Cerca un paese",
    sinResultados: (q) => `Nessun paese corrisponde a “${q}”`,
    ubicacion: "Posizione attuale",
    mismaCalculadora: "Stesso calcolatore",
    paises: "Paesi",
  },
  aviso: { mismaCalculadora: (pais) => `Calcolalo con i dati ${g.de(pais)}` },
  vivo: {
    titulo: "Dati ufficiali, aggiornati in automatico",
    vigilado: "Un processo automatico consulta le fonti ufficiali ogni giorno. Le modifiche alle norme entrano dopo una verifica.",
    sinVigilar: "Ogni valore ha la sua fonte ufficiale e la data in cui l'abbiamo controllato.",
    verificado: "Ultimo controllo delle norme",
    automatico: "Ultimo dato automatico",
    fuentes: "Fonti ufficiali",
    nFuentes: (n) => (n === 1 ? "1 documento ufficiale" : `${n} documenti ufficiali`),
    verFuentes: "Vedi le fonti",
    verNovedades: "Vedi le novità",
    hoy: "oggi",
    ayer: "ieri",
    elDia: (fecha) => `il ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Dati verificati sulla fonte ufficiale il ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: aggiornato ${cuando}, con l'ultimo dato di ${organismo}.`,
    diario: "Consultiamo le fonti ufficiali ogni giorno, in automatico.",
    actualizado: "Aggiornato",
  },
  novedades: {
    pildora: "Novità",
    titulo: (pais) => `Cosa è cambiato nei dati ufficiali ${g.de(pais)}`,
    acento: "il giorno in cui è cambiato",
    bajada: "Ogni nuovo dato che arriva ai calcolatori viene annotato qui: cosa è cambiato, da quando vale e da dove viene.",
    ultimoCambio: "Ultima modifica",
    revision: "Controllo delle fonti",
    diaria: "Ogni giorno",
    porNorma: "A ogni nuova norma",
    siguiendo: "Fonti che seguiamo",
    masOrganismos: (n) => `e altri ${n}`,
    proximos: "Già pubblicato, in vigore a breve",
    proximosTexto: "Valori ufficiali già caricati che entrano in vigore nei prossimi giorni.",
    registro: "Registro delle modifiche",
    rss: "Segui via RSS",
    vacio: "Per questo paese non ci sono ancora modifiche registrate.",
    etiqueta: { editorial: "Norma", dato: "Nuovo dato", proximo: "In vigore a breve", serie: "Automatico", revision: "Controllo" },
    rige: (fecha) => `In vigore dal ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `In vigore dal ${desde} al ${hasta}`,
    antes: (valor, fecha) => `Prima: ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "Abbiamo controllato 1 dato sulla fonte ufficiale" : `Abbiamo controllato ${n} dati sulla fonte ufficiale`),
    revisadosTexto: (organismos) => `I valori in vigore sono stati confermati presso ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Vedi il dato" : `Vedi i ${n} dati`),
    calculadoras: "Usato da",
    rango: (min, max, zonas) => `da ${min} a ${max} secondo la zona (${zonas} zone)`,
    tabla: (filas) => `tabella con ${filas} scaglioni`,
    valores: (n) => `${n} valori`,
    pasosTitulo: "Come resta aggiornato",
    pasos: [
      { titulo: "Un ente pubblica", texto: "Esce un provvedimento, un indice o un tasso di cambio sulla fonte ufficiale." },
      { titulo: "Controllato prima dell'uso", texto: "Indici e tassi di cambio arrivano in automatico, con controlli di intervallo. Le norme si caricano con il documento ufficiale sotto mano." },
      { titulo: "I calcoli si aggiornano", texto: "I calcolatori passano al nuovo dato e qui resta annotato, con la sua fonte." },
    ],
    feedTitulo: (pais) => `Novità ${g.de(pais)} su CalcularYa`,
    feedSubtitulo: (pais) => `Modifiche ai dati ufficiali usati dai calcolatori ${g.para(pais)}, con decorrenza e fonte.`,
  },
};

export const it: Diccionario<TextosInicio> = {
  base,
  usted: {
    arranque: {
      estasEn: (pais) => `Lei è ${g.en(pais)}`,
      otro: "Scelga un altro paese",
      argentina: "I Suoi calcolatori sono su calcular.ar, con i dati ufficiali dell'Argentina.",
    },
    aviso: { mismaCalculadora: (pais) => `Lo calcoli con i dati ${g.de(pais)}` },
  },
};
