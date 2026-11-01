import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// Tras «po» el lituano pide genitivo para cualquier número («po 1 metų», «po 3 metų», «po 10 metų»),
// por eso estas frases no necesitan pluralLt.
export const textosLt: TextosUi<UiAlquilarOComprar> = {
  slug: "nuoma-ar-pirkimas",
  ui: () => ({
    precio: "Būsto kaina",
    entrada: "Pradinis įnašas (% kainos)",
    gastosCompra: "Pirkimo išlaidos (% kainos)",
    gastosCompraAyuda: "Turto vertinimas, paskolos mokesčiai, notaras, registracija ir nekilnojamojo turto agento komisiniai.",
    tasa: "Būsto paskolos metinė palūkanų norma (%)",
    aniosHipoteca: "Paskolos terminas (metais)",
    alquiler: "Panašaus būsto mėnesinė nuoma",
    aumentoAlquiler: "Metinis nuomos kainos augimas (%)",
    gastosPropietario: "Metinės savininko išlaidos (% kainos)",
    gastosPropietarioAyuda: "Remontas ir priežiūra, nekilnojamojo turto mokestis, būsto draudimas. Paprastai nuo 1 iki 2 %.",
    revalorizacion: "Metinis būsto kainos augimas (%)",
    rendimiento: "Alternatyvių investicijų grąža (% per metus)",
    rendimientoAyuda: "Kiek uždirbtumėte, jei pradinį įnašą investuotumėte, o ne pirktumėte būstą.",
    horizonte: "Po kiek metų palyginti",
    veredicto: "Rezultatas",
    patrimonioComprar: "Jūsų turtas pabaigoje, jei perkate",
    patrimonioAlquilar: "Jūsų turtas pabaigoje, jei nuomojatės",
    diferencia: "Skirtumas",
    anioDesde: "Metai, nuo kurių naudingiau pirkti",
    pagadoAlquilando: "Iš viso sumokėta už nuomą",
    pagadoComprando: "Iš viso sumokėta už paskolą ir priežiūrą",
    tabla: "Palyginimas pagal metus",
    colAnio: "Metai",
    colComprar: "Pirkimas",
    colAlquilar: "Nuoma",
    colDiferencia: "Skirtumas",
    errorPrecio: "Įveskite būsto kainą.",
    errorAlquiler: "Įveskite, kiek kainuotų panašaus būsto nuoma.",
    convieneComprar: (anios, diferencia) => `Naudingiau pirkti: po ${anios} metų turėsite ${diferencia} daugiau.`,
    convieneAlquilar: (anios, diferencia) => `Naudingiau nuomotis: po ${anios} metų turėsite ${diferencia} daugiau.`,
    empate: (anios) => `Po ${anios} metų abu variantai duoda tą patį rezultatą.`,
    observacionDesde: (anio) => `Nuo ${anio} metų pirkimas aplenkia nuomą ir vėliau išlieka naudingesnis.`,
    observacionMetodo:
      "Lyginama, ką turėsite kiekvienu atveju. Nuomojantis pradinis įnašas ir tai, ką sutaupote kas mėnesį, lieka investuota. Vėlesnio būsto pardavimo išlaidos neatimamos.",
  }),
};
