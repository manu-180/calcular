import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const base: TextosUi<UiHormigon> = {
  slug: "calculadora-de-concreto",
  ui: () => ({
    largo: (u) => `Comprimento (${u})`,
    ancho: (u) => `Largura (${u})`,
    espesor: (u) => `Espessura (${u})`,
    espesorAyuda: "Um piso de quintal ou de pátio costuma ter 10 cm (4 in). Uma entrada de garagem, de 12 a 15 cm.",
    margen: "Margem extra (%)",
    margenAyuda: "Para desníveis do terreno e perdas. O comum é de 5% a 10%.",
    bolsa: (u) => `Peso do saco de cimento (${u})`,
    volumen: (u) => `Volume exato (${u})`,
    volumenTotal: (u) => `Volume necessário (${u})`,
    volumenPies: "Volume necessário (ft³)",
    cemento: (u) => `Cimento (${u})`,
    bolsas: "Sacos de cimento",
    arena: (u) => `Areia (${u})`,
    piedra: (u) => `Brita (${u})`,
    agua: (u) => (u === "L" ? "Água (litros)" : "Água (galões)"),
    errorMedida: "Esta medida tem que ser maior que 0.",
    aviso: "Os materiais são uma referência para um traço de uso geral 1:2:3 (cerca de 350 kg de cimento por m³). Mudam conforme o traço, a obra e os materiais da região: confirme com quem conduz a obra.",
  }),
};

const portugal = (): Partial<UiHormigon> => ({
  espesorAyuda: "Um pavimento de pátio ou de quintal costuma ter 10 cm. Uma entrada de garagem, de 12 a 15 cm.",
  margenAyuda: "Para desníveis do terreno e perdas. O habitual é de 5% a 10%.",
  volumen: (u) => `Volume exato de betão (${u})`,
  volumenTotal: (u) => `Betão necessário (${u})`,
  errorMedida: "Esta medida tem de ser maior do que 0.",
  aviso: "Os materiais são uma referência para uma dosagem de uso geral 1:2:3 (cerca de 350 kg de cimento por m³). Mudam conforme a dosagem, a obra e os materiais da região: confirme com quem dirige a obra.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
