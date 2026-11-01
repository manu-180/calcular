import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosBs: TextosUi<UiDividirGastos> = {
  slug: "podjela-racuna",
  ui: () => ({
    persona: (n) => `Osoba ${n}`,
    personaAyuda: "Unesite koliko je ko platio. Ako neko nije platio ništa, a dijeli trošak, unesite 0. Ostala polja ostavite prazna.",
    total: "Ukupan trošak",
    personas: "Broj osoba",
    cuota: "Dio po osobi",
    transferencias: "Uplate za poravnanje",
    tabla: "Ko kome plaća",
    colDe: "Plaća",
    colPara: "Prima",
    colMonto: "Iznos",
    errorPocas: "Da bi se trošak mogao podijeliti, unesite najmanje dvije osobe.",
    aMano: "Niko nikome ništa ne duguje: svi su platili isto.",
  }),
};
