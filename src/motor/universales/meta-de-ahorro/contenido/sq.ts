import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator kursimesh",
    title: tituloQueEntre(`Kalkulator kursimesh: ${ctx.nombrePais}`, "Kalkulator kursimesh: sa të lini mënjanë në muaj", "Kalkulator kursimesh"),
    description: "Zbuloni sa duhet të kurseni çdo muaj për të grumbulluar shumën e dëshiruar brenda afatit, duke marrë parasysh atë që keni dhe interesin.",
    intro: [
      "Një udhëtim, një makinë, parapagimi për një shtëpi ose një rezervë për të papriturat. Një objektiv me shumë dhe datë arrihet shumë më lehtë.",
      "Vendosni shumën që dëshironi të grumbulloni dhe për sa muaj. Ju themi sa të lini mënjanë çdo muaj dhe çdo javë.",
    ],
    comoSeCalcula: [
      "Fillimisht llogaritet sa do të rriten kursimet aktuale deri në fund të periudhës.",
      "Ajo që mungon ndahet në depozitime mujore të barabarta.",
      "Nëse kursimet sjellin interes, sjell edhe çdo depozitim, kështu që nevojitet pak më pak.",
    ],
    ejemplo: [
      `Për të grumbulluar ${m(meta)} në 24 muaj, pa interes, ju duhen ${m(meta / 24)} në muaj.`,
      `Me ${m(actual)} të kursyera tashmë dhe një kthim prej 5% në vit, mjaftojnë ${m(aporteNecesario(meta, actual, 24, 5))} në muaj.`,
    ],
    faq: [
      {
        pregunta: "Si t'i përmbaheni objektivit të kursimit?",
        respuesta: "Kalojini paratë menjëherë pasi të merrni pagën, para çdo shpenzimi tjetër. Nëse është e mundur, vendosni një transfertë automatike në një llogari të veçantë.",
      },
      {
        pregunta: "Çfarë të bëni nëse shuma mujore është shumë e madhe?",
        respuesta: "Jepini vetes më shumë kohë ose zvogëloni objektivin. Mund të filloni edhe me aq sa e përballoni tani dhe ta rritni shumën kur t'ju rriten të ardhurat.",
      },
      {
        pregunta: "A duhet marrë parasysh inflacioni?",
        respuesta: "Nëse objektivi është pas disa vitesh, shtojini shumës inflacionin e përllogaritur. Ajo që sot kushton 100 mund të kushtojë dukshëm më shumë atëherë.",
      },
    ],
    glosario: [
      { termino: "Depozitim", definicion: "Paratë që lini mënjanë çdo muaj për objektivin." },
      { termino: "Kthim", definicion: "Ajo që sjellin kursimet në një llogari ose në një investim." },
    ],
  };
};
