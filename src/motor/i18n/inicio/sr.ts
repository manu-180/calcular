import { GRAMATICA } from "../gramatica";
import { pluralSr } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.sr;

// Serbio en latinica y ekavski (ADR 0002, D23): «vi» en minúscula; el país se declina con
// GRAMATICA.sr y los números con pluralSr (one/few/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Nalazite se ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} sa važećim zvaničnim vrednostima.`,
    ultimoDato: "Poslednja učitana vrednost",
    ir: (pais) => `Idi na kalkulatore ${g.para(pais)}`,
    otro: "Izaberite drugu zemlju",
    argentina: "Vaši kalkulatori su na calcular.ar, sa zvaničnim podacima Argentine.",
    argentinaIr: "Idi na calcular.ar",
    neutroTitulo: (paises) => `${pluralSr(paises, "zemlja", "zemlje", "zemalja")}, svaka sa svojim zakonima i svojom valutom`,
    neutroTexto: "Zvanične izvore proveravamo svakog dana.",
    neutroIr: "Prikaži zemlje",
  },
  selector: {
    buscar: "Pronađite zemlju",
    sinResultados: (q) => `Nijedna zemlja ne odgovara pretrazi „${q}“`,
    ubicacion: "Vaša trenutna lokacija",
    mismaCalculadora: "Isti kalkulator",
    paises: "Zemlje",
  },
  aviso: { mismaCalculadora: (pais) => `Izračunajte sa podacima ${g.de(pais)}` },
  vivo: {
    titulo: "Zvanični podaci koji se ažuriraju automatski",
    vigilado: "Automatski proces svakog dana proverava zvanične izvore. Promene propisa se pojavljuju kada ih proverimo.",
    sinVigilar: "Svaka vrednost ima zvanični izvor i datum kada smo je proverili.",
    verificado: "Poslednja provera propisa",
    automatico: "Poslednja automatska vrednost",
    fuentes: "Zvanični izvori",
    nFuentes: (n) => pluralSr(n, "zvanični dokument", "zvanična dokumenta", "zvaničnih dokumenata"),
    verFuentes: "Prikaži izvore",
    verNovedades: "Prikaži novosti",
    hoy: "danas",
    ayer: "juče",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Podaci upoređeni sa zvaničnim izvorom ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: ažurirano ${cuando}, poslednju vrednost objavio je organ ${organismo}.`,
    diario: "Zvanične izvore automatski proveravamo svakog dana.",
    actualizado: "Ažurirano",
  },
  novedades: {
    pildora: "Novosti",
    titulo: (pais) => `Šta se promenilo u zvaničnim podacima ${g.para(pais)}`,
    acento: "na dan promene",
    bajada: "Ovde beležimo svaku novu vrednost koja stigne u kalkulatore: šta se promenilo, od kada važi i odakle potiče.",
    ultimoCambio: "Poslednja promena",
    revision: "Provera izvora",
    diaria: "Svakog dana",
    porNorma: "Sa svakim novim propisom",
    siguiendo: "Izvori koje pratimo",
    masOrganismos: (n) => `i još ${n}`,
    proximos: "Objavljeno, uskoro počinje da važi",
    proximosTexto: "Zvanične vrednosti koje smo već učitali i koje počinju da važe narednih dana.",
    registro: "Evidencija promena",
    rss: "Pratite preko RSS-a",
    vacio: "Za ovu zemlju još nismo zabeležili nijednu promenu.",
    etiqueta: { editorial: "Propis", dato: "Nova vrednost", proximo: "Uskoro", serie: "Automatski", revision: "Provera" },
    rige: (fecha) => `Važi od ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Važi od ${desde} do ${hasta}`,
    antes: (valor, fecha) => `Ranije: ${valor} (${fecha})`,
    revisados: (n) => `Sa zvaničnim izvorom smo uporedili sledeći broj vrednosti: ${n}`,
    revisadosTexto: (organismos) => `Važeće vrednosti potvrđene u izvorima: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Prikaži vrednost" : `Prikaži ${pluralSr(n, "vrednost", "vrednosti", "vrednosti")}`),
    calculadoras: "Koriste ih",
    rango: (min, max, zonas) => `od ${min} do ${max} u zavisnosti od regiona (${pluralSr(zonas, "region", "regiona", "regiona")})`,
    tabla: (filas) => `tabela: ${pluralSr(filas, "razred", "razreda", "razreda")}`,
    valores: (n) => pluralSr(n, "vrednost", "vrednosti", "vrednosti"),
    pasosTitulo: "Kako podaci ostaju ažurni",
    pasos: [
      { titulo: "Organ objavljuje", texto: "U zvaničnom izvoru se pojavi propis, indeks ili kurs valute." },
      { titulo: "Provera pre upotrebe", texto: "Indeksi i kursevi stižu automatski i proveravamo njihove granice. Propise unosimo ručno, sa zvaničnim dokumentom pred sobom." },
      { titulo: "Kalkulatori se ažuriraju", texto: "Kalkulatori prelaze na novu vrednost, a promena se ovde beleži zajedno sa izvorom." },
    ],
    feedTitulo: (pais) => `Novosti ${g.para(pais)} na CalcularYa`,
    feedSubtitulo: (pais) => `Promene zvaničnih podataka koje koriste kalkulatori ${g.para(pais)}, sa datumima primene i izvorima.`,
  },
};

export const sr: Diccionario<TextosInicio> = { base };
