import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: "Kalkulator TVSH",
    title: tituloQueEntre(`Kalkulator TVSH ${tasa}: ${ctx.nombrePais}`, `Kalkulator TVSH: ${ctx.nombrePais}`, `Kalkulator TVSH (${tasa})`),
    description: `Shtoni ose hiqni TVSH-në prej ${tasa} nga çdo çmim, me një hap të vetëm: çmimi pa TVSH, vlera e tatimit dhe totali, me saktësi.`,
    intro: [
      `Norma standarde e TVSH-së që përdoret këtu ${GRAMATICA.sq.para(ctx.nombrePais)} është ${tasa}.`,
      "Zgjidhni nëse dëshironi ta shtoni TVSH-në te një çmim pa tatim apo ta hiqni nga një çmim që e përfshin, pastaj vendosni shumën.",
    ],
    comoSeCalcula: [
      "Shtimi: TVSH = çmimi pa TVSH × norma ÷ 100. Çmimi me TVSH = çmimi pa TVSH + TVSH.",
      "Heqja: çmimi pa TVSH = çmimi me TVSH ÷ (1 + norma ÷ 100). Diferenca është vlera e TVSH-së.",
      "Nëse një produkt ose shërbim ka normë të reduktuar, mund ta vendosni te “Normë tjetër TVSH”.",
    ],
    ejemplo: [
      `Për t'i shtuar TVSH një çmimi prej ${precio} pa tatim, shumëzojeni me normën ${tasa} dhe shtojeni rezultatin te çmimi.`,
      `Për të gjetur sa TVSH përmban një shumë prej ${precio}, pjesëtojeni me 1 plus normën dhe zbritni rezultatin nga shuma.`,
    ],
    faq: [
      {
        pregunta: "Si llogaritet TVSH-ja nga një shumë?",
        respuesta: "Pjesëtoni shumën me 1 plus normën të shkruar si numër dhjetor. Rezultati është çmimi pa TVSH, ndërsa diferenca midis të dyve është tatimi.",
      },
      {
        pregunta: "Pse nuk mund të zbritet thjesht përqindja nga totali?",
        respuesta: "Sepse TVSH-ja është llogaritur mbi çmimin më të ulët, atë pa tatim. Nëse e zbritni përqindjen nga totali, hiqni më shumë se duhet.",
      },
      {
        pregunta: `A kanë të gjitha produktet TVSH ${tasa}?`,
        respuesta: "Jo gjithmonë. Disa ushqime, ilaçe ose shërbime kanë normë të reduktuar ose janë të përjashtuara. Në këtë rast, përdorni “Normë tjetër TVSH”.",
      },
    ],
    glosario: [
      { termino: "TVSH", definicion: "Tatimi mbi vlerën e shtuar. I shtohet çmimit të mallrave dhe të shërbimeve." },
      { termino: "Çmimi pa TVSH", definicion: "Çmimi para shtimit të tatimit, i quajtur edhe çmim neto." },
    ],
  };
};
