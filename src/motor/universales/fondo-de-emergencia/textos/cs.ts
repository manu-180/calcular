import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosCs: TextosUi<UiFondoDeEmergencia> = {
  slug: "financni-rezerva",
  ui: () => ({
    gastos: "Nezbytné měsíční výdaje",
    gastosAyuda: "To, co nemůžete přestat platit: bydlení, jídlo, energie, doprava, zdraví a splátky úvěrů.",
    meses: "Na kolik měsíců výdajů",
    mesesAyuda: "Při stabilním příjmu 3 až 6 měsíců. Víc, pokud příjem kolísá nebo má domácnost jen jeden příjem.",
    actual: "Kolik už máte naspořeno (nepovinné)",
    aporte: "Kolik můžete měsíčně odkládat (nepovinné)",
    meta: "Doporučená finanční rezerva",
    falta: "Zbývá naspořit",
    mesesParaLlegar: "Měsíců do cílové částky",
    cobertura: "Na kolik měsíců vám dnes úspory vystačí",
    errorGastos: "Zadejte své nezbytné měsíční výdaje.",
    yaCubierto: "Vaši finanční rezervu už máte. Co budete odkládat dál, můžete věnovat jiným cílům.",
    sinAporte: "Zadejte, kolik můžete měsíčně odkládat, a ukážeme vám, jak dlouho to potrvá.",
    observacionDonde: "Mějte tyto peníze na samostatném účtu, ze kterého je můžete vybrat ještě týž den a kde neztrácejí hodnotu, například na spořicím účtu.",
  }),
};
