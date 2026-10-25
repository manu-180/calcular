import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosRo: TextosUi<UiMargenDeGanancia> = {
  slug: "calculator-adaos-comercial",
  ui: () => ({
    modo: "Ce doriți să calculați?",
    modoPrecio: "Marja și adaosul, din cost și preț",
    modoMargen: "Prețul pentru o marjă dorită",
    modoMarkup: "Prețul pentru un adaos comercial dorit",
    costo: "Cost de achiziție pe bucată",
    costoAyuda: "Cât vă costă să cumpărați sau să produceți o bucată, fără TVA colectată de la client.",
    precio: "Preț de vânzare",
    precioAyuda: "Doar dacă vreți să aflați marja. Fără TVA.",
    objetivo: "Marja sau adaosul dorit (%)",
    objetivoAyuda: "Doar dacă vreți să aflați prețul.",
    precioResultado: "Preț de vânzare",
    margen: "Marjă de profit",
    margenAyuda: "Profitul ca procent din prețul de vânzare.",
    markup: "Adaos comercial",
    markupAyuda: "Profitul ca procent din cost.",
    ganancia: "Profit pe bucată",
    errorCosto: "Introduceți costul unei bucăți.",
    errorFaltaPrecio: "Introduceți prețul de vânzare ca să aflați marja.",
    errorFaltaObjetivo: "Introduceți marja sau adaosul pe care îl urmăriți.",
    errorMargen100: "Marja trebuie să fie sub 100%: altfel tot prețul ar fi profit, fără niciun cost.",
    observacionPerdida: "La acest preț vindeți sub cost: pierdeți bani la fiecare vânzare.",
  }),
};
