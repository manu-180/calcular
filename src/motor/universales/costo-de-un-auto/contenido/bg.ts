import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoBg: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "миля" : "километър";
  return {
    h1: "Калкулатор за разходите за кола",
    title: tituloQueEntre(
      `Калкулатор за разходите за кола ${GRAMATICA.bg.en(ctx.nombrePais)}`,
      `Разходи за кола: ${ctx.nombrePais}`,
      "Калкулатор за разходите за кола",
    ),
    description: `Изчислете колко струва колата Ви на месец, на година и на ${unidad}: гориво, застраховки, поддръжка, паркиране и загубата на стойност.`,
    intro: [
      "Повечето хора знаят колко харчат за гориво. Малцина събират застраховките, поддръжката, паркирането и най-вече стойността, която колата губи всяка година.",
      "Попълнете разходите си и ще видите колко Ви струва колата в действителност. Това помага да решите дали да купите, да смените колата или да се придвижвате по друг начин.",
    ],
    comoSeCalcula: [
      imperial
        ? "Гориво на месец = мили на месец ÷ мили на галон × цена на галон."
        : "Гориво на месец = километри на месец × литри на 100 km ÷ 100 × цена на литър.",
      "Загуба на стойност на месец = стойност на колата × годишна загуба ÷ 12.",
      "Реален разход = гориво + застраховки + поддръжка + паркиране + други разходи + загуба на стойност.",
      `Разход на ${unidad} = реален месечен разход ÷ изминатото разстояние за месеца.`,
    ],
    ejemplo: [
      `Кола на стойност ${m(g.precio)}, която изминава ${formatearNumero(ctx, g.distancia)} ${imperial ? "мили" : "km"} на месец, струва ${m(mensual)} месечно заедно със загубата на стойност.`,
      `Това прави ${m(mensual * 12)} на година и ${formatearMonto(ctx, mensual / g.distancia)} на ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Какво е амортизация на колата?",
        respuesta: "Това е стойността, която колата губи с времето. Не я плащате всеки месец, но я усещате при продажбата. При новата кола често е най-големият разход.",
      },
      {
        pregunta: "Защо вноската по кредита не се добавя?",
        respuesta:
          "С част от вноската плащате самата кола, а тя вече е отчетена като загуба на стойност. Ако се добавят и двете, колата ще се брои два пъти. Лихвата по кредита е допълнителен разход отгоре.",
      },
      {
        pregunta: "Как да намаля разходите за колата?",
        respuesta:
          "Сравнявайте застрахователите всяка година, поддържайте налягането в гумите и редовното обслужване и не сменяйте колата често: в първите години тя губи най-много от стойността си.",
      },
    ],
    glosario: [
      { termino: "Амортизация", definicion: "Стойността, която колата губи с времето и употребата." },
      { termino: `Разход на ${unidad}`, definicion: `Средната цена на ${imperial ? "всяка изминала миля" : "всеки изминат километър"}, с всички разходи.` },
    ],
  };
};
