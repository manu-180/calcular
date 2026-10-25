import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const objetosc = (u: string) => (u === "L" ? "litry" : "galony");

export const textosPl: TextosUi<UiPintura> = {
  slug: "kalkulator-farby",
  ui: () => ({
    modo: "Jakie wymiary znasz?",
    modoMedidas: "Długość i wysokość ścian",
    modoSuperficie: "Łączną powierzchnię",
    largo: (u) => `Łączna długość ścian (${u})`,
    largoAyuda: "Suma wszystkich ścian do malowania. W pokoju to obwód.",
    alto: (u) => `Wysokość ścian (${u})`,
    superficie: (u) => `Powierzchnia do malowania (${u})`,
    aberturas: (u) => `Drzwi i okna do odjęcia (${u})`,
    aberturasAyuda: "Drzwi to około 2 m² (21 ft²), a typowe okno od 1 do 2 m².",
    manos: "Liczba warstw",
    rendimiento: (u) => `Wydajność farby (${u})`,
    rendimientoAyuda: "Znajdziesz ją na puszce: ile powierzchni pokrywa przy jednej warstwie. Jeśli nie wiesz, zostaw podaną wartość.",
    recomendado: (u) => `Farba do kupienia (${objetosc(u)})`,
    recomendadoAyuda: "Zawiera 10% zapasu na poprawki i to, co zostaje na wałku.",
    necesario: (u) => `Dokładna ilość (${objetosc(u)})`,
    neta: (u) => `Powierzchnia do malowania (${u})`,
    errorMedidas: "Wpisz długość i wysokość ścian.",
    errorSuperficie: "Wpisz powierzchnię do malowania.",
    errorAberturas: "Drzwi i okna nie mogą zajmować całej ściany.",
    errorRendimiento: "Wydajność musi być większa od 0.",
  }),
};
