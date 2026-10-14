import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculadora para dividir gastos",
    title: tituloQueEntre(`Dividir gastos entre amigos en ${ctx.nombrePais}`, `Dividir gastos en ${ctx.nombrePais}`, "Dividir gastos entre amigos"),
    description: t(
      "Divide un gasto compartido entre hasta 8 personas: cuánto le toca a cada uno y quién le paga a quién, con la menor cantidad de pagos.",
      "Divida un gasto compartido entre hasta 8 personas: cuánto le toca a cada uno y quién le paga a quién, con la menor cantidad de pagos.",
      "Dividí un gasto compartido entre hasta 8 personas: cuánto le toca a cada uno y quién le paga a quién, con la menor cantidad de pagos.",
    ),
    intro: [
      "Sirve para un viaje, un asado, una cena o el alquiler de una casa: cada uno pagó una parte distinta y hay que emparejar.",
      t(
        "Escribe lo que puso cada persona. La calculadora te dice la parte de cada uno y los pagos justos para quedar a mano.",
        "Escriba lo que puso cada persona. La calculadora le dice la parte de cada uno y los pagos justos para quedar a mano.",
        "Escribí lo que puso cada persona. La calculadora te dice la parte de cada uno y los pagos justos para quedar a mano.",
      ),
    ],
    comoSeCalcula: [
      "Parte de cada uno = gasto total ÷ cantidad de personas.",
      "Quien pagó menos que su parte debe la diferencia. Quien pagó más, la recibe.",
      "Los pagos se arman de mayor a menor deuda, así nadie hace transferencias de más.",
    ],
    ejemplo: [
      `Ana pagó ${m(a)}, Bruno ${m(b)} y Carla nada. El total es ${m(a + b)} y a cada uno le toca ${m(cuota)}.`,
      `Carla le paga ${m(cuota)} a Ana y Bruno le paga ${m(cuota - b)} a Ana.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se divide un gasto si cada uno pagó distinto?",
        respuesta: "Se suma todo, se divide por la cantidad de personas y se compara con lo que puso cada uno. La diferencia es lo que debe o lo que le deben.",
      },
      {
        pregunta: "¿Qué hago si alguien no pagó nada?",
        respuesta: t(
          "Escribe 0 en su casilla. Así cuenta para dividir el gasto. Si la dejas vacía, queda afuera.",
          "Escriba 0 en su casilla. Así cuenta para dividir el gasto. Si la deja vacía, queda afuera.",
          "Escribí 0 en su casilla. Así cuenta para dividir el gasto. Si la dejás vacía, queda afuera.",
        ),
      },
      {
        pregunta: "¿Por qué hay menos pagos que personas?",
        respuesta: "Porque la calculadora junta las deudas: el que más debe le paga al que más puso, y así hasta quedar a mano. Nunca hacen falta más pagos que personas menos una.",
      },
    ],
    glosario: [
      { termino: "Parte", definicion: "Lo que le corresponde pagar a cada persona del gasto total." },
      { termino: "Saldo", definicion: "La diferencia entre lo que puso una persona y su parte." },
    ],
  };
};
