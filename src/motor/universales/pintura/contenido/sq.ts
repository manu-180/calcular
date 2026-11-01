import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Një dhomë me 48 ft mure, me lartësi 8 ft dhe 40 ft² dyer e dritare, ka ${n(neta, 0)} ft² për t'u lyer.`,
          `Me 2 shtresa dhe një bojë që mbulon 350 ft² për gallon, ju duhen ${n(gal, 2)} galona. Me rezervën të përfshirë, ${n(gal * (1 + MARGEN), 2)} galona.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Një dhomë me 14 m mure, me lartësi ${n(2.6)} m dhe 4 m² dyer e dritare, ka ${n(neta)} m² për t'u lyer.`,
          `Me 2 shtresa dhe një bojë që mbulon 10 m² për litër, ju duhen ${n(litros, 2)} litra. Me rezervën të përfshirë, ${n(litros * (1 + MARGEN), 2)} litra.`,
        ];
      })();
  return {
    h1: "Kalkulator boje",
    title: tituloQueEntre(`Kalkulator boje: ${ctx.nombrePais}`, "Kalkulator boje për mure", "Kalkulator boje"),
    description: "Llogaritni sa bojë ju duhet për muret, sipas përmasave, dyerve dhe dritareve, numrit të shtresave dhe mbulimit të shkruar në ambalazh.",
    intro: [
      "Vendosni gjatësinë dhe lartësinë e mureve (ose drejtpërdrejt sipërfaqen), sa zënë dyert dhe dritaret dhe sa shtresa aplikoni.",
      "Kalkulatori shton 10% më shumë, që të mos mbeteni pa bojë në mes të punës.",
    ],
    comoSeCalcula: [
      "Sipërfaqja = gjatësia totale e mureve × lartësia, minus dyert dhe dritaret.",
      "Boja = sipërfaqja × shtresat ÷ mbulimi.",
      `Në fund shtohet një rezervë prej ${MARGEN * 100}%.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Sa metra katrorë mbulon një litër bojë muri?",
        respuesta: "Shumica e bojërave të brendshme të murit mbulojnë nga 8 deri në 12 m² për litër me një shtresë. Shifra e saktë shkruhet në ambalazh.",
      },
      {
        pregunta: "Sa shtresa bojë duhen?",
        respuesta: "Dy shtresa zakonisht mjaftojnë. Suvaja e re, muret shumë poroze ose një ndryshim i madh ngjyre mund të kërkojnë një shtresë të tretë.",
      },
      {
        pregunta: "A duhen zbritur dyert dhe dritaret?",
        respuesta: "Po, nëse janë të mëdha. Të voglat më mirë mos i zbritni: teprica mbulon qoshet dhe skajet.",
      },
    ],
    glosario: [
      { termino: "Mbulim", definicion: "Sa sipërfaqe mbulon një litër ose një gallon bojë me një shtresë." },
      { termino: "Shtresë", definicion: "Çdo aplikim boje në mur." },
    ],
  };
};
