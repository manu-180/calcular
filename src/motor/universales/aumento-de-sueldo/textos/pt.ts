import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosPt: TextosUi<UiAumentoDeSueldo> = {
  slug: "aumento-salarial",
  ui: () => ({
    sueldo: "Salário mensal atual",
    sueldoAyuda: "Bruto ou líquido, como preferir. O resultado usa a mesma base.",
    aumentoPorcentaje: "Aumento (%)",
    aumentoMonto: "Aumento em valor (opcional)",
    aumentoMontoAyuda: "Se o seu aumento é um valor fixo, coloque aqui. Ele vale no lugar da porcentagem.",
    inflacion: "Inflação do período (%, opcional)",
    inflacionAyuda: "A inflação desde o seu último aumento, para ver se o salário compra mais ou menos que antes.",
    sueldosAnio: "Salários por ano",
    sueldosAnioAyuda: "12 se você recebe só o salário do mês. 13 ou 14 se também recebe salários extras no ano.",
    nuevo: "Novo salário mensal",
    diferenciaMensual: "Diferença por mês",
    diferenciaAnual: "Diferença por ano",
    porcentaje: "Aumento em porcentagem",
    real: "Aumento real (descontada a inflação)",
    realAyuda: "Quanto a mais o novo salário compra em relação ao anterior.",
    errorSueldo: "Coloque o seu salário atual.",
    errorSinAumento: "Coloque o aumento em porcentagem ou em valor.",
    observacionGana: (puntos) => `Você ganhou da inflação: o seu salário compra ${puntos}% a mais que antes.`,
    observacionPierde: (puntos) => `O aumento ficou abaixo da inflação: o seu salário compra ${puntos}% a menos que antes.`,
    observacionIgual: "O aumento empatou com a inflação: o seu salário compra o mesmo que antes.",
  }),
};
