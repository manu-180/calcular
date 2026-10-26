import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
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
  const unidad = imperial ? "milę" : "kilometr";
  return {
    h1: "Kalkulator kosztów utrzymania samochodu",
    title: tituloQueEntre(
      `Kalkulator kosztów utrzymania samochodu | ${ctx.nombrePais}`,
      `Koszty utrzymania samochodu | ${ctx.nombrePais}`,
      "Kalkulator kosztów utrzymania samochodu",
    ),
    description: `Policz, ile naprawdę kosztuje cię samochód miesięcznie, rocznie i za ${unidad}: paliwo, ubezpieczenie, serwis, parking i utrata wartości.`,
    intro: [
      "Większość kierowców wie, ile wydaje na paliwo. Mało kto dolicza ubezpieczenie, serwis, parking, a przede wszystkim wartość, którą auto traci co roku.",
      "Wpisz swoje koszty, a pokażemy, ile naprawdę kosztuje cię samochód. To pomaga zdecydować, czy kupić auto, wymienić je, czy jeździć inaczej.",
    ],
    comoSeCalcula: [
      imperial
        ? "Paliwo miesięcznie = mile w miesiącu ÷ mile na galon × cena za galon."
        : "Paliwo miesięcznie = kilometry w miesiącu × litry na 100 km ÷ 100 × cena za litr.",
      "Utrata wartości miesięcznie = wartość auta × roczna utrata wartości ÷ 12.",
      "Realny koszt = paliwo + ubezpieczenie + serwis + parking + inne koszty + utrata wartości.",
      `Koszt za ${unidad} = realny koszt miesięczny ÷ dystans przejechany w miesiącu.`,
    ],
    ejemplo: [
      `Samochód wart ${m(g.precio)}, którym przejeżdżasz ${formatearNumero(ctx, g.distancia)} ${imperial ? "mil" : "km"} miesięcznie, kosztuje ${m(mensual)} miesięcznie razem z utratą wartości.`,
      `To ${m(mensual * 12)} rocznie i ${formatearMonto(ctx, mensual / g.distancia)} za ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Co to jest utrata wartości auta?",
        respuesta: "To wartość, którą samochód traci z czasem. Nie płacisz jej co miesiąc, ale odczuwasz ją przy sprzedaży. W nowym aucie to często największy koszt.",
      },
      {
        pregunta: "Dlaczego rata kredytu nie jest doliczana?",
        respuesta:
          "Część raty spłaca samo auto, a to już liczymy jako utratę wartości. Gdyby doliczyć oba, auto byłoby policzone dwa razy. Odsetki od kredytu to dodatkowy koszt.",
      },
      {
        pregunta: "Jak obniżyć koszty utrzymania samochodu?",
        respuesta:
          "Co roku porównuj oferty ubezpieczenia OC i AC, dbaj o ciśnienie w oponach i regularny serwis i nie wymieniaj auta zbyt często: najwięcej wartości traci w pierwszych latach.",
      },
    ],
    glosario: [
      { termino: "Utrata wartości", definicion: "Wartość, którą auto traci z czasem i wraz z przebiegiem." },
      { termino: `Koszt za ${unidad}`, definicion: "Średni koszt każdego przejechanego odcinka tej długości, ze wszystkimi kosztami." },
      { termino: "OC i AC", definicion: "Obowiązkowe ubezpieczenie odpowiedzialności cywilnej (OC) i dobrowolne autocasco (AC)." },
    ],
  };
};
