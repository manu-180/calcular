import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litros" : "galões");

const base: TextosUi<UiPintura> = {
  slug: "calculadora-de-tinta",
  ui: () => ({
    modo: "Que medidas você tem?",
    modoMedidas: "Comprimento e altura das paredes",
    modoSuperficie: "A área total",
    largo: (u) => `Comprimento total das paredes (${u})`,
    largoAyuda: "Todas as paredes que vai pintar, somadas. Num cômodo, o perímetro.",
    alto: (u) => `Altura da parede (${u})`,
    superficie: (u) => `Área a pintar (${u})`,
    aberturas: (u) => `Portas e janelas a descontar (${u})`,
    aberturasAyuda: "Uma porta tem cerca de 2 m² (21 ft²) e uma janela comum de 1 a 2 m².",
    manos: "Número de demãos",
    rendimiento: (u) => `Rendimento da tinta (${u})`,
    rendimientoAyuda: "Está na lata: quanta área cobre por demão. Se não souber, deixe o valor sugerido.",
    recomendado: (u) => `Tinta para comprar (${volumen(u)})`,
    recomendadoAyuda: "Inclui 10% a mais para retoques e o que fica no rolo.",
    necesario: (u) => `Quantidade exata (${volumen(u)})`,
    neta: (u) => `Área a pintar (${u})`,
    errorMedidas: "Preencha o comprimento e a altura das paredes.",
    errorSuperficie: "Preencha a área a pintar.",
    errorAberturas: "As portas e janelas não podem ocupar a parede inteira.",
    errorRendimiento: "O rendimento tem que ser maior que 0.",
  }),
};

const portugal = (): Partial<UiPintura> => ({
  modo: "Que medidas tem?",
  largoAyuda: "Todas as paredes que vai pintar, somadas. Numa divisão, o perímetro.",
  errorRendimiento: "O rendimento tem de ser maior do que 0.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
