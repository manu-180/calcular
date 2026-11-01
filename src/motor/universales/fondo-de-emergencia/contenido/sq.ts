import { pluralSq } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const muaj = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Kalkulator fondi emergjence",
    title: tituloQueEntre(`Kalkulator fondi emergjence: ${ctx.nombrePais}`, "Kalkulator fondi emergjence"),
    description: "Zbuloni sa i madh duhet të jetë fondi i emergjencës sipas shpenzimeve thelbësore dhe për sa muaj e grumbulloni me atë që mund të kurseni.",
    intro: [
      "Fondi i emergjencës është para të lëna mënjanë për atë që nuk planifikohet: humbjen e punës, një problem shëndetësor ose një riparim urgjent në shtëpi.",
      "Me një fond të tillë nuk keni nevojë t'i drejtoheni kartës së kreditit pikërisht kur është më e vështirë. Vendosni shpenzimet thelbësore dhe sa muaj dëshironi të mbuloni.",
    ],
    comoSeCalcula: [
      "Fondi i rekomanduar = shpenzimet thelbësore në muaj × muajt për t'u mbuluar.",
      "Mbeten për t'u kursyer = fondi i rekomanduar − ajo që keni tashmë.",
      "Muaj derisa ta plotësoni = shuma e mbetur ÷ sa kurseni në muaj, e rrumbullakosur lart.",
    ],
    ejemplo: [
      `Me shpenzime thelbësore prej ${m(gastos)} në muaj, një fond për 6 muaj do të thotë ${m(gastos * 6)}.`,
      `Nëse kurseni ${m(aporte)} në muaj, e plotësoni për ${pluralSq(muaj, "muaj", "muaj")}.`,
    ],
    faq: [
      {
        pregunta: "Sa muaj duhet të mbulojë fondi i emergjencës?",
        respuesta:
          "Rekomandimi i zakonshëm është midis 3 dhe 6 muajsh shpenzimesh thelbësore. Nëse të ardhurat ndryshojnë, punoni për vete ose në familje ka vetëm një burim të ardhurash, synoni 6 deri në 12 muaj.",
      },
      {
        pregunta: "Ku ta mbaj fondin e emergjencës?",
        respuesta: "Në një vend të sigurt, nga i cili mund t'i tërhiqni paratë të njëjtën ditë, të ndarë nga llogaria e shpenzimeve të përditshme. Nuk është për investime të rrezikshme: roli i tij është të jetë aty kur ju duhet.",
      },
      {
        pregunta: "Të mbledh më parë fondin apo të shlyej borxhet?",
        respuesta: "Një mënyrë e përdorur shpesh: kurseni fillimisht shpenzimet e një muaji, pastaj shlyeni borxhet e shtrenjta, si ato të kartës së kreditit, dhe vetëm atëherë plotësoni fondin.",
      },
    ],
    glosario: [
      { termino: "Shpenzime thelbësore", definicion: "Faturat që duhet t'i paguani edhe nëse të ardhurat ndalen: banesa, ushqimi, shërbimet, shëndeti." },
      { termino: "Likuiditet", definicion: "Sa shpejt mund të përdoren paratë pa humbur vlerë." },
    ],
  };
};
