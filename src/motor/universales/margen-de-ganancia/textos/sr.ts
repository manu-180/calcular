import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosSr: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-marze",
  ui: () => ({
    modo: "Šta želite da izračunate?",
    modoPrecio: "Maržu iz troška i prodajne cene",
    modoMargen: "Prodajnu cenu za željenu maržu",
    modoMarkup: "Prodajnu cenu za željenu nacenu",
    costo: "Trošak po komadu",
    costoAyuda: "Koliko vas košta nabavka ili proizvodnja jednog komada, bez PDV-a koji prenosite na kupca.",
    precio: "Prodajna cena",
    precioAyuda: "Samo ako računate maržu. Bez PDV-a.",
    objetivo: "Željena marža ili nacena (%)",
    objetivoAyuda: "Samo ako računate prodajnu cenu.",
    precioResultado: "Prodajna cena",
    margen: "Marža",
    margenAyuda: "Zarada u procentima od prodajne cene.",
    markup: "Nacena",
    markupAyuda: "Zarada u procentima od troška.",
    ganancia: "Zarada po komadu",
    errorCosto: "Unesite trošak jednog komada.",
    errorFaltaPrecio: "Za obračun marže unesite prodajnu cenu.",
    errorFaltaObjetivo: "Unesite maržu ili nacenu koju želite da postignete.",
    errorMargen100: "Marža mora biti manja od 100%: to bi značilo da je cela cena zarada, bez ikakvog troška.",
    observacionPerdida: "Po ovoj ceni prodajete ispod troška: na svakoj prodaji gubite.",
  }),
};
