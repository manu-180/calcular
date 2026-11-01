import { GRAMATICA } from "../gramatica";
import { pluralLt } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.lt;

// Lituano (ADR 0002, D29): «jūs» en minúscula; el país se declina con GRAMATICA.lt y los números con
// pluralLt. Un número seguido de sustantivo solo en nominativo o genitivo de cuenta: si la frase pide
// otro caso, va tras dos puntos.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Esate ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} su galiojančiomis oficialiomis reikšmėmis.`,
    ultimoDato: "Paskutinė įkelta reikšmė",
    ir: (pais) => `Pereiti prie skaičiuoklių ${g.para(pais)}`,
    otro: "Pasirinkti kitą šalį",
    argentina: "Jūsų skaičiuoklės yra calcular.ar, su oficialiais Argentinos duomenimis.",
    argentinaIr: "Pereiti į calcular.ar",
    neutroTitulo: (paises) => `${pluralLt(paises, "šalis", "šalys", "šalių")}, kiekviena su savo įstatymais ir valiuta`,
    neutroTexto: "Oficialius šaltinius tikriname kiekvieną dieną.",
    neutroIr: "Rodyti šalis",
  },
  selector: {
    buscar: "Raskite šalį",
    sinResultados: (q) => `Pagal paiešką „${q}“ šalies neradome`,
    ubicacion: "Jūsų dabartinė vieta",
    mismaCalculadora: "Ta pati skaičiuoklė",
    paises: "Šalys",
  },
  aviso: { mismaCalculadora: (pais) => `Apskaičiuokite su ${g.de(pais)} duomenimis` },
  vivo: {
    titulo: "Oficialūs duomenys, kurie atnaujinami automatiškai",
    vigilado: "Automatinis procesas kasdien tikrina oficialius šaltinius. Teisės aktų pakeitimai atsiranda, kai juos patikriname.",
    sinVigilar: "Kiekviena reikšmė turi oficialų šaltinį ir patikrinimo datą.",
    verificado: "Paskutinis teisės aktų patikrinimas",
    automatico: "Paskutinė automatinė reikšmė",
    fuentes: "Oficialūs šaltiniai",
    nFuentes: (n) => pluralLt(n, "oficialus dokumentas", "oficialūs dokumentai", "oficialių dokumentų"),
    verFuentes: "Rodyti šaltinius",
    verNovedades: "Rodyti naujienas",
    hoy: "šiandien",
    ayer: "vakar",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Duomenys palyginti su oficialiu šaltiniu ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: atnaujinta ${cuando}, paskutinę reikšmę paskelbė ${organismo}.`,
    diario: "Oficialius šaltinius automatiškai tikriname kiekvieną dieną.",
    actualizado: "Atnaujinta",
  },
  novedades: {
    pildora: "Naujienos",
    titulo: (pais) => `Kas pasikeitė oficialiuose ${g.de(pais)} duomenyse`,
    acento: "pakeitimo dieną",
    bajada: "Čia įrašome kiekvieną naują reikšmę, patekusią į skaičiuokles: kas pasikeitė, nuo kada galioja ir iš kur paimta.",
    ultimoCambio: "Paskutinis pakeitimas",
    revision: "Šaltinių patikrinimas",
    diaria: "Kiekvieną dieną",
    porNorma: "Su kiekvienu nauju teisės aktu",
    siguiendo: "Šaltiniai, kuriuos stebime",
    masOrganismos: (n) => `ir dar: ${n}`,
    proximos: "Paskelbta, netrukus įsigalios",
    proximosTexto: "Jau įkeltos oficialios reikšmės, kurios įsigalios artimiausiomis dienomis.",
    registro: "Pakeitimų žurnalas",
    rss: "Sekti per RSS",
    vacio: "Šiai šaliai pakeitimų dar neužfiksavome.",
    etiqueta: { editorial: "Teisės aktas", dato: "Nauja reikšmė", proximo: "Netrukus", serie: "Automatiškai", revision: "Patikrinimas" },
    rige: (fecha) => `Galioja nuo ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Galioja nuo ${desde} iki ${hasta}`,
    antes: (valor, fecha) => `Anksčiau: ${valor} (${fecha})`,
    revisados: (n) => `Su oficialiu šaltiniu palyginta: ${pluralLt(n, "reikšmė", "reikšmės", "reikšmių")}`,
    revisadosTexto: (organismos) => `Galiojančios reikšmės, patvirtintos šaltiniuose: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Rodyti reikšmę" : `Rodyti (${pluralLt(n, "reikšmė", "reikšmės", "reikšmių")})`),
    calculadoras: "Naudoja",
    rango: (min, max, zonas) => `nuo ${min} iki ${max} pagal regioną (${pluralLt(zonas, "regionas", "regionai", "regionų")})`,
    tabla: (filas) => `lentelė: ${pluralLt(filas, "intervalas", "intervalai", "intervalų")}`,
    valores: (n) => pluralLt(n, "reikšmė", "reikšmės", "reikšmių"),
    pasosTitulo: "Kaip duomenys išlieka naujausi",
    pasos: [
      { titulo: "Institucija paskelbia", texto: "Oficialiame šaltinyje atsiranda teisės aktas, indeksas arba valiutos kursas." },
      { titulo: "Patikrinimas prieš naudojant", texto: "Indeksai ir kursai ateina automatiškai, o mes tikriname jų ribas. Teisės aktus įvedame rankiniu būdu, turėdami prieš akis oficialų dokumentą." },
      { titulo: "Skaičiuoklės atnaujinamos", texto: "Skaičiuoklės pereina prie naujos reikšmės, o pakeitimas čia įrašomas kartu su šaltiniu." },
    ],
    feedTitulo: (pais) => `Naujienos ${g.para(pais)} CalcularYa svetainėje`,
    feedSubtitulo: (pais) => `Oficialių duomenų, kuriuos naudoja skaičiuoklės ${g.para(pais)}, pakeitimai, su įsigaliojimo datomis ir šaltiniais.`,
  },
};

export const lt: Diccionario<TextosInicio> = { base };
