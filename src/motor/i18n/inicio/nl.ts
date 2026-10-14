import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.nl;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Je bent ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} met de geldende officiële waarden.`,
    ultimoDato: "Laatst geladen waarde",
    ir: (pais) => `Naar ${g.nombre(pais)}`,
    otro: "Kies een ander land",
    argentina: "Je rekenhulpen staan op calcular.ar, met de officiële gegevens van Argentinië.",
    argentinaIr: "Naar calcular.ar",
    neutroTitulo: (paises) => `${paises} landen, elk met eigen wetten en een eigen munt`,
    neutroTexto: "We raadplegen de officiële bronnen elke dag.",
    neutroIr: "Landen bekijken",
  },
  selector: {
    buscar: "Zoek een land",
    sinResultados: (q) => `Geen land gevonden voor “${q}”`,
    ubicacion: "Huidige locatie",
    mismaCalculadora: "Zelfde rekenhulp",
    paises: "Landen",
  },
  aviso: { mismaCalculadora: (pais) => `Bereken het met de gegevens ${g.de(pais)}` },
  vivo: {
    titulo: "Officiële gegevens, automatisch bijgewerkt",
    vigilado: "Een automatisch proces raadpleegt de officiële bronnen elke dag. Gewijzigde regels nemen we over na controle.",
    sinVigilar: "Bij elke waarde staan de officiële bron en de datum waarop we die controleerden.",
    verificado: "Laatste controle van de regels",
    automatico: "Laatste automatische waarde",
    fuentes: "Officiële bronnen",
    nFuentes: (n) => (n === 1 ? "1 officieel document" : `${n} officiële documenten`),
    verFuentes: "Bronnen bekijken",
    verNovedades: "Wijzigingen bekijken",
    hoy: "vandaag",
    ayer: "gisteren",
    elDia: (fecha) => `op ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Gegevens op ${fecha} gecontroleerd bij de officiële bron.`,
    serie: (serie, cuando, organismo) => `${serie}: bijgewerkt ${cuando}, met de nieuwste waarde van ${organismo}.`,
    diario: "We raadplegen de officiële bronnen elke dag automatisch.",
    actualizado: "Bijgewerkt",
  },
  novedades: {
    pildora: "Wijzigingen",
    titulo: (pais) => `Wat er veranderde in de officiële gegevens ${g.de(pais)}`,
    acento: "op de dag van de wijziging",
    bajada: "Elke nieuwe waarde die in de rekenhulpen terechtkomt, noteren we hier: wat er veranderde, vanaf wanneer het geldt en waar het vandaan komt.",
    ultimoCambio: "Laatste wijziging",
    revision: "Controle van de bronnen",
    diaria: "Elke dag",
    porNorma: "Bij elke nieuwe regel",
    siguiendo: "Bronnen die we volgen",
    masOrganismos: (n) => `en nog ${n}`,
    proximos: "Gepubliceerd, geldt binnenkort",
    proximosTexto: "Officiële waarden die al geladen zijn en de komende dagen ingaan.",
    registro: "Wijzigingslogboek",
    rss: "Volgen via RSS",
    vacio: "Voor dit land zijn nog geen wijzigingen vastgelegd.",
    etiqueta: { editorial: "Regel", dato: "Nieuwe waarde", proximo: "Geldt binnenkort", serie: "Automatisch", revision: "Controle" },
    rige: (fecha) => `Geldt vanaf ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Geldt van ${desde} tot ${hasta}`,
    antes: (valor, fecha) => `Eerder: ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "We controleerden 1 waarde bij de officiële bron" : `We controleerden ${n} waarden bij de officiële bron`),
    revisadosTexto: (organismos) => `De geldende waarden zijn bevestigd bij ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Waarde bekijken" : `Alle ${n} waarden bekijken`),
    calculadoras: "Gebruikt door",
    rango: (min, max, zonas) => `van ${min} tot ${max} afhankelijk van het gebied (${zonas} gebieden)`,
    tabla: (filas) => `tabel met ${filas} schijven`,
    valores: (n) => `${n} waarden`,
    pasosTitulo: "Zo blijft het actueel",
    pasos: [
      { titulo: "Een instantie publiceert", texto: "Er verschijnt een besluit, een index of een wisselkoers in de officiële bron." },
      { titulo: "Gecontroleerd voor gebruik", texto: "Indexen en wisselkoersen komen automatisch binnen, met bandbreedtecontroles. Regels voeren we in met het officiële document erbij." },
      { titulo: "De rekenhulpen volgen", texto: "De rekenhulpen gebruiken de nieuwe waarde, en de wijziging staat hier met de bron erbij." },
    ],
    feedTitulo: (pais) => `Wijzigingen ${g.en(pais)} op CalcularYa`,
    feedSubtitulo: (pais) => `Wijzigingen in de officiële gegevens achter de rekenhulpen ${g.para(pais)}, met ingangsdatum en bron.`,
  },
};

export const nl: Diccionario<TextosInicio> = {
  base,
  usted: {
    arranque: {
      estasEn: (pais) => `U bent ${g.en(pais)}`,
      argentina: "Uw rekenhulpen staan op calcular.ar, met de officiële gegevens van Argentinië.",
    },
  },
};
