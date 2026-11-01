import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulator i kthimit nga investimi (ROI)",
    title: tituloQueEntre(`Kalkulator ROI dhe CAGR: ${ctx.nombrePais}`, "Kalkulator i kthimit nga investimi (ROI)", "Kalkulator ROI dhe CAGR"),
    description: "Llogaritni kthimin total (ROI) dhe kthimin vjetor (CAGR) të një investimi nga shuma e investuar, vlera e tanishme dhe numri i viteve.",
    intro: [
      "Një fitim prej 50% tingëllon mirë, por nuk është e njëjta gjë në 2 vjet dhe në 10 vjet. Për të krahasuar investime, ju duhet kthimi për vit.",
      "Vendosni sa keni investuar, sa vlen sot dhe sa vjet kanë kaluar. Shikoni kthimin total dhe kthimin vjetor të përbërë.",
    ],
    comoSeCalcula: [
      "ROI = (vlera përfundimtare + të ardhurat e arkëtuara − shuma e investuar) ÷ shuma e investuar × 100.",
      "CAGR = ((vlera përfundimtare + të ardhurat e arkëtuara) ÷ shuma e investuar) në fuqinë (1 ÷ vite), minus 1.",
      "CAGR është norma vjetore e përbërë: ajo që çon në të njëjtin rezultat nëse përsëritet çdo vit.",
    ],
    ejemplo: [
      `Nëse investoni ${m(inicial)} dhe arrini në ${m(final)}, fitimi është ${m(final - inicial)}: një ROI prej ${p(roi(inicial, final))}.`,
      `Nëse kanë kaluar 5 vjet, kthimi vjetor është ${p(cagr(inicial, final, 5))}. Nëse kanë kaluar 2 vjet, ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Cili është dallimi midis ROI dhe CAGR?",
        respuesta: "ROI është fitimi total ndaj shumës së investuar, pavarësisht nga koha. CAGR e ndan për vit, që të mund të krahasoni investime me kohëzgjatje të ndryshme.",
      },
      {
        pregunta: "Pse kthimi vjetor nuk është thjesht totali i pjesëtuar me numrin e viteve?",
        respuesta: `Sepse çdo vit fitimet i shtohen tepricës dhe sjellin edhe ato kthim. Një fitim prej 50% në 5 vjet do të thotë ${p(cagr(1, 1.5, 5))} në vit të përbërë, jo 10%.`,
      },
      {
        pregunta: "Si t'i marr parasysh dividendët ose interesat e arkëtuara?",
        respuesta: "Shtojini te të ardhurat e arkëtuara nëse i keni tërhequr. Nëse i keni riinvestuar, janë të përfshira tashmë në vlerën përfundimtare.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Kthimi nga investimi: fitimi total si përqindje e shumës së investuar." },
      { termino: "CAGR", definicion: "Norma vjetore e përbërë e rritjes: kthimi mesatar në vit, me efektin e interesit të përbërë." },
    ],
  };
};
