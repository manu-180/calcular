import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Calculadora de fondo de emergencia",
    title: tituloQueEntre(`Fondo de emergencia: cuánto ahorrar en ${ctx.nombrePais}`, `Fondo de emergencia en ${ctx.nombrePais}`, "Calculadora de fondo de emergencia"),
    description: t(
      "Calcula de cuánto tiene que ser tu fondo de emergencia según tus gastos esenciales y en cuántos meses lo completas con lo que puedes ahorrar.",
      "Calcule de cuánto tiene que ser su fondo de emergencia según sus gastos esenciales y en cuántos meses lo completa con lo que puede ahorrar.",
      "Calculá de cuánto tiene que ser tu fondo de emergencia según tus gastos esenciales y en cuántos meses lo completás con lo que podés ahorrar.",
    ),
    intro: [
      "Un fondo de emergencia es dinero guardado para lo que no se puede prever: quedarse sin trabajo, un problema de salud o un arreglo urgente en la casa.",
      t(
        "Tenerlo evita endeudarte con la tarjeta justo cuando peor estás. Escribe tus gastos esenciales y cuántos meses quieres cubrir.",
        "Tenerlo evita endeudarse con la tarjeta justo cuando peor está. Escriba sus gastos esenciales y cuántos meses quiere cubrir.",
        "Tenerlo evita endeudarte con la tarjeta justo cuando peor estás. Escribí tus gastos esenciales y cuántos meses querés cubrir.",
      ),
    ],
    comoSeCalcula: [
      "Fondo recomendado = gastos esenciales por mes × meses a cubrir.",
      "Lo que falta = fondo recomendado − lo que ya está ahorrado.",
      "Meses para completarlo = lo que falta ÷ lo que se puede guardar por mes, redondeado hacia arriba.",
    ],
    ejemplo: [
      `Con ${m(gastos)} de gastos esenciales por mes, un fondo de 6 meses es de ${m(gastos * 6)}.`,
      `Guardando ${m(aporte)} por mes, se completa en ${Math.ceil((gastos * 6) / aporte)} meses.`,
    ],
    faq: [
      {
        pregunta: "¿De cuántos meses tiene que ser el fondo de emergencia?",
        respuesta:
          "La referencia más usada es de 3 a 6 meses de gastos esenciales. Si el ingreso es variable, si se trabaja por cuenta propia o si hay una sola fuente de ingresos en la casa, conviene apuntar a 6 a 12 meses.",
      },
      {
        pregunta: "¿Dónde guardo el fondo de emergencia?",
        respuesta:
          "En un lugar seguro y que se pueda retirar en el día, separado de la cuenta de gastos. No es para invertir con riesgo: su trabajo es estar disponible.",
      },
      {
        pregunta: "¿Primero el fondo o pagar deudas?",
        respuesta:
          "Una opción común es juntar primero un mes de gastos, después pagar las deudas más caras (como la tarjeta) y luego completar el fondo.",
      },
    ],
    glosario: [
      { termino: "Gastos esenciales", definicion: "Los que hay que pagar aunque se pierda el ingreso: vivienda, comida, servicios, salud." },
      { termino: "Liquidez", definicion: "Qué tan rápido se puede usar un dinero sin perder valor." },
    ],
  };
};
