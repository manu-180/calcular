import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Calculator dobândă simplă",
    title: tituloQueEntre(`Calculator dobândă simplă: ${ctx.nombrePais}`, "Calculator dobândă simplă pe zile, luni și ani", "Calculator dobândă simplă"),
    description: "Calculați dobânda simplă la o sumă, cu o rată anuală, pe zile, luni sau ani. Alegeți anul de 365 sau de 360 de zile și vedeți totalul.",
    intro: [
      "Dobânda simplă se calculează mereu la suma inițială: dobânda nu se adaugă la capital pe parcursul perioadei.",
      "Se folosește la depozite pe termen scurt, la împrumuturi între persoane și în multe exerciții de la școală.",
    ],
    comoSeCalcula: [
      "Dobânda = capital × rata anuală × perioada în ani.",
      "Pentru luni, se împarte la 12. Pentru zile, se împarte la 365 sau la 360, după anul folosit de bancă.",
      "Total = capital + dobândă.",
    ],
    ejemplo: [
      `O sumă de ${m(capital)} cu o dobândă de 10% pe an, timp de 6 luni, aduce o dobândă de ${m(capital * 0.1 * 0.5)}.`,
      `Aceeași sumă, pe 90 de zile, aduce ${m((capital * 0.1 * 90) / 365)} cu anul de 365 de zile și ${m((capital * 0.1 * 90) / 360)} cu anul de 360 de zile.`,
    ],
    faq: [
      {
        pregunta: "Care este formula dobânzii simple?",
        respuesta: `D = C × r × t. C este capitalul, r este rata anuală scrisă ca număr zecimal (10% înseamnă ${formatearNumero(ctx, 0.1, 2)}), iar t este perioada în ani.`,
      },
      {
        pregunta: "Prin ce diferă de dobânda compusă?",
        respuesta: "Dobânda simplă se calculează mereu la același capital. La dobânda compusă, dobânda se adaugă la sold și produce la rândul ei dobândă.",
      },
      {
        pregunta: "De ce unele bănci folosesc anul de 360 de zile?",
        respuesta: "Este o convenție bancară care simplifică socotelile. Cu 360 de zile, dobânda iese puțin mai mare. Verificați ce convenție folosește banca dumneavoastră.",
      },
    ],
    glosario: [
      { termino: "Capital", definicion: "Suma de bani împrumutată sau investită." },
      { termino: "An bancar", definicion: "Un an socotit ca având 360 de zile, cu luni de câte 30 de zile." },
    ],
  };
};
