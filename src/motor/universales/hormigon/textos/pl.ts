import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosPl: TextosUi<UiHormigon> = {
  slug: "kalkulator-betonu",
  ui: () => ({
    largo: (u) => `Długość (${u})`,
    ancho: (u) => `Szerokość (${u})`,
    espesor: (u) => `Grubość (${u})`,
    espesorAyuda: "Taras albo chodnik ma zwykle 10 cm (4 in). Podjazd dla auta od 12 do 15 cm.",
    margen: "Zapas (%)",
    margenAyuda: "Na nierówności podłoża i straty przy wylewaniu. Zwykle od 5% do 10%.",
    bolsa: (u) => `Waga worka cementu (${u})`,
    volumen: (u) => `Dokładna objętość (${u})`,
    volumenTotal: (u) => `Potrzebny beton (${u})`,
    volumenPies: "Potrzebny beton (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Worki cementu",
    arena: (u) => `Piasek (${u})`,
    piedra: (u) => `Żwir (${u})`,
    agua: (u) => (u === "L" ? "Woda (litry)" : "Woda (galony)"),
    errorMedida: "Ten wymiar musi być większy od 0.",
    aviso: "Ilości materiałów są orientacyjne dla mieszanki ogólnego przeznaczenia 1:2:3 (około 350 kg cementu na m³). Zależą od receptury, rodzaju pracy i lokalnych materiałów: sprawdź je z wykonawcą albo kierownikiem budowy.",
  }),
};
