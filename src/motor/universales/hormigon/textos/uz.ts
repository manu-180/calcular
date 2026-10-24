import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosUz: TextosUi<UiHormigon> = {
  slug: "beton-kalkulyatori",
  ui: () => ({
    largo: (u) => `Uzunlik (${u})`,
    ancho: (u) => `Eni (${u})`,
    espesor: (u) => `Qalinlik (${u})`,
    espesorAyuda: "Hovli yoki yoʻlak uchun odatda 10 cm (4 in). Mashina kiradigan joy uchun 12 yoki 15 cm.",
    margen: "Qoʻshimcha zaxira (%)",
    margenAyuda: "Notekis zamin va toʻkilib ketadigan qorishma uchun. Odatda 5% yoki 10%.",
    bolsa: (u) => `Sement qopi ogʻirligi (${u})`,
    volumen: (u) => `Aniq hajm (${u})`,
    volumenTotal: (u) => `Kerakli beton (${u})`,
    volumenPies: "Kerakli beton (ft³)",
    cemento: (u) => `Sement (${u})`,
    bolsas: "Sement qoplari soni",
    arena: (u) => `Qum (${u})`,
    piedra: (u) => `Shagʻal (${u})`,
    agua: (u) => (u === "L" ? "Suv (litr)" : "Suv (gallon)"),
    errorMedida: "Bu oʻlcham noldan katta boʻlishi kerak.",
    aviso: "Materiallar umumiy maqsadli 1:2:3 tarkib boʻyicha taxminiy (1 m³ uchun taxminan 350 kg sement). Ular tarkib, ish turi va mahalliy materiallarga qarab oʻzgaradi: ish rahbari bilan aniqlashtiring.",
  }),
};
