import { GRAMATICA } from "../gramatica";
import { formaSk, pluralSk } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.sk;

// Eslovaco (ADR 0002, D25): vykanie con vy en minúscula; el país se declina con GRAMATICA.sk y los
// números con pluralSk (one/few/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Ste ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} s platnými oficiálnymi hodnotami.`,
    ultimoDato: "Posledná načítaná hodnota",
    ir: (pais) => `Prejsť na kalkulačky ${g.para(pais)}`,
    otro: "Vybrať inú krajinu",
    argentina: "Vaše kalkulačky nájdete na calcular.ar, s oficiálnymi údajmi Argentíny.",
    argentinaIr: "Prejsť na calcular.ar",
    neutroTitulo: (paises) => `${pluralSk(paises, "krajina", "krajiny", "krajín")}, každá s vlastnými zákonmi a vlastnou menou`,
    neutroTexto: "Oficiálne zdroje kontrolujeme každý deň.",
    neutroIr: "Zobraziť krajiny",
  },
  selector: {
    buscar: "Nájdite krajinu",
    sinResultados: (q) => `Žiadna krajina nezodpovedá hľadaniu „${q}“`,
    ubicacion: "Vaša súčasná poloha",
    mismaCalculadora: "Rovnaká kalkulačka",
    paises: "Krajiny",
  },
  aviso: { mismaCalculadora: (pais) => `Vypočítajte s údajmi ${g.de(pais)}` },
  vivo: {
    titulo: "Oficiálne údaje, ktoré sa aktualizujú automaticky",
    vigilado: "Automatický proces každý deň kontroluje oficiálne zdroje. Zmeny predpisov sa objavia po tom, ako ich overíme.",
    sinVigilar: "Každá hodnota má oficiálny zdroj a dátum, kedy sme ju overili.",
    verificado: "Posledná kontrola predpisov",
    automatico: "Posledná automatická hodnota",
    fuentes: "Oficiálne zdroje",
    nFuentes: (n) => pluralSk(n, "oficiálny dokument", "oficiálne dokumenty", "oficiálnych dokumentov"),
    verFuentes: "Zobraziť zdroje",
    verNovedades: "Zobraziť novinky",
    hoy: "dnes",
    ayer: "včera",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Údaje porovnané s oficiálnym zdrojom ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: aktualizované ${cuando}, poslednú hodnotu zverejnil úrad ${organismo}.`,
    diario: "Oficiálne zdroje automaticky kontrolujeme každý deň.",
    actualizado: "Aktualizované",
  },
  novedades: {
    pildora: "Novinky",
    titulo: (pais) => `Čo sa zmenilo v oficiálnych údajoch ${g.para(pais)}`,
    acento: "v deň zmeny",
    bajada: "Tu zapisujeme každú novú hodnotu, ktorá sa dostane do kalkulačiek: čo sa zmenilo, odkedy platí a odkiaľ pochádza.",
    ultimoCambio: "Posledná zmena",
    revision: "Kontrola zdrojov",
    diaria: "Každý deň",
    porNorma: "S každým novým predpisom",
    siguiendo: "Zdroje, ktoré sledujeme",
    masOrganismos: (n) => `a ${n} ${formaSk(n, "ďalší", "ďalšie", "ďalších")}`,
    proximos: "Zverejnené, čoskoro začne platiť",
    proximosTexto: "Oficiálne hodnoty, ktoré už máme načítané a ktoré začnú platiť v nasledujúcich dňoch.",
    registro: "Záznam zmien",
    rss: "Sledovať cez RSS",
    vacio: "Pre túto krajinu sme zatiaľ nezaznamenali žiadne zmeny.",
    etiqueta: { editorial: "Predpis", dato: "Nová hodnota", proximo: "Čoskoro", serie: "Automaticky", revision: "Kontrola" },
    rige: (fecha) => `Platí od ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Platí od ${desde} do ${hasta}`,
    antes: (valor, fecha) => `Predtým: ${valor} (${fecha})`,
    revisados: (n) => `S oficiálnym zdrojom sme porovnali ${pluralSk(n, "hodnotu", "hodnoty", "hodnôt")}`,
    revisadosTexto: (organismos) => `Platné hodnoty potvrdené v zdrojoch: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Zobraziť hodnotu" : `Zobraziť ${pluralSk(n, "hodnotu", "hodnoty", "hodnôt")}`),
    calculadoras: "Používajú",
    rango: (min, max, zonas) => `od ${min} do ${max} podľa kraja (${pluralSk(zonas, "kraj", "kraje", "krajov")})`,
    tabla: (filas) => `tabuľka: ${pluralSk(filas, "pásmo", "pásma", "pásiem")}`,
    valores: (n) => `${n} ${formaSk(n, "hodnota", "hodnoty", "hodnôt")}`,
    pasosTitulo: "Ako údaje zostávajú aktuálne",
    pasos: [
      { titulo: "Úrad zverejní", texto: "V oficiálnom zdroji sa objaví predpis, index alebo kurz meny." },
      { titulo: "Kontrola pred použitím", texto: "Indexy a kurzy prichádzajú automaticky a kontrolujeme ich limity. Predpisy zadávame ručne, s oficiálnym dokumentom pred sebou." },
      { titulo: "Kalkulačky sa aktualizujú", texto: "Kalkulačky prejdú na novú hodnotu a zmena sa tu zapíše aj so zdrojom." },
    ],
    feedTitulo: (pais) => `Novinky ${g.para(pais)} na CalcularYa`,
    feedSubtitulo: (pais) => `Zmeny oficiálnych údajov, ktoré používajú kalkulačky ${g.para(pais)}, s dátumami účinnosti a zdrojmi.`,
  },
};

export const sk: Diccionario<TextosInicio> = { base };
