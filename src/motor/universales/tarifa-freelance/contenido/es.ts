import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "¿Cuánto cobrar por hora como freelance?",
    title: tituloQueEntre(`Cuánto cobrar por hora freelance en ${ctx.nombrePais}`, `Tarifa freelance en ${ctx.nombrePais}`, "Cuánto cobrar por hora como freelance"),
    description: t(
      "Calcula tu tarifa por hora y por día como independiente a partir de lo que quieres ganar, tus gastos, impuestos, vacaciones y horas facturables.",
      "Calcule su tarifa por hora y por día como independiente a partir de lo que quiere ganar, sus gastos, impuestos, vacaciones y horas facturables.",
      "Calculá tu tarifa por hora y por día como independiente a partir de lo que querés ganar, tus gastos, impuestos, vacaciones y horas facturables.",
    ),
    intro: [
      t(
        "El error más común al trabajar por tu cuenta es dividir el sueldo que querrías como empleado por 160 horas. Así te faltan impuestos, gastos, vacaciones y todas las horas que no se cobran.",
        "El error más común al trabajar por su cuenta es dividir el sueldo que querría como empleado por 160 horas. Así le faltan impuestos, gastos, vacaciones y todas las horas que no se cobran.",
        "El error más común al trabajar por tu cuenta es dividir el sueldo que querrías como empleado por 160 horas. Así te faltan impuestos, gastos, vacaciones y todas las horas que no se cobran.",
      ),
      t(
        "Esta calculadora parte de lo que quieres ganar en limpio y te dice cuánto cobrar para llegar.",
        "Esta calculadora parte de lo que quiere ganar en limpio y le dice cuánto cobrar para llegar.",
        "Esta calculadora parte de lo que querés ganar en limpio y te dice cuánto cobrar para llegar.",
      ),
    ],
    comoSeCalcula: [
      "Facturación necesaria = ingreso neto ÷ (1 − impuestos) + gastos del negocio.",
      "Días de trabajo = 52 semanas × días por semana − días libres.",
      "Horas facturables al año = días de trabajo × horas facturables por día.",
      "Tarifa por hora = facturación necesaria ÷ horas facturables al año.",
    ],
    ejemplo: [
      `Para ganar ${m(ingreso)} en limpio por año, con ${m(gastos)} de gastos y 25 % de impuestos, hay que facturar ${m(r.facturado)}.`,
      `Con 30 días libres y 25 horas facturables por semana son ${Math.round(r.horas)} horas al año: la tarifa es ${m(r.hora)} por hora o ${m(r.dia)} por día.`,
    ],
    faq: [
      {
        pregunta: "¿Cuántas horas por semana puedo facturar?",
        respuesta:
          "Menos de las que se trabajan. Buscar clientes, responder mails, facturar y capacitarse lleva tiempo que nadie paga. Entre 20 y 30 horas facturables de 40 es lo habitual.",
      },
      {
        pregunta: "¿Cobro por hora o por proyecto?",
        respuesta: t(
          "Las dos sirven. Aunque cobres por proyecto, estima las horas y multiplícalas por esta tarifa para no quedarte corto.",
          "Las dos sirven. Aunque cobre por proyecto, estime las horas y multiplíquelas por esta tarifa para no quedarse corto.",
          "Las dos sirven. Aunque cobres por proyecto, estimá las horas y multiplicalas por esta tarifa para no quedarte corto.",
        ),
      },
      {
        pregunta: "¿Qué porcentaje de impuestos pongo?",
        respuesta: t(
          "Depende del país y del régimen en el que estés inscrito. Suma impuestos a la renta y aportes a la seguridad social. Si no estás seguro, consulta a un contador.",
          "Depende del país y del régimen en el que esté inscrito. Sume impuestos a la renta y aportes a la seguridad social. Si no está seguro, consulte a un contador.",
          "Depende del país y del régimen en el que estés inscripto. Sumá impuestos a la renta y aportes a la seguridad social. Si no estás seguro, consultá a un contador.",
        ),
      },
    ],
    glosario: [
      { termino: "Horas facturables", definicion: "Las horas de trabajo que se cobran a un cliente." },
      { termino: "Ingreso neto", definicion: "Lo que queda después de pagar impuestos y gastos del negocio." },
    ],
  };
};
