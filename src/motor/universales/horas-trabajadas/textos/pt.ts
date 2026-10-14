import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosPt: TextosUi<UiHorasTrabajadas> = {
  slug: "horas-trabalhadas",
  ui: () => ({
    dias: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    entrada: (dia) => `${dia}: entrada`,
    salida: (dia) => `${dia}: saída`,
    horarioAyuda: "Deixe em branco os dias em que não trabalhou. Se sair depois da meia-noite, conta como o mesmo turno.",
    pausa: "Intervalo não pago por dia (minutos)",
    pausaAyuda: "Almoço ou descanso que não é pago. É descontado de cada dia trabalhado.",
    pagoHora: "Valor da hora",
    umbral: "Jornada normal por semana (horas, opcional)",
    umbralAyuda: "As horas acima desse número são pagas como hora extra. Deixe em branco se não houver hora extra.",
    recargo: "Adicional de hora extra (%)",
    recargoAyuda: "Quanto a mais vale cada hora extra. 50% quer dizer uma hora e meia de pagamento.",
    horasTotales: "Horas trabalhadas",
    horasReloj: "Em horas e minutos",
    horasNormales: "Horas normais",
    horasExtra: "Horas extras",
    pagoNormal: "Pagamento das horas normais",
    pagoExtra: "Pagamento das horas extras",
    pagoTotal: "Total a receber na semana",
    tabla: "Dia a dia",
    colDia: "Dia",
    colEntrada: "Entrada",
    colSalida: "Saída",
    colHoras: "Horas",
    errorFaltaSalida: (dia) => `Falta o horário de saída de ${dia}.`,
    errorFaltaEntrada: (dia) => `Falta o horário de entrada de ${dia}.`,
    errorIguales: (dia) => `${dia} tem o mesmo horário de entrada e de saída.`,
    errorPausa: (dia) => `O intervalo é igual ou maior que o turno de ${dia}.`,
    errorSinDias: "Preencha a entrada e a saída de pelo menos um dia.",
    observacionNoche: "Alguns turnos terminam no dia seguinte: eles contam inteiros no dia em que começam.",
    observacionGenerico:
      "É uma conta geral. A jornada máxima, as regras de hora extra e o adicional noturno ou de feriado dependem da lei e do seu contrato.",
  }),
};
