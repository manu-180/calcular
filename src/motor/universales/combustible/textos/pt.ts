import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

const base: TextosUi<UiCombustible> = {
  slug: "calculadora-de-combustivel",
  ui: () => ({
    distancia: (u) => `Distância da viagem (${u})`,
    idaYVuelta: "Ida e volta",
    tipoConsumo: "Como o consumo é medido",
    l100: "Litros a cada 100 km",
    kml: "Quilômetros por litro",
    consumo: "Consumo",
    consumoMpg: "Consumo (milhas por galão)",
    consumoAyuda: "Veja no manual ou no computador de bordo. Na estrada o carro costuma gastar menos que na cidade.",
    precio: (u) => (u === "L" ? "Preço do litro" : "Preço do galão"),
    personas: "Pessoas que dividem o gasto",
    costo: "Gasto com combustível",
    porPersona: "Por pessoa",
    combustible: (u) => (u === "L" ? "Combustível necessário (litros)" : "Combustível necessário (galões)"),
    distanciaTotal: (u) => `Distância total (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Custo por milha" : `Custo por ${u}`),
    errorConsumo: "O consumo tem que ser maior que 0.",
    errorPersonas: "Precisa haver pelo menos uma pessoa.",
  }),
};

const portugal = (): Partial<UiCombustible> => ({
  l100: "Litros aos 100 km",
  kml: "Quilómetros por litro",
  consumoAyuda: "Veja no manual ou no computador de bordo. Em estrada o carro costuma gastar menos do que na cidade.",
  personas: "Pessoas que dividem a despesa",
  errorConsumo: "O consumo tem de ser maior do que 0.",
  errorPersonas: "Tem de haver pelo menos uma pessoa.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
