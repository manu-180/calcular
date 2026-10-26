import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Calculator buget 50/30/20",
    title: tituloQueEntre(`Calculator buget 50/30/20: ${ctx.nombrePais}`, "Calculator buget personal 50/30/20", "Calculator buget 50/30/20"),
    description: "Împărțiți venitul net lunar după regula 50/30/20: cât merge la nevoi, cât la dorințe și cât la economii. Schimbați procentele dacă e nevoie.",
    intro: [
      "Regula 50/30/20 este un mod simplu de a vă planifica luna. Jumătate merge la cheltuielile esențiale, 30% la lucrurile care vă plac și 20% la economii.",
      "Introduceți venitul net și vă arătăm cât revine fiecărei părți. Dacă situația dumneavoastră este alta, de exemplu o chirie mare, ajustați procentele.",
    ],
    comoSeCalcula: ["Nevoi = venit × 50%.", "Dorințe = venit × 30%.", "Economii = venit × 20%. Cele trei procente trebuie să dea împreună 100%."],
    ejemplo: [
      `La un venit de ${m(ingreso)} pe lună: ${m(ingreso * 0.5)} pentru nevoi, ${m(ingreso * 0.3)} pentru dorințe și ${m(ingreso * 0.2)} pentru economii.`,
      `Într-un an, acele 20% înseamnă ${m(ingreso * 0.2 * 12)} economisiți.`,
    ],
    faq: [
      {
        pregunta: "Ce intră la nevoi și ce la dorințe?",
        respuesta:
          "Nevoile sunt cheltuielile pe care trebuie să le plătiți: locuința, alimentele de bază, utilitățile, transportul, sănătatea și ratele minime. Dorințele sunt lucrurile la care ați putea renunța la nevoie.",
      },
      {
        pregunta: "Ce faceți dacă nevoile depășesc 50%?",
        respuesta: "Se întâmplă des, mai ales cu o chirie mare. Încercați 60/20/20 sau 70/20/10 și evitați să reduceți economiile la zero.",
      },
      {
        pregunta: "Ratele la datorii intră la economii?",
        respuesta: "Ratele minime intră la nevoi. Tot ce plătiți în plus ca să închideți o datorie mai repede intră la economii, pentru că vă îmbunătățește situația financiară la fel ca economisirea.",
      },
    ],
    glosario: [
      { termino: "Venit net", definicion: "Ce primiți după impozite și contribuții." },
      { termino: "Regula 50/30/20", definicion: "Un mod de a împărți venitul între nevoi, dorințe și economii." },
    ],
  };
};
