import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosIs: TextosUi<UiHormigon> = {
  slug: "steypa",
  ui: () => ({
    largo: (u) => `Lengd (${u})`,
    ancho: (u) => `Breidd (${u})`,
    espesor: (u) => `Þykkt (${u})`,
    espesorAyuda: "Plata undir verönd eða gangstíg er oft 10 cm (4 in). Innkeyrsla 12 til 15 cm.",
    margen: "Aukaskammtur (%)",
    margenAyuda: "Fyrir ójafnt undirlag og rýrnun. Algengt er 5 til 10%.",
    bolsa: (u) => `Þyngd sementspoka (${u})`,
    volumen: (u) => `Nákvæmt rúmmál (${u})`,
    volumenTotal: (u) => `Steypa sem þarf (${u})`,
    volumenPies: "Steypa sem þarf (ft³)",
    cemento: (u) => `Sement (${u})`,
    bolsas: "Sementspokar",
    arena: (u) => `Sandur (${u})`,
    piedra: (u) => `Möl (${u})`,
    agua: (u) => (u === "L" ? "Vatn (lítrar)" : "Vatn (gallon)"),
    errorMedida: "Málið þarf að vera stærra en 0.",
    aviso: "Efnismagnið er viðmið fyrir almenna blöndu 1:2:3 (um 350 kg af sementi á m³). Það breytist eftir uppskrift, verki og efni á hverjum stað. Berðu það undir þann sem stýrir verkinu.",
  }),
};
