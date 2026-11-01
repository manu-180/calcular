import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Izračun napitnine",
    title: tituloQueEntre(`Izračun napitnine ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Koliko napitnine pustiti: izračun", "Izračun napitnine"),
    description: "Izračunajte napitnino, skupni znesek računa in koliko plača vsaka oseba, ko si račun razdelite. Delež vsake osebe lahko zaokrožite navzgor.",
    intro: [
      "Vnesite znesek računa, odstotek napitnine in število oseb, ki plačajo. Dobili boste napitnino, skupni znesek in delež vsake osebe.",
      "Če imate raje okrogle zneske, kalkulator delež vsake osebe zaokroži navzgor, razlika pa gre v napitnino.",
    ],
    comoSeCalcula: ["Napitnina = račun × odstotek napitnine ÷ 100.", "Skupaj = račun + napitnina.", "Delež vsake osebe je skupni znesek, deljen s številom oseb."],
    ejemplo: [
      `Pri računu v višini ${m(cuenta)} je napitnina 10 % enaka ${m(propina)}, skupaj torej ${m(cuenta + propina)}.`,
      `Če plačajo tri osebe, vsaka plača ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koliko napitnine je običajno pustiti?",
        respuesta: `Odvisno je od lokalnih navad. Preverite, kaj je običajno ${GRAMATICA.sl.en(ctx.nombrePais)}, in poglejte, ali račun že vključuje strošek storitve.`,
      },
      {
        pregunta: "Se napitnina računa od zneska z davkom ali brez njega?",
        respuesta: "Običajno od skupnega zneska na računu. Če jo želite računati od zneska brez davka, vnesite ta znesek.",
      },
      {
        pregunta: "Kako hitro izračunati napitnino 10 % ali 15 %?",
        respuesta: `Račun delite z deset in dobite 10 %. Za 15 % prištejte še polovico tega zneska. Pri računu 850 je 10 % enako ${n(850 * 0.1)}, 15 % pa ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Napitnina", definicion: "Znesek, ki ga pustite za storitev poleg cene." },
      { termino: "Strošek storitve", definicion: "Znesek, ki ga je lokal za storitev že dodal na račun." },
    ],
  };
};
