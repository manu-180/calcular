import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosBs: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "tacka-pokrica",
  ui: () => ({
    fijos: "Fiksni troškovi mjesečno",
    fijosAyuda: "Ono što plaćate i kada ništa ne prodate: najam, fiksne plate, režije, softver.",
    precio: "Prodajna cijena po komadu",
    variable: "Varijabilni trošak po komadu",
    variableAyuda: "Koliko vas košta svaki prodani komad: materijal, roba, provizije, dostava.",
    objetivo: "Ciljana dobit mjesečno (nije obavezno)",
    objetivoAyuda: "Da vidite koliko trebate prodati iznad pokrića troškova.",
    unidades: "Komada do tačke pokrića",
    facturacion: "Prihod na tački pokrića",
    contribucion: "Marža pokrića po komadu",
    contribucionAyuda: "Koliko svaka prodaja ostavlja za fiksne troškove: cijena minus varijabilni trošak.",
    contribucionPct: "Marža pokrića (%)",
    unidadesObjetivo: "Komada za ciljanu dobit",
    facturacionObjetivo: "Prihod za ciljanu dobit",
    errorPrecio: "Unesite prodajnu cijenu jednog komada.",
    errorMargen:
      "Varijabilni trošak jednak je cijeni ili veći od nje: na svakoj prodaji gubite i tačku pokrića nikada nećete dostignuti. Provjerite cijenu ili troškove.",
    observacionRedondeo: "Broj komada zaokružuje se naviše, jer se dio komada ne može prodati.",
  }),
};
