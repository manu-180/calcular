import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 2000);
  const hora = montoEjemplo(ctx, 15);
  return {
    h1: "Conversor de sueldo por hora, mes y año",
    title: tituloQueEntre(`Sueldo por hora, mes y año en ${ctx.nombrePais}`, `Sueldo por hora en ${ctx.nombrePais}`, "Conversor de sueldo por hora, mes y año"),
    description: t(
      "Pasa tu sueldo de mensual a por hora, por día, por semana, por quincena o por año, y al revés. Con tus horas y semanas de trabajo reales.",
      "Pase su sueldo de mensual a por hora, por día, por semana, por quincena o por año, y al revés. Con sus horas y semanas de trabajo reales.",
      "Pasá tu sueldo de mensual a por hora, por día, por semana, por quincena o por año, y al revés. Con tus horas y semanas de trabajo reales.",
    ),
    intro: [
      t(
        "¿Cuánto ganas por hora con tu sueldo mensual? ¿Cuánto es por mes una oferta pagada por hora? Escribe un monto, elige el período y te mostramos todos los demás.",
        "¿Cuánto gana por hora con su sueldo mensual? ¿Cuánto es por mes una oferta pagada por hora? Escriba un monto, elija el período y le mostramos todos los demás.",
        "¿Cuánto ganás por hora con tu sueldo mensual? ¿Cuánto es por mes una oferta pagada por hora? Escribí un monto, elegí el período y te mostramos todos los demás.",
      ),
      t(
        "Sirve para comparar ofertas de trabajo, poner precio a horas extra o saber cuánto vale tu tiempo.",
        "Sirve para comparar ofertas de trabajo, poner precio a horas extra o saber cuánto vale su tiempo.",
        "Sirve para comparar ofertas de trabajo, poner precio a horas extra o saber cuánto vale tu tiempo.",
      ),
    ],
    comoSeCalcula: [
      "Primero se pasa todo a un monto anual.",
      "Por hora = anual ÷ (horas por semana × semanas pagadas).",
      "Por día = anual ÷ (días por semana × semanas pagadas). Por semana = anual ÷ semanas pagadas.",
      "Por mes = anual ÷ 12. Por quincena = anual ÷ 24.",
    ],
    ejemplo: [
      `Un sueldo de ${m(mensual)} por mes con 40 horas semanales son ${m((mensual * 12) / 2080)} por hora y ${m(mensual * 12)} por año.`,
      `Una oferta de ${m(hora)} por hora a tiempo completo equivale a ${m((hora * 2080) / 12)} por mes.`,
    ],
    faq: [
      {
        pregunta: "¿Cuántas horas tiene un mes de trabajo?",
        respuesta: `Con 40 horas por semana, un mes promedio tiene unas ${formatearNumero(ctx, (40 * 52) / 12, 1)} horas: 40 × 52 semanas ÷ 12 meses. No son 160, porque un mes tiene más de 4 semanas.`,
      },
      {
        pregunta: "¿Por qué el sueldo semanal por 4 no da el mensual?",
        respuesta: `Porque un mes tiene en promedio ${formatearNumero(ctx, 52 / 12, 2)} semanas, no 4. Para pasar de semanal a mensual hay que multiplicar por 52 y dividir por 12.`,
      },
      {
        pregunta: "¿Incluye aguinaldo, bonos o impuestos?",
        respuesta: t(
          "No. Convierte la misma cifra entre períodos. Si cobras pagos extra al año, súmalos aparte para comparar ofertas.",
          "No. Convierte la misma cifra entre períodos. Si cobra pagos extra al año, súmelos aparte para comparar ofertas.",
          "No. Convierte la misma cifra entre períodos. Si cobrás pagos extra al año, sumalos aparte para comparar ofertas.",
        ),
      },
    ],
    glosario: [
      { termino: "Sueldo bruto", definicion: "El sueldo antes de impuestos y aportes." },
      { termino: "Quincena", definicion: "Medio mes. En un año hay 24 quincenas." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 2000);
  const hora = montoEjemplo(ctx, 15);
  return {
    description:
      "Pasa tu sueldo de mensual a por hora, al día, a la semana o al año, y al revés. Con tus horas y semanas de trabajo reales.",
    intro: [
      "¿Cuánto ganas por hora con tu sueldo mensual? ¿Cuánto es al mes una oferta pagada por horas? Escribe una cantidad, elige el periodo y te mostramos todos los demás.",
      "Sirve para comparar ofertas de trabajo, poner precio a las horas extra o saber cuánto vale tu tiempo.",
    ],
    comoSeCalcula: [
      "Primero se pasa todo a una cantidad anual.",
      "Por hora = anual ÷ (horas a la semana × semanas pagadas).",
      "Al día = anual ÷ (días a la semana × semanas pagadas). A la semana = anual ÷ semanas pagadas.",
      "Al mes = anual ÷ 12. A la quincena = anual ÷ 24.",
    ],
    ejemplo: [
      `Un sueldo de ${m(mensual)} al mes con 40 horas semanales son ${m((mensual * 12) / 2080)} por hora y ${m(mensual * 12)} al año.`,
      `Una oferta de ${m(hora)} la hora a jornada completa equivale a ${m((hora * 2080) / 12)} al mes.`,
    ],
    faq: [
      {
        pregunta: "¿Cuántas horas tiene un mes de trabajo?",
        respuesta: `Con 40 horas a la semana, un mes tiene de media unas ${formatearNumero(ctx, (40 * 52) / 12, 1)} horas: 40 × 52 semanas ÷ 12 meses. No son 160, porque un mes tiene más de 4 semanas.`,
      },
      {
        pregunta: "¿Por qué el sueldo semanal por 4 no da el mensual?",
        respuesta: `Porque un mes tiene de media ${formatearNumero(ctx, 52 / 12, 2)} semanas, no 4. Para pasar de semanal a mensual hay que multiplicar por 52 y dividir entre 12.`,
      },
      {
        pregunta: "¿Incluye pagas extra, bonus o impuestos?",
        respuesta:
          "No. Convierte la misma cifra entre periodos. Si cobras pagas extra o un bonus al año, súmalos aparte para comparar ofertas.",
      },
    ],
    glosario: [
      { termino: "Sueldo bruto", definicion: "El sueldo antes de las retenciones de IRPF y las cotizaciones a la Seguridad Social." },
      { termino: "Quincena", definicion: "Medio mes. En un año hay 24 quincenas." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
