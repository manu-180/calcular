import { pluralSq } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const u = (n: number) => pluralSq(formatearNumero(ctx, n), "njësi", "njësi");
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulator i pikës së barazimit",
    title: tituloQueEntre(`Pika e barazimit: ${ctx.nombrePais}`, "Kalkulator i pikës së barazimit", "Pika e barazimit"),
    description: "Gjeni sa njësi duhet të shitni dhe sa të ardhura ju duhen çdo muaj për të mbuluar kostot dhe për të arritur fitimin e dëshiruar.",
    intro: [
      "Pika e barazimit është niveli i shitjeve në të cilin një biznes as fiton, as humbet. Nën të keni humbje, mbi të fillon fitimi.",
      "Vendosni kostot fikse, çmimin dhe koston e çdo njësie. Kalkulatori ju tregon sa duhet të shitni për të mbuluar kostot dhe për të arritur objektivin.",
    ],
    comoSeCalcula: [
      "Marzhi i kontributit = çmimi − kostoja e ndryshueshme për njësi.",
      "Njësitë te pika e barazimit = kostot fikse ÷ marzhi i kontributit, të rrumbullakuara lart.",
      "Shitjet te pika e barazimit = kostot fikse ÷ (marzhi i kontributit ÷ çmimi).",
      "Për një fitim të dëshiruar, ai u shtohet kostove fikse dhe bëhet e njëjta llogaritje.",
    ],
    ejemplo: [
      `Me kosto fikse prej ${m(fijos)}, një çmim prej ${m(precio)} dhe një kosto të ndryshueshme prej ${m(variable)}, çdo shitje lë ${m(precio - variable)}.`,
      `Duhet të shitni ${u(base.unidades)} (${m(base.facturacion)}) për të mbuluar kostot dhe ${u(meta.unidades)} për të fituar ${m(objetivo)} në muaj.`,
    ],
    faq: [
      {
        pregunta: "Çfarë janë kostot fikse dhe kostot e ndryshueshme?",
        respuesta: "Kostot fikse mbeten të njëjta edhe nëse nuk shitni asgjë: qira, paga fikse, fatura. Kostot e ndryshueshme rriten me çdo shitje: mallra, materiale, komisione, transport.",
      },
      {
        pregunta: "Si mund ta ul pikën e barazimit?",
        respuesta: "Keni tri leva: rritni çmimin, ulni koston e ndryshueshme për njësi ose shkurtoni kostot fikse. Zakonisht çmimi ka efektin më të madh.",
      },
      {
        pregunta: "A mund të përdoret edhe për një biznes me shërbime?",
        respuesta: "Po. Një njësi mund të jetë një orë, një seancë ose një klient në muaj. Si kosto të ndryshueshme përdorni sa ju kushton të ofroni çdo njësi.",
      },
    ],
    glosario: [
      { termino: "Pikë barazimi", definicion: "Niveli i shitjeve në të cilin të ardhurat janë të barabarta me kostot." },
      { termino: "Marzh kontributi", definicion: "Ajo që lë çdo shitje për mbulimin e kostove fikse." },
    ],
  };
};
