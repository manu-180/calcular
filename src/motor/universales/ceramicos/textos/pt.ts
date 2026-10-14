import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosPt: TextosUi<UiCeramicos> = {
  slug: "calculadora-de-piso",
  ui: () => ({
    superficie: (u) => `Área a revestir (${u})`,
    largo: (u) => `Comprimento da peça (${u})`,
    ancho: (u) => `Largura da peça (${u})`,
    desperdicio: "Margem de perda (%)",
    desperdicioAyuda: "Para cortes e quebras. Use 10% para assentamento reto e 15% para diagonal.",
    porCaja: "Peças por caixa",
    porCajaAyuda: "Opcional. Preencha para ver quantas caixas comprar.",
    piezas: "Peças necessárias",
    cajas: "Caixas para comprar",
    conDesperdicio: (u) => `Área com a perda (${u})`,
    cubre: (u) => `Área que as caixas cobrem (${u})`,
    errorSuperficie: "A área tem que ser maior que 0.",
    errorPieza: "As medidas da peça têm que ser maiores que 0.",
  }),
};
