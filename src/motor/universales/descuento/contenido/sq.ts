import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator zbritjeje",
    title: tituloQueEntre(`Kalkulator zbritjeje: ${ctx.nombrePais}`, "Kalkulator zbritjeje dhe çmimi përfundimtar", "Kalkulator zbritjeje"),
    description: "Llogaritni çmimin me zbritje dhe sa kurseni, edhe me zbritje radhazi, si 30% dhe pastaj edhe 10%.",
    intro: [
      "Vendosni çmimin dhe zbritjen dhe shikoni menjëherë sa paguani dhe sa kurseni.",
      "Nëse oferta ka një zbritje shtesë, shtojeni edhe atë: dy zbritje radhazi nuk mblidhen kurrë thjesht.",
    ],
    comoSeCalcula: [
      "Çmimi me zbritje = çmimi fillestar × (1 − zbritja ÷ 100).",
      "Zbritja shtesë zbatohet mbi çmimin që e ka tashmë zbritjen e parë.",
      "Kursimi është çmimi fillestar minus çmimi me zbritje.",
    ],
    ejemplo: [
      `Një produkt që kushton ${m(precio)} me 25% zbritje bie në ${m(precio * 0.75)}.`,
      `Me 30% zbritje dhe pastaj edhe 10%, bie në ${m(precio * 0.7 * 0.9)}: një zbritje totale prej 37%, jo 40%.`,
    ],
    faq: [
      {
        pregunta: "Si llogaritet një zbritje?",
        respuesta: "Shumëzoni çmimin me përqindjen dhe pjesëtojeni me 100. Rezultati është kursimi. Zbriteni nga çmimi dhe do të dini sa paguani.",
      },
      {
        pregunta: "A janë 30% plus 10% një zbritje prej 40%?",
        respuesta: "Jo. Zbritja e dytë zbatohet mbi çmimin tashmë të ulur, ndaj zbritja totale është 37%.",
      },
      {
        pregunta: "Si e gjej çmimin fillestar nga çmimi me zbritje?",
        respuesta: `Pjesëtoni çmimin me zbritje me (1 − zbritja ÷ 100). Me 25% zbritje, pjesëtoni me ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Zbritje", definicion: "Përqindja që hiqet nga çmimi fillestar." },
      { termino: "Zbritje efektive", definicion: "Përqindja totale që kurseni kur zbatohen disa zbritje." },
    ],
  };
};
