import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `O cameră cu 48 ft de pereți, înaltă de 8 ft, cu 40 ft² de uși și ferestre, are ${n(neta, 0)} ft² de vopsit.`,
          `Cu 2 straturi și o vopsea care acoperă 350 ft² pe galon, aveți nevoie de ${n(gal, 2)} galoane. Cu rezerva inclusă, ${n(gal * (1 + MARGEN), 2)} galoane.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `O cameră cu 14 m de pereți, înaltă de ${n(2.6)} m, cu 4 m² de uși și ferestre, are ${n(neta)} m² de vopsit.`,
          `Cu 2 straturi și o vopsea care acoperă 10 m² pe litru, aveți nevoie de ${n(litros, 2)} litri. Cu rezerva inclusă, ${n(litros * (1 + MARGEN), 2)} litri.`,
        ];
      })();
  return {
    h1: "Calculator vopsea",
    title: tituloQueEntre(`Calculator vopsea: ${ctx.nombrePais}`, "Calculator vopsea lavabilă pentru pereți", "Calculator vopsea"),
    description: "Calculați câtă vopsea vă trebuie pentru pereți, după dimensiuni, uși și ferestre, numărul de straturi și acoperirea scrisă pe ambalaj.",
    intro: [
      "Introduceți lungimea și înălțimea pereților (sau direct suprafața), cât ocupă ușile și ferestrele și câte straturi aplicați.",
      "Calculatorul adaugă 10% în plus, ca să nu rămâneți fără vopsea la jumătatea lucrării.",
    ],
    comoSeCalcula: [
      "Suprafață = lungimea totală a pereților × înălțime, minus ușile și ferestrele.",
      "Vopsea = suprafață × straturi ÷ acoperire.",
      `La final se adaugă o rezervă de ${MARGEN * 100}%.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Câți metri pătrați acoperă un litru de vopsea lavabilă?",
        respuesta: "Majoritatea vopselelor lavabile de interior acoperă între 8 și 12 m² pe litru la un strat. Cifra exactă este scrisă pe ambalaj.",
      },
      {
        pregunta: "Câte straturi de vopsea trebuie date?",
        respuesta: "Două straturi sunt de obicei suficiente. Tencuiala nouă, pereții foarte poroși sau o schimbare mare de culoare pot cere un al treilea strat.",
      },
      {
        pregunta: "Trebuie scăzute ușile și ferestrele?",
        respuesta: "Da, dacă sunt mari. Pe cele mici mai bine nu le scădeți: surplusul acoperă colțurile și marginile.",
      },
    ],
    glosario: [
      { termino: "Acoperire", definicion: "Câtă suprafață acoperă un litru sau un galon de vopsea la un strat." },
      { termino: "Strat", definicion: "Fiecare aplicare de vopsea pe perete." },
    ],
  };
};
