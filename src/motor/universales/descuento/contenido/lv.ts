import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Atlaides kalkulators",
    title: tituloQueEntre(`Atlaides kalkulators tiešsaistē (${ctx.nombrePais})`, "Atlaides kalkulators: kā aprēķināt atlaidi", "Atlaides kalkulators"),
    description: "Aprēķiniet cenu ar atlaidi un to, cik ietaupīsiet, arī tad, ja atlaides piemēro vienu pēc otras, piemēram, 30% un vēl 10%.",
    intro: [
      "Ievadiet cenu un atlaidi, un uzreiz redzēsiet, cik maksāsiet un cik ietaupīsiet.",
      "Ja akcija piedāvā vēl vienu atlaidi, pievienojiet arī to: divas atlaides pēc kārtas nekad vienkārši nesummējas.",
    ],
    comoSeCalcula: [
      "Cena ar atlaidi = sākotnējā cena × (1 − atlaide ÷ 100).",
      "Papildu atlaidi rēķina no cenas pēc pirmās atlaides piemērošanas.",
      "Ietaupījums ir sākotnējā cena mīnus cena ar atlaidi.",
    ],
    ejemplo: [
      `Prece par ${m(precio)} ar 25% atlaidi maksās ${m(precio * 0.75)}.`,
      `Ar 30% atlaidi un vēl 10% atlaidi tā maksās ${m(precio * 0.7 * 0.9)}: kopējā atlaide ir ${n(efectiva)}%, nevis 40%.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt atlaidi?",
        respuesta: "Reiziniet cenu ar atlaides procentu un daliet ar 100. Tas ir ietaupījums. Atņemiet to no cenas un iegūsiet maksājamo summu.",
      },
      {
        pregunta: "Vai 30% atlaide un vēl 10% ir tas pats, kas 40%?",
        respuesta: `Nē. Otro atlaidi rēķina no jau samazinātas cenas, tāpēc kopā sanāk ${n(efectiva)}%.`,
      },
      {
        pregunta: "Kā uzzināt sākotnējo cenu no cenas ar atlaidi?",
        respuesta: `Daliet cenu ar atlaidi ar izteiksmi (1 − atlaide ÷ 100). Ja atlaide ir 25%, daliet ar ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Atlaide", definicion: "Procents, par kādu samazina sākotnējo cenu." },
      { termino: "Efektīvā atlaide", definicion: "Kopējais ietaupītais procents, ja piemēro vairāk nekā vienu atlaidi." },
    ],
  };
};
