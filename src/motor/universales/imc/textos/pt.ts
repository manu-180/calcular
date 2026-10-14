import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosPt: TextosUi<UiImc> = {
  slug: "imc",
  ui: () => ({
    peso: (u) => `Peso (${u})`,
    altura: (u) => `Altura (${u})`,
    pies: "Altura: pés (ft)",
    pulgadas: "Altura: polegadas (in)",
    imc: "Índice de massa corporal (IMC)",
    categoria: "Classificação (OMS)",
    pesoMin: (u) => `Peso saudável a partir de (${u})`,
    pesoMax: (u) => `Peso saudável até (${u})`,
    rangoAyuda: "A faixa de peso que dá um IMC saudável para esta altura.",
    bajo: "Abaixo do peso",
    normal: "Peso normal",
    sobrepeso: "Sobrepeso",
    obesidad1: "Obesidade grau I",
    obesidad2: "Obesidade grau II",
    obesidad3: "Obesidade grau III",
    errorPeso: "O peso tem que ser maior que 0.",
    errorAltura: "A altura tem que ser maior que 0.",
    aviso:
      "O IMC é uma referência geral para adultos: não distingue músculo de gordura e não se aplica da mesma forma na gravidez nem em crianças. Não substitui a consulta com um profissional de saúde.",
  }),
};
