import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const total = formatearCifra(ctx, (1 - 0.7 * 0.9) * 100);
  return {
    h1: "Allahindluse kalkulaator",
    title: tituloQueEntre(
      `Allahindluse kalkulaator: arvuta hind pärast allahindlust | ${ctx.nombrePais}`,
      `Allahindluse kalkulaator | ${ctx.nombrePais}`,
      "Allahindluse kalkulaator",
    ),
    description: "Arvuta hind pärast allahindlust ja kui palju säästad, ka siis, kui kaks allahindlust tulevad järjest, näiteks 30% ja selle peale veel 10%.",
    intro: [
      "Sisesta hind ja allahindlus, siis näed kohe, mida maksad ja kui palju säästad.",
      "Kui saad veel lisaallahindlust, sisesta ka see. Kaks järjestikust allahindlust ei ole kunagi lihtsalt nende summa.",
    ],
    comoSeCalcula: [
      "Soodushind = tavahind × (1 − allahindlus ÷ 100).",
      "Lisaallahindlus arvutatakse juba alandatud hinnast.",
      "Sääst on tavahind miinus soodushind.",
    ],
    ejemplo: [
      `Toode, mille hind on ${m(precio)}, maksab 25% allahindlusega ${m(precio * 0.75)}.`,
      `Kui allahindlus on kõigepealt 30% ja siis veel 10%, maksab toode ${m(precio * 0.7 * 0.9)}. Kokku on see ${total}% odavam, mitte 40%.`,
    ],
    faq: [
      {
        pregunta: "Kuidas allahindlust arvutatakse?",
        respuesta: "Korruta hind allahindluse protsendiga ja jaga sajaga. Tulemus on sinu sääst. Lahuta see hinnast, siis saad makstava hinna.",
      },
      {
        pregunta: "Kas 30% ja 10% allahindlus on sama mis 40%?",
        respuesta: `Ei ole. Teine allahindlus arvutatakse juba alandatud hinnast. Kokku säästad seega ${total}%.`,
      },
      {
        pregunta: "Kuidas leida soodushinnast tavahind?",
        respuesta: `Jaga soodushind arvuga (1 − allahindlus ÷ 100). Kui allahindlus on 25%, jagad arvuga ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Allahindlus", definicion: "Protsent, mis lahutatakse tavahinnast." },
      { termino: "Allahindlus kokku", definicion: "Mitu protsenti säästad kokku, kui allahindlusi on mitu." },
    ],
  };
};
