import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosSr: TextosUi<UiDividirGastos> = {
  slug: "podela-racuna",
  ui: () => ({
    persona: (n) => `Osoba ${n}`,
    personaAyuda: "Unesite koliko je ko platio. Ako neko nije platio ništa, a deli trošak, unesite 0. Ostala polja ostavite prazna.",
    total: "Ukupan trošak",
    personas: "Broj osoba",
    cuota: "Deo po osobi",
    transferencias: "Uplate za poravnanje",
    tabla: "Ko kome plaća",
    colDe: "Plaća",
    colPara: "Prima",
    colMonto: "Iznos",
    errorPocas: "Da bi trošak mogao da se podeli, unesite najmanje dve osobe.",
    aMano: "Niko nikome ništa ne duguje: svi su platili isto.",
  }),
};
