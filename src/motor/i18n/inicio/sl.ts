import { fechaGenSl, GRAMATICA } from "../gramatica";
import { pluralSl } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.sl;

// Esloveno (ADR 0002, D32): «vi» en minúscula; el país se declina con GRAMATICA.sl y los números con
// pluralSl (one/two/few/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Nahajate se ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} z veljavnimi uradnimi vrednostmi.`,
    ultimoDato: "Zadnja naložena vrednost",
    ir: (pais) => `Pojdi na kalkulatorje ${g.para(pais)}`,
    otro: "Izberite drugo državo",
    argentina: "Vaši kalkulatorji so na calcular.ar, z uradnimi podatki Argentine.",
    argentinaIr: "Pojdi na calcular.ar",
    neutroTitulo: (paises) => `${pluralSl(paises, "država", "državi", "države", "držav")}, vsaka s svojimi zakoni in svojo valuto`,
    neutroTexto: "Uradne vire preverjamo vsak dan.",
    neutroIr: "Prikaži države",
  },
  selector: {
    buscar: "Poiščite državo",
    sinResultados: (q) => `Nobena država ne ustreza iskanju „${q}“`,
    ubicacion: "Vaša trenutna lokacija",
    mismaCalculadora: "Isti kalkulator",
    paises: "Države",
  },
  aviso: { mismaCalculadora: (pais) => `Izračunajte s podatki ${g.de(pais)}` },
  vivo: {
    titulo: "Uradni podatki, ki se posodabljajo samodejno",
    vigilado: "Samodejni postopek vsak dan preverja uradne vire. Spremembe predpisov se prikažejo, ko jih preverimo.",
    sinVigilar: "Vsaka vrednost ima uradni vir in datum, ko smo jo preverili.",
    verificado: "Zadnje preverjanje predpisov",
    automatico: "Zadnja samodejna vrednost",
    fuentes: "Uradni viri",
    nFuentes: (n) => pluralSl(n, "uradni dokument", "uradna dokumenta", "uradni dokumenti", "uradnih dokumentov"),
    verFuentes: "Prikaži vire",
    verNovedades: "Prikaži novosti",
    hoy: "danes",
    ayer: "včeraj",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Podatki, primerjani z uradnim virom. Datum: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: posodobljeno ${cuando}, zadnjo vrednost je objavil organ ${organismo}.`,
    diario: "Uradne vire samodejno preverjamo vsak dan.",
    actualizado: "Posodobljeno",
  },
  novedades: {
    pildora: "Novosti",
    titulo: (pais) => `Kaj se je spremenilo v uradnih podatkih ${g.para(pais)}`,
    acento: "na dan spremembe",
    bajada: "Tukaj beležimo vsako novo vrednost, ki pride v kalkulatorje: kaj se je spremenilo, od kdaj velja in od kod izvira.",
    ultimoCambio: "Zadnja sprememba",
    revision: "Preverjanje virov",
    diaria: "Vsak dan",
    porNorma: "Z vsakim novim predpisom",
    siguiendo: "Viri, ki jih spremljamo",
    masOrganismos: (n) => `in še ${n}`,
    proximos: "Objavljeno, kmalu začne veljati",
    proximosTexto: "Uradne vrednosti, ki smo jih že naložili in ki začnejo veljati v prihodnjih dneh.",
    registro: "Evidenca sprememb",
    rss: "Spremljajte prek RSS",
    vacio: "Za to državo še nismo zabeležili nobene spremembe.",
    etiqueta: { editorial: "Predpis", dato: "Nova vrednost", proximo: "Kmalu", serie: "Samodejno", revision: "Preverjanje" },
    rige: (fecha) => `Velja od ${fechaGenSl(fecha)}`,
    rigeDesdeHasta: (desde, hasta) => `Velja od ${fechaGenSl(desde)} do ${fechaGenSl(hasta)}`,
    antes: (valor, fecha) => `Prej: ${valor} (${fecha})`,
    revisados: (n) => `Število vrednosti, primerjanih z uradnim virom: ${n}`,
    revisadosTexto: (organismos) => `Veljavne vrednosti, potrjene pri virih: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Prikaži vrednost" : `Število vrednosti za prikaz: ${n}`),
    calculadoras: "Uporabljajo jih",
    rango: (min, max, zonas) => `od ${min} do ${max}, odvisno od regije (${pluralSl(zonas, "regija", "regiji", "regije", "regij")})`,
    tabla: (filas) => `tabela: ${pluralSl(filas, "razred", "razreda", "razredi", "razredov")}`,
    valores: (n) => pluralSl(n, "vrednost", "vrednosti", "vrednosti", "vrednosti"),
    pasosTitulo: "Kako podatki ostajajo ažurni",
    pasos: [
      { titulo: "Organ objavi", texto: "V uradnem viru se pojavi predpis, indeks ali menjalni tečaj." },
      { titulo: "Preverjanje pred uporabo", texto: "Indeksi in tečaji prihajajo samodejno in preverjamo njihove meje. Predpise vnašamo ročno, z uradnim dokumentom pred seboj." },
      { titulo: "Kalkulatorji se posodobijo", texto: "Kalkulatorji preidejo na novo vrednost, sprememba pa se tukaj zabeleži skupaj z virom." },
    ],
    feedTitulo: (pais) => `Novosti ${g.para(pais)} na CalcularYa`,
    feedSubtitulo: (pais) => `Spremembe uradnih podatkov, ki jih uporabljajo kalkulatorji ${g.para(pais)}, z datumi začetka veljavnosti in viri.`,
  },
};

export const sl: Diccionario<TextosInicio> = { base };
