import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Izračun finančne rezerve",
    title: tituloQueEntre(
      `Finančna rezerva: izračun ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Finančna rezerva: izračun",
      "Izračun finančne rezerve",
    ),
    description: "Izračunajte, kolikšno finančno rezervo potrebujete glede na nujne stroške in v koliko mesecih jo lahko privarčujete.",
    intro: [
      "Finančna rezerva je denar za tisto, česar ni mogoče načrtovati: izgubo službe, zdravstvene težave ali nenadno okvaro doma.",
      "Z njo se vam ni treba zadolžiti ali živeti na kreditno kartico ravno takrat, ko je najtežje. Vnesite nujne stroške in število mesecev, ki jih želite pokriti.",
    ],
    comoSeCalcula: [
      "Priporočena rezerva = nujni mesečni stroški × število mesecev.",
      "Manjka še = priporočena rezerva − kar že imate.",
      "Meseci do cilja = preostali znesek ÷ mesečni prihranek, zaokroženo navzgor.",
    ],
    ejemplo: [
      `Če so vaši nujni stroški ${m(gastos)} na mesec, rezerva za 6 mesecev znaša ${m(gastos * 6)}.`,
      `Če vsak mesec privarčujete ${m(aporte)}, je število mesecev do cilja: ${meses}.`,
    ],
    faq: [
      {
        pregunta: "Za koliko mesecev naj zadošča finančna rezerva?",
        respuesta:
          "Običajno se priporočajo nujni stroški za 3 do 6 mesecev. Če imate neredne prihodke, delate zase ali v gospodinjstvu dela samo ena oseba, raje računajte na 6 do 12 mesecev.",
      },
      {
        pregunta: "Kje hraniti finančno rezervo?",
        respuesta:
          "Na varnem mestu, kjer lahko do denarja pridete še isti dan, ločeno od kartice za vsakodnevne stroške. To ni denar za tvegane naložbe: pri roki mora biti, ko ga potrebujete.",
      },
      {
        pregunta: "Kaj najprej: rezerva ali odplačilo dolgov?",
        respuesta:
          "Pogost vrstni red je tak: najprej privarčujte stroške za en mesec, nato odplačajte drage dolgove, kot je kreditna kartica, na koncu pa rezervo dopolnite do polnega zneska.",
      },
    ],
    glosario: [
      { termino: "Nujni stroški", definicion: "Plačila, ki jih morate poravnati tudi, ko prihodki prenehajo: stanovanje, hrana, položnice, zdravje." },
      { termino: "Likvidnost", definicion: "Kako hitro lahko uporabite denar, ne da bi izgubil vrednost." },
    ],
  };
};
