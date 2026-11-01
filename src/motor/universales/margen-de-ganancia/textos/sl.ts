import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosSl: TextosUi<UiMargenDeGanancia> = {
  slug: "izracun-marze",
  ui: () => ({
    modo: "Kaj želite izračunati?",
    modoPrecio: "Maržo iz stroška in prodajne cene",
    modoMargen: "Prodajno ceno za želeno maržo",
    modoMarkup: "Prodajno ceno za želeni pribitek",
    costo: "Strošek na kos",
    costoAyuda: "Koliko vas stane nabava ali izdelava enega kosa, brez DDV, ki ga prenesete na kupca.",
    precio: "Prodajna cena",
    precioAyuda: "Samo če računate maržo. Brez DDV.",
    objetivo: "Želena marža ali pribitek (%)",
    objetivoAyuda: "Samo če računate prodajno ceno.",
    precioResultado: "Prodajna cena",
    margen: "Marža",
    margenAyuda: "Dobiček kot odstotek prodajne cene.",
    markup: "Pribitek",
    markupAyuda: "Dobiček kot odstotek stroška.",
    ganancia: "Dobiček na kos",
    errorCosto: "Vnesite strošek enega kosa.",
    errorFaltaPrecio: "Za izračun marže vnesite prodajno ceno.",
    errorFaltaObjetivo: "Vnesite maržo ali pribitek, ki ga želite doseči.",
    errorMargen100: "Marža mora biti manjša od 100 %: to bi pomenilo, da je celotna cena dobiček, brez kakršnega koli stroška.",
    observacionPerdida: "Pri tej ceni prodajate pod stroškom: pri vsaki prodaji izgubite.",
  }),
};
