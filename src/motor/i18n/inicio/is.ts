import { GRAMATICA } from "../gramatica";
import { pluralIs } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.is;

// Islandés (ADR 0002, D34): «þú» e imperativo de singular; el país se declina con GRAMATICA.is y los números
// con pluralIs (one/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Þú ert ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} með gildandi opinberum gildum.`,
    ultimoDato: "Síðasta gildi sem var sett inn",
    ir: (pais) => `Fara í reiknivélar ${g.para(pais)}`,
    otro: "Velja annað land",
    argentina: "Reiknivélarnar þínar eru á calcular.ar, með opinberum gögnum Argentínu.",
    argentinaIr: "Fara á calcular.ar",
    neutroTitulo: (paises) => `${pluralIs(paises, "land", "lönd")}, hvert með sín lög og sinn gjaldmiðil`,
    neutroTexto: "Við förum yfir opinberar heimildir á hverjum degi.",
    neutroIr: "Sýna lönd",
  },
  selector: {
    buscar: "Leita að landi",
    sinResultados: (q) => `Ekkert land passar við „${q}“`,
    ubicacion: "Staðsetning þín núna",
    mismaCalculadora: "Sama reiknivél",
    paises: "Lönd",
  },
  aviso: { mismaCalculadora: (pais) => `Reikna með gögnum ${g.de(pais)}` },
  vivo: {
    titulo: "Opinber gögn sem uppfærast sjálfkrafa",
    vigilado: "Sjálfvirkt ferli fer yfir opinberar heimildir á hverjum degi. Breytingar á reglum birtast þegar við höfum staðfest þær.",
    sinVigilar: "Hvert gildi hefur opinbera heimild og dagsetningu staðfestingar.",
    verificado: "Síðasta yfirferð á reglum",
    automatico: "Síðasta sjálfvirka gildi",
    fuentes: "Opinberar heimildir",
    nFuentes: (n) => pluralIs(n, "opinbert skjal", "opinber skjöl"),
    verFuentes: "Sýna heimildir",
    verNovedades: "Sýna nýjungar",
    hoy: "í dag",
    ayer: "í gær",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Gögn borin saman við opinbera heimild. Dagsetning: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: uppfært ${cuando}, síðasta gildi birti ${organismo}.`,
    diario: "Við förum sjálfkrafa yfir opinberar heimildir á hverjum degi.",
    actualizado: "Uppfært",
  },
  novedades: {
    pildora: "Nýjungar",
    titulo: (pais) => `Hvað hefur breyst í opinberum gögnum ${g.para(pais)}`,
    acento: "sama dag og það breytist",
    bajada: "Hér skráum við hvert nýtt gildi sem fer í reiknivélarnar: hvað breyttist, frá hvaða degi það gildir og hvaðan það kemur.",
    ultimoCambio: "Síðasta breyting",
    revision: "Yfirferð heimilda",
    diaria: "Á hverjum degi",
    porNorma: "Með hverri nýrri reglu",
    siguiendo: "Heimildir sem við fylgjumst með",
    masOrganismos: (n) => `og ${n} til viðbótar`,
    proximos: "Birt, tekur brátt gildi",
    proximosTexto: "Opinber gildi sem við höfum þegar sett inn og taka gildi á næstu dögum.",
    registro: "Breytingaskrá",
    rss: "Fylgjast með í RSS",
    vacio: "Við höfum ekki enn skráð neina breytingu fyrir þetta land.",
    etiqueta: { editorial: "Regla", dato: "Nýtt gildi", proximo: "Væntanlegt", serie: "Sjálfvirkt", revision: "Yfirferð" },
    rige: (fecha) => `Gildir frá ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Gildir frá ${desde} til ${hasta}`,
    antes: (valor, fecha) => `Áður: ${valor} (${fecha})`,
    revisados: (n) => `Fjöldi gilda sem borin voru saman við opinbera heimild: ${n}`,
    revisadosTexto: (organismos) => `Gildandi gildi staðfest hjá: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Sýna gildið" : `Fjöldi gilda til að sýna: ${n}`),
    calculadoras: "Notað í",
    rango: (min, max, zonas) => `frá ${min} til ${max}, eftir svæðum (fjöldi svæða: ${zonas})`,
    tabla: (filas) => `tafla: ${pluralIs(filas, "þrep", "þrep")}`,
    valores: (n) => pluralIs(n, "gildi", "gildi"),
    pasosTitulo: "Svona haldast gögnin uppfærð",
    pasos: [
      { titulo: "Stofnun birtir", texto: "Regla, vísitala eða gengi birtist í opinberri heimild." },
      { titulo: "Yfirferð fyrir notkun", texto: "Vísitölur og gengi koma sjálfkrafa og við könnum mörk þeirra. Reglur setjum við inn handvirkt, með opinbera skjalið fyrir framan okkur." },
      { titulo: "Reiknivélarnar uppfærast", texto: "Reiknivélarnar nota nýja gildið og breytingin er skráð hér ásamt heimildinni." },
    ],
    feedTitulo: (pais) => `Nýjungar ${g.para(pais)} á CalcularYa`,
    feedSubtitulo: (pais) => `Breytingar á opinberum gögnum sem reiknivélar ${g.para(pais)} nota, með gildistökudögum og heimildum.`,
  },
};

export const is: Diccionario<TextosInicio> = { base };
