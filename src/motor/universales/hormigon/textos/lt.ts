import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosLt: TextosUi<UiHormigon> = {
  slug: "betono-skaiciuokle",
  ui: () => ({
    largo: (u) => `Ilgis (${u})`,
    ancho: (u) => `Plotis (${u})`,
    espesor: (u) => `Storis (${u})`,
    espesorAyuda: "Terasai ar takui paprastai daroma 10 cm (4 in), įvažiavimui automobiliui nuo 12 iki 15 cm.",
    margen: "Atsarga (%)",
    margenAyuda: "Nelygiam pagrindui ir betono nuostoliams. Paprastai nuo 5 iki 10 %.",
    bolsa: (u) => `Cemento maišo svoris (${u})`,
    volumen: (u) => `Tikslus tūris (${u})`,
    volumenTotal: (u) => `Reikalingas betono kiekis (${u})`,
    volumenPies: "Reikalingas betono kiekis (ft³)",
    cemento: (u) => `Cementas (${u})`,
    bolsas: "Cemento maišai (vnt.)",
    arena: (u) => `Smėlis (${u})`,
    piedra: (u) => `Skalda (${u})`,
    agua: (u) => (u === "L" ? "Vanduo (litrais)" : "Vanduo (galonais)"),
    errorMedida: "Šis matmuo turi būti didesnis už nulį.",
    aviso: "Medžiagų kiekis yra orientacinis, skaičiuojamas įprastam mišiniui 1 : 2 : 3 (apie 350 kg cemento 1 m³). Jis priklauso nuo mišinio proporcijų, darbo pobūdžio ir vietinių medžiagų: pasitikrinkite su statybos vadovu arba konstruktoriumi.",
  }),
};
