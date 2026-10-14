import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora de gorjeta",
    title: tituloQueEntre(`Calculadora de gorjeta (${ctx.nombrePais})`, "Calculadora de gorjeta"),
    description: "Calcule a gorjeta, o total da conta e quanto cada pessoa paga ao dividir. Dá para arredondar a parte de cada um para cima.",
    intro: [
      "Coloque o valor da conta, a porcentagem da gorjeta e quantas pessoas vão pagar. Você vê a gorjeta, o total e a parte de cada um.",
      "Se preferir valores redondos, a calculadora arredonda cada parte para cima e a diferença vai para a gorjeta.",
    ],
    comoSeCalcula: ["Gorjeta = conta × porcentagem da gorjeta ÷ 100.", "Total = conta + gorjeta.", "A parte de cada um é o total dividido pelo número de pessoas."],
    ejemplo: [
      `Uma conta de ${m(cuenta)} com 10% de gorjeta soma ${m(propina)}. O total fica em ${m(cuenta + propina)}.`,
      `Dividindo entre 3 pessoas, cada uma paga ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Quanto devo dar de gorjeta?",
        respuesta: "Depende do costume do lugar. Veja o que é comum onde você está e confira se a conta já traz a taxa de serviço.",
      },
      {
        pregunta: "A taxa de serviço é obrigatória?",
        respuesta: pt
          ? "Depende das regras de cada país. Se a conta já a inclui, não precisa de somar outra gorjeta, a não ser que queira."
          : "Depende das regras de cada país. Se a conta já traz a taxa, você não precisa somar outra gorjeta, a não ser que queira.",
      },
      {
        pregunta: "Como calcular 10% de gorjeta de cabeça?",
        respuesta: `Ande com a vírgula uma casa para a esquerda. Numa conta de 85, a gorjeta é ${formatearNumero(ctx, 8.5, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Gorjeta", definicion: "Um valor a mais que você deixa pelo atendimento, além do preço." },
      { termino: "Taxa de serviço", definicion: "Um valor que o estabelecimento já soma à conta pelo atendimento." },
    ],
  };
};
