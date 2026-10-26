import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosPl: TextosUi<UiCostoDeUnAuto> = {
  slug: "kalkulator-kosztow-samochodu",
  ui: () => ({
    precio: "Wartość samochodu",
    precioAyuda: "Cena zakupu albo dzisiejsza wartość, jeśli masz auto od jakiegoś czasu.",
    depreciacion: "Utrata wartości rocznie (%)",
    depreciacionAyuda: "Nowe auto traci od 15% do 25% w pierwszym roku. Używane mniej.",
    cuota: "Miesięczna rata kredytu albo leasingu (opcjonalnie)",
    cuotaAyuda: "Tylko po to, żeby pokazać, ile co miesiąc schodzi z konta. Nie doliczamy jej do realnego kosztu.",
    seguro: "Ubezpieczenie OC i AC miesięcznie",
    distanciaKm: "Kilometry miesięcznie",
    distanciaMi: "Mile miesięcznie",
    consumoL100: "Spalanie (litry na 100 km)",
    consumoMpg: "Spalanie (mile na galon)",
    precioLitro: "Cena paliwa za litr",
    precioGalon: "Cena paliwa za galon",
    mantenimiento: "Serwis i naprawy miesięcznie",
    mantenimientoAyuda: "Przeglądy, opony, naprawy i myjnia, w przeliczeniu na miesiąc.",
    estacionamiento: "Parking miesięcznie (opcjonalnie)",
    otros: "Opłaty, autostrady i inne koszty miesięcznie (opcjonalnie)",
    otrosAyuda: "Badanie techniczne, opłaty za autostrady i mandaty, w przeliczeniu na miesiąc.",
    costoMensual: "Realny koszt miesięcznie",
    costoAnual: "Realny koszt rocznie",
    porKm: "Koszt za kilometr",
    porMilla: "Koszt za milę",
    combustible: "Paliwo miesięcznie",
    depreciacionMensual: "Utrata wartości miesięcznie",
    gastoBolsillo: "Ile co miesiąc schodzi z konta",
    errorConsumo: "Wpisz spalanie auta, żeby policzyć koszt paliwa.",
    observacionCuota:
      "Rata nie wchodzi do realnego kosztu, bo jej część spłaca samo auto, a to już liczymy jako utratę wartości. Odsetki od kredytu to dodatkowy koszt.",
  }),
};
