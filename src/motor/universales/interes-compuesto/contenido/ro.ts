import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Calculator dobândă compusă",
    title: tituloQueEntre(`Calculator dobândă compusă: ${ctx.nombrePais}`, "Calculator dobândă compusă"),
    description: "Vedeți cum cresc banii cu dobândă compusă și depuneri lunare. Aflați soldul final, dobânda câștigată și un tabel an cu an.",
    intro: [
      "La dobânda compusă, dobânda se adaugă la sold și începe să producă la rândul ei dobândă. De aceea economiile cresc tot mai repede.",
      "Introduceți ce aveți azi, cât puteți adăuga lunar, dobânda și numărul de ani. Vă arătăm soldul final și cât din el este dobândă.",
    ],
    comoSeCalcula: [
      "Sold final = suma × (1 + i) la puterea n + depunerea × ((1 + i) la puterea n − 1) ÷ i.",
      "Aici i este dobânda lunară echivalentă cu capitalizarea aleasă, iar n este numărul de luni.",
      "Depunerile se adaugă la sfârșitul fiecărei luni.",
    ],
    ejemplo: [
      `Pornind de la ${m(capital)} și adăugând ${m(aporte)} pe lună, cu o dobândă de 7% pe an, ajungeți la ${m(a10)} în 10 ani.`,
      `Dacă mai continuați 10 ani, soldul ajunge la ${m(a20)}. Al doilea deceniu aduce mult mai mult decât primul.`,
    ],
    faq: [
      {
        pregunta: "Care este diferența dintre dobânda simplă și dobânda compusă?",
        respuesta: "Dobânda simplă se calculează mereu la suma inițială. Dobânda compusă se calculează la suma inițială plus dobânda deja câștigată.",
      },
      {
        pregunta: "Ce este regula lui 72?",
        respuesta: "O scurtătură ca să vedeți în cât timp se dublează banii: împărțiți 72 la dobânda anuală. La 6%, se dublează în aproximativ 12 ani.",
      },
      {
        pregunta: "Ce dobândă să folosesc?",
        respuesta: "Una realistă pentru ce veți face cu banii. Ca să vedeți rezultatul în banii de azi, folosiți dobânda minus inflația așteptată.",
      },
    ],
    glosario: [
      { termino: "Capitalizare", definicion: "Momentul în care dobânda se adaugă la sold." },
      { termino: "Dobândă compusă", definicion: "Dobânda calculată la sold plus dobânda deja câștigată." },
    ],
  };
};
