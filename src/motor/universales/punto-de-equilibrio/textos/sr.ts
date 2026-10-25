import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosSr: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "prag-rentabilnosti",
  ui: () => ({
    fijos: "Fiksni troškovi mesečno",
    fijosAyuda: "Ono što plaćate i kada ništa ne prodate: zakup, fiksne plate, režije, softver.",
    precio: "Prodajna cena po komadu",
    variable: "Varijabilni trošak po komadu",
    variableAyuda: "Koliko vas košta svaki prodati komad: materijal, roba, provizije, dostava.",
    objetivo: "Ciljna dobit mesečno (nije obavezno)",
    objetivoAyuda: "Da vidite koliko treba prodati preko pokrića troškova.",
    unidades: "Komada do praga rentabilnosti",
    facturacion: "Prihod na pragu rentabilnosti",
    contribucion: "Marža pokrića po komadu",
    contribucionAyuda: "Koliko svaka prodaja ostavlja za fiksne troškove: cena minus varijabilni trošak.",
    contribucionPct: "Marža pokrića (%)",
    unidadesObjetivo: "Komada za ciljnu dobit",
    facturacionObjetivo: "Prihod za ciljnu dobit",
    errorPrecio: "Unesite prodajnu cenu jednog komada.",
    errorMargen:
      "Varijabilni trošak je jednak ceni ili veći od nje: na svakoj prodaji gubite i prag rentabilnosti nikada ne dostižete. Proverite cenu ili troškove.",
    observacionRedondeo: "Broj komada se zaokružuje naviše, jer se deo komada ne može prodati.",
  }),
};
