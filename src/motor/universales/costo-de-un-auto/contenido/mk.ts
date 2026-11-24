import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoMk: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "милја" : "километар";
  return {
    h1: "Калкулатор за трошоци за автомобил",
    title: tituloQueEntre(
      `Трошоци за автомобил ${GRAMATICA.mk.en(ctx.nombrePais)}`,
      "Трошоци за автомобил",
    ),
    description: `Пресметајте колку ве чини автомобилот месечно, годишно и по ${unidad}: гориво, осигурување, одржување, паркирање и загуба на вредност.`,
    intro: [
      "Повеќето луѓе знаат колку трошат за гориво. Малкумина ги собираат осигурувањето, одржувањето, паркирањето и пред сè вредноста што автомобилот ја губи секоја година.",
      "Пополнете ги вашите трошоци и ќе видите колку навистина ве чини автомобилот. Тоа помага да одлучите дали да купите, да го смените автомобилот или да се движите на друг начин.",
    ],
    comoSeCalcula: [
      imperial
        ? "Гориво на месец = милји на месец ÷ милји на галон × цена на галон."
        : "Гориво на месец = километри на месец × литри на 100 km ÷ 100 × цена на литар.",
      "Загуба на вредност на месец = вредност на автомобилот × годишна загуба ÷ 12.",
      "Реален трошок = гориво + осигурување + одржување + паркирање + други трошоци + загуба на вредност.",
      `Трошок по ${unidad} = реален месечен трошок ÷ изминатото растојание за месецот.`,
    ],
    ejemplo: [
      `Автомобил во вредност од ${m(g.precio)} што минува ${formatearNumero(ctx, g.distancia)} ${imperial ? "милји" : "km"} на месец чини ${m(mensual)} месечно, заедно со загубата на вредност.`,
      `Тоа изнесува ${m(mensual * 12)} на година и ${formatearMonto(ctx, mensual / g.distancia)} по ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Што е амортизација на автомобилот?",
        respuesta: "Тоа е вредноста што автомобилот ја губи со времето. Не ја плаќате секој месец, но ја чувствувате при продажба. Кај новиот автомобил често е најголемиот трошок.",
      },
      {
        pregunta: "Зошто ратата за кредитот не се додава?",
        respuesta:
          "Со дел од ратата го плаќате самиот автомобил, а тој веќе е сметан како загуба на вредност. Ако се додадат и двете, автомобилот би се сметал двапати. Каматата на кредитот е дополнителен трошок.",
      },
      {
        pregunta: "Како да ги намалам трошоците за автомобилот?",
        respuesta:
          "Споредувајте ги осигурителите секоја година, одржувајте го притисокот во гумите и редовниот сервис и не менувајте го автомобилот често: во првите години тој најмногу ја губи вредноста.",
      },
    ],
    glosario: [
      { termino: "Амортизација", definicion: "Вредноста што автомобилот ја губи со времето и користењето." },
      { termino: `Трошок по ${unidad}`, definicion: `Просечната цена на ${imperial ? "секоја измината милја" : "секој изминат километар"}, со сите трошоци.` },
    ],
  };
};
