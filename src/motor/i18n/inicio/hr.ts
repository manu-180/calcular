import { GRAMATICA } from "../gramatica";
import { pluralHr } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.hr;

// Croata (ADR 0002, D27): «vi» en minúscula; el país se declina con GRAMATICA.hr y los números con
// pluralHr (one/few/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Nalazite se ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} s važećim službenim vrijednostima.`,
    ultimoDato: "Posljednja učitana vrijednost",
    ir: (pais) => `Idi na kalkulatore ${g.para(pais)}`,
    otro: "Odaberite drugu zemlju",
    argentina: "Vaši su kalkulatori na calcular.ar, sa službenim podacima Argentine.",
    argentinaIr: "Idi na calcular.ar",
    neutroTitulo: (paises) => `${pluralHr(paises, "zemlja", "zemlje", "zemalja")}, svaka sa svojim zakonima i svojom valutom`,
    neutroTexto: "Službene izvore provjeravamo svakog dana.",
    neutroIr: "Prikaži zemlje",
  },
  selector: {
    buscar: "Pronađite zemlju",
    sinResultados: (q) => `Nijedna zemlja ne odgovara pretrazi „${q}”`,
    ubicacion: "Vaša trenutačna lokacija",
    mismaCalculadora: "Isti kalkulator",
    paises: "Zemlje",
  },
  aviso: { mismaCalculadora: (pais) => `Izračunajte s podacima ${g.de(pais)}` },
  vivo: {
    titulo: "Službeni podaci koji se ažuriraju automatski",
    vigilado: "Automatski proces svakog dana provjerava službene izvore. Promjene propisa pojavljuju se kada ih provjerimo.",
    sinVigilar: "Svaka vrijednost ima službeni izvor i datum kada smo je provjerili.",
    verificado: "Posljednja provjera propisa",
    automatico: "Posljednja automatska vrijednost",
    fuentes: "Službeni izvori",
    nFuentes: (n) => pluralHr(n, "službeni dokument", "službena dokumenta", "službenih dokumenata"),
    verFuentes: "Prikaži izvore",
    verNovedades: "Prikaži novosti",
    hoy: "danas",
    ayer: "jučer",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Podaci usporedeni sa službenim izvorom ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: ažurirano ${cuando}, posljednju vrijednost objavilo je tijelo ${organismo}.`,
    diario: "Službene izvore automatski provjeravamo svakog dana.",
    actualizado: "Ažurirano",
  },
  novedades: {
    pildora: "Novosti",
    titulo: (pais) => `Što se promijenilo u službenim podacima ${g.para(pais)}`,
    acento: "na dan promjene",
    bajada: "Ovdje bilježimo svaku novu vrijednost koja stigne u kalkulatore: što se promijenilo, od kada vrijedi i odakle potječe.",
    ultimoCambio: "Posljednja promjena",
    revision: "Provjera izvora",
    diaria: "Svakog dana",
    porNorma: "Sa svakim novim propisom",
    siguiendo: "Izvori koje pratimo",
    masOrganismos: (n) => `i još ${n}`,
    proximos: "Objavljeno, uskoro počinje vrijediti",
    proximosTexto: "Službene vrijednosti koje smo već učitali i koje počinju vrijediti idućih dana.",
    registro: "Evidencija promjena",
    rss: "Pratite putem RSS-a",
    vacio: "Za ovu zemlju još nismo zabilježili nijednu promjenu.",
    etiqueta: { editorial: "Propis", dato: "Nova vrijednost", proximo: "Uskoro", serie: "Automatski", revision: "Provjera" },
    rige: (fecha) => `Vrijedi od ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Vrijedi od ${desde} do ${hasta}`,
    antes: (valor, fecha) => `Ranije: ${valor} (${fecha})`,
    revisados: (n) => `Sa službenim izvorom usporedili smo sljedeći broj vrijednosti: ${n}`,
    revisadosTexto: (organismos) => `Važeće vrijednosti potvrđene u izvorima: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Prikaži vrijednost" : `Prikaži ${pluralHr(n, "vrijednost", "vrijednosti", "vrijednosti")}`),
    calculadoras: "Koriste ih",
    rango: (min, max, zonas) => `od ${min} do ${max} ovisno o regiji (${pluralHr(zonas, "regija", "regije", "regija")})`,
    tabla: (filas) => `tablica: ${pluralHr(filas, "razred", "razreda", "razreda")}`,
    valores: (n) => pluralHr(n, "vrijednost", "vrijednosti", "vrijednosti"),
    pasosTitulo: "Kako podaci ostaju ažurni",
    pasos: [
      { titulo: "Tijelo objavljuje", texto: "U službenom izvoru pojavi se propis, indeks ili tečaj valute." },
      { titulo: "Provjera prije upotrebe", texto: "Indeksi i tečajevi stižu automatski i provjeravamo njihove granice. Propise unosimo ručno, sa službenim dokumentom pred sobom." },
      { titulo: "Kalkulatori se ažuriraju", texto: "Kalkulatori prelaze na novu vrijednost, a promjena se ovdje bilježi zajedno s izvorom." },
    ],
    feedTitulo: (pais) => `Novosti ${g.para(pais)} na CalcularYa`,
    feedSubtitulo: (pais) => `Promjene službenih podataka koje koriste kalkulatori ${g.para(pais)}, s datumima primjene i izvorima.`,
  },
};

export const hr: Diccionario<TextosInicio> = { base };
