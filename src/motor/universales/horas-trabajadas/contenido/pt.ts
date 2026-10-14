import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora de horas trabalhadas",
    title: tituloQueEntre(`Calculadora de horas trabalhadas (${ctx.nombrePais})`, `Horas trabalhadas (${ctx.nombrePais})`, "Calculadora de horas trabalhadas"),
    description: "Some as horas que você trabalhou na semana com entrada, saída e intervalo, e calcule quanto recebe com as horas extras incluídas.",
    intro: [
      "Escolha a entrada e a saída de cada dia, o intervalo não pago e o valor da sua hora. Mostramos o total de horas, as horas extras e quanto você recebe na semana.",
      pt
        ? "Serve para conferir o recibo de vencimento, preencher uma folha de horas ou cobrar um trabalho pago à hora."
        : "Serve para conferir o holerite, preencher a folha de ponto ou cobrar um trabalho pago por hora.",
    ],
    comoSeCalcula: [
      "Horas do dia = saída − entrada − intervalo. Se a saída é mais cedo que a entrada, o turno termina no dia seguinte.",
      "Horas extras = total da semana − jornada normal, quando o total passa dela.",
      "Pagamento = horas normais × valor da hora + horas extras × valor da hora × (1 + adicional).",
    ],
    ejemplo: [
      `Das ${hora("09:00")} às ${hora("17:30")} com 30 minutos de intervalo são ${n(jornada)} horas por dia. De segunda a sexta, ${n(jornada * 5)} horas: a ${m(pago)} a hora, ${m(jornada * 5 * pago)}.`,
      `Das ${hora("08:00")} às ${hora("18:00")} com uma hora de intervalo são ${n(larga * 5)} horas na semana. Com jornada de 40 horas, ${n(extra)} são extras. Com adicional de 50%, o total é ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Como calcular as horas trabalhadas?",
        respuesta: "Tire o horário de entrada do de saída e desconte o intervalo. Depois some todos os dias da semana.",
      },
      {
        pregunta: "Como passar minutos para horas decimais?",
        respuesta: `Divida os minutos por 60. Meia hora é ${n(0.5, 1)}; 15 minutos, ${n(0.25, 2)}; 45 minutos, ${n(0.75, 2)}. Então 7 horas e 45 minutos são ${n(7.75, 2)} horas.`,
      },
      {
        pregunta: "Quantas horas extras posso fazer e como são pagas?",
        respuesta: "Depende da lei do lugar onde você trabalha e do seu contrato. Esta calculadora usa o adicional e a jornada que você colocar, sem aplicar nenhuma regra específica.",
      },
    ],
    glosario: [
      { termino: "Hora extra", definicion: "Hora trabalhada além da jornada normal, paga com um valor maior." },
      { termino: "Adicional de hora extra", definicion: "O percentual a mais pago em cada hora extra. Com 50%, cada hora extra vale uma hora e meia." },
    ],
  };
};
