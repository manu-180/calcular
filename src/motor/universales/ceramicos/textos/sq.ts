import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosSq: TextosUi<UiCeramicos> = {
  slug: "kalkulator-pllaka",
  ui: () => ({
    superficie: (u) => `Sipërfaqja për t'u shtruar (${u})`,
    largo: (u) => `Gjatësia e pllakës (${u})`,
    ancho: (u) => `Gjerësia e pllakës (${u})`,
    desperdicio: "Humbje (%)",
    desperdicioAyuda: "Për prerje dhe pllaka të thyera. Përdorni 10% për shtrim të drejtë dhe 15% për shtrim diagonal.",
    porCaja: "Pllaka në një kuti",
    porCajaAyuda: "Opsionale. Plotësojeni për të parë sa kuti duhen blerë.",
    piezas: "Pllaka të nevojshme",
    cajas: "Kuti për t'u blerë",
    conDesperdicio: (u) => `Sipërfaqja me humbjet (${u})`,
    cubre: (u) => `Sipërfaqja që mbulojnë kutitë (${u})`,
    errorSuperficie: "Sipërfaqja duhet të jetë më e madhe se 0.",
    errorPieza: "Përmasat e pllakës duhet të jenë më të mëdha se 0.",
  }),
};
