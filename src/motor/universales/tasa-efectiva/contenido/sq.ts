import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Kalkulator i normës efektive të interesit",
    title: tituloQueEntre(`Norma efektive e interesit: ${ctx.nombrePais}`, "Kalkulator i normës nominale dhe efektive", "Norma efektive e interesit"),
    description: "Ktheni normën vjetore nominale në normën vjetore efektive dhe anasjelltas, me kapitalizim mujor, tremujor, gjashtëmujor ose ditor.",
    intro: [
      "Dy oferta me të njëjtën normë interesi mund të kushtojnë ndryshe. Dallimi vjen nga sa shpesh llogaritet ose paguhet interesi.",
      "Norma vjetore efektive i vendos të gjitha në të njëjtën bazë: tregon sa paguani ose fitoni vërtet në një vit. Zgjidhni normën që keni dhe shikoni tjetrën.",
    ],
    comoSeCalcula: [
      "Norma efektive = (1 + norma nominale ÷ m) në fuqinë m, minus 1. Këtu m është numri i kapitalizimeve në vit: 12 për mujor, 4 për tremujor.",
      "Norma nominale = m × ((1 + norma efektive) në fuqinë 1 ÷ m, minus 1).",
      "Norma për periudhë është norma nominale e pjesëtuar me m.",
    ],
    ejemplo: [
      `Një normë nominale prej 12% me kapitalizim mujor do të thotë një normë efektive prej ${p(aEfectiva(12, 12))}.`,
      `Një normë efektive prej 10% i përgjigjet një norme nominale prej ${p(aNominal(10, 12))} kur interesi kapitalizohet çdo muaj.`,
    ],
    faq: [
      {
        pregunta: "Cili është dallimi midis normës nominale dhe normës efektive?",
        respuesta:
          "Norma nominale është norma vjetore para kapitalizimit. Norma efektive përfshin efektin e interesit që prodhon interes. Prandaj norma efektive është gjithmonë e barabartë ose më e lartë se ajo nominale.",
      },
      {
        pregunta: "A është norma efektive e njëjtë me normën vjetore të kostos?",
        respuesta:
          "Jo gjithmonë. Norma vjetore e kostos së një kredie përfshin edhe komisionet dhe sigurimet e detyrueshme, jo vetëm kapitalizimin. Kalkulatori tregon efektin e kapitalizimit; për koston totale të një kredie, krahasoni normën vjetore të kostos në ofertë.",
      },
      {
        pregunta: "Pse një kapitalizim më i shpeshtë e rrit normën efektive?",
        respuesta:
          "Interesi i shtohet tepricës më herët dhe fillon të prodhojë edhe vetë interes. Me kapitalizim vjetor, norma nominale dhe ajo efektive janë të barabarta.",
      },
    ],
    glosario: [
      { termino: "Normë nominale", definicion: "Norma vjetore para kapitalizimit." },
      { termino: "Normë efektive", definicion: "Norma vjetore me efektin e kapitalizimit të përfshirë." },
      { termino: "Normë vjetore e kostos", definicion: "Norma vjetore e kostos së një kredie: kostoja totale në vit, me interes, komisione dhe kosto të tjera të detyrueshme." },
      { termino: "Kapitalizim", definicion: "Momenti kur interesi i shtohet tepricës." },
    ],
  };
};
