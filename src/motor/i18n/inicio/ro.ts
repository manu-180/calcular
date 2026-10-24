import { GRAMATICA } from "../gramatica";
import { formaRo, pluralRo } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.ro;

// Rumano (ADR 0002, D18): «dumneavoastră» implícito y la 2.ª del plural, como en ANAF SPV, BCR e ING
// Home'Bank; el país con GRAMATICA.ro y los números con pluralRo («3 surse», «20 de surse»).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Vă aflați ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} cu valorile oficiale în vigoare.`,
    ultimoDato: "Ultima valoare încărcată",
    ir: (pais) => `Mergeți la calculatoarele ${g.para(pais)}`,
    otro: "Alegeți altă țară",
    argentina: "Calculatoarele dumneavoastră sunt pe calcular.ar, cu datele oficiale ale Argentinei.",
    argentinaIr: "Mergeți la calcular.ar",
    neutroTitulo: (paises) => `${pluralRo(paises, "țară", "țări")}, fiecare cu legile și moneda ei`,
    neutroTexto: "Verificăm sursele oficiale în fiecare zi.",
    neutroIr: "Vedeți țările",
  },
  selector: {
    buscar: "Căutați o țară",
    sinResultados: (q) => `Nicio țară nu corespunde căutării „${q}”`,
    ubicacion: "Locația actuală",
    mismaCalculadora: "Același calculator",
    paises: "Țări",
  },
  aviso: { mismaCalculadora: (pais) => `Calculați cu datele ${g.para(pais)}` },
  vivo: {
    titulo: "Date oficiale, actualizate automat",
    vigilado: "Un proces automat verifică sursele oficiale în fiecare zi. Schimbările de reglementare intră în calculatoare după ce le verificăm.",
    sinVigilar: "Fiecare valoare are sursa ei oficială și data la care am verificat-o.",
    verificado: "Ultima verificare a reglementărilor",
    automatico: "Ultima valoare automată",
    fuentes: "Surse oficiale",
    nFuentes: (n) => pluralRo(n, "document oficial", "documente oficiale"),
    verFuentes: "Vedeți sursele",
    verNovedades: "Vedeți noutățile",
    hoy: "astăzi",
    ayer: "ieri",
    elDia: (fecha) => `pe ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Date verificate la sursa oficială pe ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: actualizat ${cuando}, cu ultima valoare publicată de ${organismo}.`,
    diario: "Verificăm automat sursele oficiale, în fiecare zi.",
    actualizado: "Actualizat",
  },
  novedades: {
    pildora: "Noutăți",
    titulo: (pais) => `Ce s-a schimbat în datele oficiale ${g.para(pais)}`,
    acento: "chiar în ziua schimbării",
    bajada: "Fiecare valoare nouă care ajunge în calculatoare apare aici: ce s-a schimbat, de când se aplică și de unde provine.",
    ultimoCambio: "Ultima schimbare",
    revision: "Verificarea surselor",
    diaria: "În fiecare zi",
    porNorma: "La fiecare reglementare nouă",
    siguiendo: "Surse pe care le urmărim",
    masOrganismos: (n) => `și încă ${pluralRo(n, "sursă", "surse")}`,
    proximos: "Publicate, intră în vigoare în curând",
    proximosTexto: "Valori oficiale deja încărcate, care se aplică în zilele următoare.",
    registro: "Istoricul schimbărilor",
    rss: "Urmăriți prin RSS",
    vacio: "Încă nu există schimbări înregistrate pentru această țară.",
    etiqueta: { editorial: "Reglementare", dato: "Valoare nouă", proximo: "În curând", serie: "Automat", revision: "Verificare" },
    rige: (fecha) => `În vigoare de la ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `În vigoare de la ${desde} până la ${hasta}`,
    antes: (valor, fecha) => `Înainte: ${valor} (${fecha})`,
    revisados: (n) =>
      Number(n) === 1 ? "Am verificat o valoare la sursa oficială" : `Am verificat ${pluralRo(n, "valoare", "valori")} la sursa oficială`,
    revisadosTexto: (organismos) => `Valorile în vigoare au fost confirmate cu ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Vedeți valoarea" : `Vedeți cele ${pluralRo(n, "valoare", "valori")}`),
    calculadoras: "Se folosește în",
    rango: (min, max, zonas) => `între ${min} și ${max}, în funcție de zonă (${pluralRo(zonas, "zonă", "zone")})`,
    tabla: (filas) => `tabel cu ${pluralRo(filas, "tranșă", "tranșe")}`,
    valores: (n) => `${n} ${formaRo(n, "valoare", "valori")}`,
    pasosTitulo: "Cum rămân datele la zi",
    pasos: [
      { titulo: "O instituție publică", texto: "În sursa oficială apare o reglementare, un indice sau un curs de schimb." },
      {
        titulo: "Verificare înainte de folosire",
        texto: "Indicii și cursurile de schimb sosesc automat, cu verificarea intervalelor. Reglementările se încarcă având în față documentul oficial.",
      },
      { titulo: "Calculatoarele se actualizează", texto: "Calculatoarele trec la noua valoare, iar schimbarea apare aici împreună cu sursa ei." },
    ],
    feedTitulo: (pais) => `Noutăți ${g.para(pais)} pe CalcularYa`,
    feedSubtitulo: (pais) => `Schimbările datelor oficiale folosite de calculatoarele ${g.para(pais)}, cu datele de intrare în vigoare și sursele.`,
  },
};

export const ro: Diccionario<TextosInicio> = { base };
