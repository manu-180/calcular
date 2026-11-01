import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosSl: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "prag-rentabilnosti",
  ui: () => ({
    fijos: "Fiksni stroški na mesec",
    fijosAyuda: "Kar plačate tudi, ko ničesar ne prodate: najemnina, fiksne plače, režijski stroški, programska oprema.",
    precio: "Prodajna cena na enoto",
    variable: "Spremenljivi strošek na enoto",
    variableAyuda: "Koliko vas stane vsaka prodana enota: material, blago, provizije, dostava.",
    objetivo: "Ciljni dobiček na mesec (ni obvezno)",
    objetivoAyuda: "Da vidite, koliko morate prodati nad pokritjem stroškov.",
    unidades: "Število enot do praga rentabilnosti",
    facturacion: "Prihodki na pragu rentabilnosti",
    contribucion: "Prispevek za kritje na enoto",
    contribucionAyuda: "Koliko vsaka prodaja pusti za fiksne stroške: cena minus spremenljivi strošek.",
    contribucionPct: "Stopnja prispevka za kritje (%)",
    unidadesObjetivo: "Število enot za ciljni dobiček",
    facturacionObjetivo: "Prihodki za ciljni dobiček",
    errorPrecio: "Vnesite prodajno ceno ene enote.",
    errorMargen:
      "Spremenljivi strošek je enak ceni ali višji od nje: pri vsaki prodaji izgubite in praga rentabilnosti nikoli ne boste dosegli. Preverite ceno ali stroške.",
    observacionRedondeo: "Število enot se zaokroži navzgor, ker dela enote ni mogoče prodati.",
  }),
};
