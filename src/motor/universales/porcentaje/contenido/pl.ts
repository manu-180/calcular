import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator procentowy",
    title: tituloQueEntre(
      `Kalkulator procentowy: ile to procent z liczby | ${ctx.nombrePais}`,
      `Kalkulator procentowy | ${ctx.nombrePais}`,
      "Kalkulator procentowy",
    ),
    description: "Oblicz procent z liczby, jakim procentem jednej liczby jest druga i wynik po dodaniu albo odjęciu procentu.",
    intro: [
      "Wybierz, co chcesz wiedzieć, wpisz dwie liczby, a od razu dostaniesz wynik.",
      "Kalkulator obejmuje cztery codzienne rachunki z procentami: część, udział, wzrost i spadek.",
    ],
    comoSeCalcula: [
      "X% z Y = X × Y ÷ 100.",
      "Jakim procentem Y jest X = X ÷ Y × 100.",
      "Y powiększone o X% = Y × (1 + X ÷ 100). Y pomniejszone o X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% z 200 to 30.", "30 to 25% ze 120.", `Cena ${m(precio)} po podwyżce o 10% wynosi ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: "Jak obliczyć procent z liczby?",
        respuesta: "Pomnóż liczbę przez procent i podziel przez 100. 20% z 350 to 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Jak obliczyć, jakim procentem jednej liczby jest druga?",
        respuesta: "Podziel część przez całość i pomnóż przez 100. Jeśli masz 45 dobrych odpowiedzi na 60, to 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Jak dodać procent do ceny?",
        respuesta: `Pomnóż ją przez 1 plus procent zapisany jako ułamek. Żeby dodać 10%, pomnóż przez ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Czy wzrost o 10%, a potem spadek o 10% daje to samo co na początku?",
        respuesta: "Nie. 100 powiększone o 10% to 110, a 110 pomniejszone o 10% to 99. Spadek liczy się od większej liczby.",
      },
    ],
    glosario: [
      { termino: "Procent", definicion: "Liczba zapisana jako część ze 100." },
      { termino: "Podstawa", definicion: "Liczba, od której liczy się procent (w tym kalkulatorze Y)." },
    ],
  };
};
