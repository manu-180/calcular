import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Kalkulator budżetu domowego 50/30/20",
    title: tituloQueEntre(
      `Kalkulator budżetu domowego 50/30/20 | ${ctx.nombrePais}`,
      `Budżet domowy 50/30/20 | ${ctx.nombrePais}`,
      "Kalkulator budżetu domowego 50/30/20",
    ),
    description: "Podziel miesięczny dochód netto według zasady 50/30/20: ile na potrzeby, ile na przyjemności i ile na oszczędności. Procenty możesz zmienić.",
    intro: [
      "Zasada 50/30/20 to prosty sposób na zaplanowanie miesiąca. Połowa idzie na rzeczy niezbędne, 30% na to, co sprawia ci przyjemność, a 20% na oszczędności.",
      "Wpisz dochód netto, a pokażemy, ile przypada na każdą część. Jeśli twoja sytuacja jest inna, na przykład płacisz wysoki czynsz, dostosuj procenty.",
    ],
    comoSeCalcula: [
      "Potrzeby = dochód × 50%.",
      "Przyjemności = dochód × 30%.",
      "Oszczędności = dochód × 20%. Trzy procenty muszą się sumować do 100%.",
    ],
    ejemplo: [
      `Przy dochodzie ${m(ingreso)} miesięcznie: ${m(ingreso * 0.5)} na potrzeby, ${m(ingreso * 0.3)} na przyjemności i ${m(ingreso * 0.2)} na oszczędności.`,
      `W ciągu roku te 20% daje ${m(ingreso * 0.2 * 12)} oszczędności.`,
    ],
    faq: [
      {
        pregunta: "Co jest potrzebą, a co przyjemnością?",
        respuesta:
          "Potrzeby to rachunki, które trzeba zapłacić: mieszkanie, podstawowe zakupy spożywcze, media, dojazdy, zdrowie i minimalne raty. Przyjemności to wydatki, z których w razie potrzeby można zrezygnować.",
      },
      {
        pregunta: "Co, jeśli potrzeby przekraczają 50%?",
        respuesta: "To częste, zwłaszcza przy wysokim czynszu. Spróbuj podziału 60/20/20 albo 70/20/10 i staraj się nie schodzić z oszczędnościami do zera.",
      },
      {
        pregunta: "Czy spłata długów liczy się jako oszczędności?",
        respuesta: "Minimalne raty to potrzeby. Wszystko, co nadpłacasz, żeby szybciej spłacić dług, liczy się jako oszczędności, bo poprawia twój majątek tak samo jak odkładanie pieniędzy.",
      },
    ],
    glosario: [
      { termino: "Dochód netto", definicion: "To, co dostajesz na rękę po odliczeniu podatków i składek." },
      { termino: "Zasada 50/30/20", definicion: "Sposób podziału dochodu między potrzeby, przyjemności i oszczędności." },
    ],
  };
};
