import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosBs: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-marze",
  ui: () => ({
    modo: "Šta želite izračunati?",
    modoPrecio: "Maržu iz troška i prodajne cijene",
    modoMargen: "Prodajnu cijenu za željenu maržu",
    modoMarkup: "Prodajnu cijenu za željeni markup",
    costo: "Trošak po komadu",
    costoAyuda: "Koliko vas košta nabavka ili proizvodnja jednog komada, bez PDV-a koji prenosite na kupca.",
    precio: "Prodajna cijena",
    precioAyuda: "Samo ako računate maržu. Bez PDV-a.",
    objetivo: "Željena marža ili markup (%)",
    objetivoAyuda: "Samo ako računate prodajnu cijenu.",
    precioResultado: "Prodajna cijena",
    margen: "Marža",
    margenAyuda: "Dobit kao procenat prodajne cijene.",
    markup: "Markup",
    markupAyuda: "Dobit kao procenat troška.",
    ganancia: "Dobit po komadu",
    errorCosto: "Unesite trošak jednog komada.",
    errorFaltaPrecio: "Za izračun marže unesite prodajnu cijenu.",
    errorFaltaObjetivo: "Unesite maržu ili markup koji želite postići.",
    errorMargen100: "Marža mora biti manja od 100 %: to bi značilo da je cijela cijena dobit, bez ikakvog troška.",
    observacionPerdida: "Po ovoj cijeni prodajete ispod troška: na svakoj prodaji gubite.",
  }),
};
