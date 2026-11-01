import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosPl: TextosUi<UiPresupuesto> = {
  slug: "kalkulator-budzetu-domowego",
  ui: () => ({
    ingreso: "Miesięczny dochód netto",
    ingresoAyuda: "To, co co miesiąc wpływa na twoje konto, po podatkach i składkach.",
    pctNecesidades: "Potrzeby (%)",
    pctNecesidadesAyuda: "Mieszkanie, zakupy spożywcze, rachunki, dojazdy, zdrowie i minimalne raty kredytów.",
    pctGustos: "Przyjemności (%)",
    pctGustosAyuda: "Jedzenie na mieście, zakupy, które nie są konieczne, subskrypcje, wyjazdy.",
    pctAhorro: "Oszczędności (%)",
    pctAhorroAyuda: "Poduszka finansowa, cele, emerytura i nadpłaty długów.",
    necesidades: "Na potrzeby",
    gustos: "Na przyjemności",
    ahorro: "Na oszczędności",
    ahorroAnual: "Oszczędności w ciągu roku",
    errorIngreso: "Wpisz swój miesięczny dochód.",
    errorSuma: (suma) => `Trzy procenty dają razem ${suma}%. Muszą się sumować do 100%.`,
    observacionAhorroBajo: "Odkładanie mniej niż 10% zostawia mało miejsca na niespodzianki. Jeśli możesz, ogranicz trochę przyjemności.",
  }),
};
