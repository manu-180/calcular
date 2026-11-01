import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Kalkulator buxheti 50/30/20",
    title: tituloQueEntre(`Kalkulator buxheti 50/30/20: ${ctx.nombrePais}`, "Kalkulator buxheti personal 50/30/20", "Kalkulator buxheti 50/30/20"),
    description: "Ndani të ardhurat neto mujore sipas rregullit 50/30/20: sa shkon për nevojat, sa për dëshirat dhe sa për kursimet. Ndryshoni përqindjet nëse duhet.",
    intro: [
      "Rregulli 50/30/20 është një mënyrë e thjeshtë për të planifikuar muajin. Gjysma shkon për shpenzimet thelbësore, 30% për gjërat që ju pëlqejnë dhe 20% për kursimet.",
      "Vendosni të ardhurat neto dhe ju tregojmë sa i takon secilës pjesë. Nëse situata juaj është ndryshe, për shembull me një qira të lartë, përshtatni përqindjet.",
    ],
    comoSeCalcula: ["Nevojat = të ardhurat × 50%.", "Dëshirat = të ardhurat × 30%.", "Kursimet = të ardhurat × 20%. Të tria përqindjet së bashku duhet të japin 100%."],
    ejemplo: [
      `Me të ardhura prej ${m(ingreso)} në muaj: ${m(ingreso * 0.5)} për nevojat, ${m(ingreso * 0.3)} për dëshirat dhe ${m(ingreso * 0.2)} për kursimet.`,
      `Në një vit, ato 20% bëjnë ${m(ingreso * 0.2 * 12)} të kursyera.`,
    ],
    faq: [
      {
        pregunta: "Çfarë hyn te nevojat dhe çfarë te dëshirat?",
        respuesta:
          "Nevojat janë shpenzimet që duhet t'i paguani: banesa, ushqimet bazë, faturat, transporti, shëndeti dhe këstet minimale. Dëshirat janë gjërat nga të cilat mund të hiqni dorë kur duhet.",
      },
      {
        pregunta: "Çfarë bëni nëse nevojat kalojnë 50%?",
        respuesta: "Ndodh shpesh, sidomos me një qira të lartë. Provoni 60/20/20 ose 70/20/10 dhe shmangni uljen e kursimeve në zero.",
      },
      {
        pregunta: "A hyjnë këstet e borxheve te kursimet?",
        respuesta: "Këstet minimale hyjnë te nevojat. Çdo gjë që paguani më shumë për ta mbyllur një borxh më shpejt hyn te kursimet, sepse e përmirëson situatën tuaj financiare njësoj si kursimi.",
      },
    ],
    glosario: [
      { termino: "Të ardhura neto", definicion: "Ajo që merrni pas tatimeve dhe kontributeve." },
      { termino: "Rregulli 50/30/20", definicion: "Një mënyrë për të ndarë të ardhurat midis nevojave, dëshirave dhe kursimeve." },
    ],
  };
};
