import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Kalkulator stawki freelancera",
    title: tituloQueEntre(
      `Kalkulator stawki godzinowej freelancera | ${ctx.nombrePais}`,
      `Stawka freelancera | ${ctx.nombrePais}`,
      "Kalkulator stawki freelancera",
    ),
    description: "Oblicz stawkę godzinową i dzienną jako freelancer na podstawie tego, ile chcesz zarabiać, kosztów, podatków, dni wolnych i godzin do zafakturowania.",
    intro: [
      "Najczęstszy błąd freelancera to wziąć pensję, jaką chciałoby się mieć na etacie, i podzielić ją przez 160 godzin. Tak pomija się podatki, koszty, urlop i wszystkie godziny, za które nikt nie płaci.",
      "Ten kalkulator zaczyna od kwoty, którą chcesz mieć na rękę, i pokazuje, ile musisz brać, żeby ją osiągnąć.",
    ],
    comoSeCalcula: [
      "Potrzebny przychód = dochód na rękę ÷ (1 − stopa podatków) + koszty działalności.",
      "Dni pracy = 52 tygodnie × dni pracy w tygodniu − dni wolne.",
      "Godziny do zafakturowania w roku = dni pracy × godziny do zafakturowania dziennie.",
      "Stawka godzinowa = potrzebny przychód ÷ godziny do zafakturowania w roku.",
    ],
    ejemplo: [
      `Żeby mieć na rękę ${m(ingreso)} rocznie przy kosztach ${m(gastos)} i podatkach 25%, musisz zafakturować ${m(r.facturado)}.`,
      `Przy 30 dniach wolnych i 25 godzinach do zafakturowania tygodniowo to ${formatearNumero(ctx, Math.round(r.horas))} godzin w roku, czyli stawka ${m(r.hora)} za godzinę albo ${m(r.dia)} za dzień.`,
    ],
    faq: [
      {
        pregunta: "Ile godzin tygodniowo da się zafakturować?",
        respuesta: "Mniej, niż pracujesz. Szukanie klientów, maile, faktury i nauka zabierają czas, za który nikt nie płaci. Zwykle od 20 do 30 godzin na 40.",
      },
      {
        pregunta: "Brać za godzinę czy za projekt?",
        respuesta: "Oba sposoby są dobre. Nawet jeśli wyceniasz projekt, oszacuj liczbę godzin i pomnóż przez tę stawkę, żeby nie wyjść na minus.",
      },
      {
        pregunta: "Jaką stopę podatków przyjąć?",
        respuesta:
          ctx.pais === "PL"
            ? "To zależy od formy opodatkowania (skala, podatek liniowy albo ryczałt) i od składek ZUS. Jeśli nie masz pewności, zapytaj księgową albo biuro rachunkowe."
            : "To zależy od kraju i formy prowadzenia działalności. Dodaj podatek dochodowy i składki na ubezpieczenia społeczne. Jeśli nie masz pewności, zapytaj księgowego.",
      },
    ],
    glosario: [
      { termino: "Godziny do zafakturowania", definicion: "Godziny pracy, za które wystawiasz klientowi fakturę." },
      { termino: "Dochód na rękę", definicion: "To, co zostaje po odjęciu podatków i kosztów działalności." },
    ],
  };
};
