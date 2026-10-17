import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosEn: TextosUi<UiHormigon> = {
  slug: "concrete-calculator",
  ui: () => ({
    largo: (u) => `Length (${u})`,
    ancho: (u) => `Width (${u})`,
    espesor: (u) => `Thickness (${u})`,
    espesorAyuda: "A patio or path is usually 4 in (10 cm). A driveway, 5 to 6 in.",
    margen: "Extra margin (%)",
    margenAyuda: "For uneven ground and spillage. 5% to 10% is typical.",
    bolsa: (u) => `Cement bag weight (${u})`,
    volumen: (u) => `Exact volume (${u})`,
    volumenTotal: (u) => `Concrete needed (${u})`,
    volumenPies: "Concrete needed (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Bags of cement",
    arena: (u) => `Sand (${u})`,
    piedra: (u) => `Gravel (${u})`,
    agua: (u) => (u === "L" ? "Water (litres)" : "Water (gallons)"),
    errorMedida: "This measurement has to be more than 0.",
    aviso: "Materials are a guide for a general-purpose 1:2:3 mix (about 350 kg of cement per m³). They change with the mix design, the job and local materials: check them with whoever is running the job.",
  }),
};
