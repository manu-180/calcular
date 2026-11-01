import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator interes i thjeshtë",
    title: tituloQueEntre(`Kalkulator interes i thjeshtë: ${ctx.nombrePais}`, "Kalkulator interes i thjeshtë për ditë, muaj dhe vite", "Kalkulator interes i thjeshtë"),
    description: "Llogaritni interesin e thjeshtë mbi një shumë, me një normë vjetore, për ditë, muaj ose vite. Zgjidhni vitin me 365 ose 360 ditë dhe shikoni totalin.",
    intro: [
      "Interesi i thjeshtë llogaritet gjithmonë mbi shumën fillestare: interesi nuk i shtohet kapitalit gjatë periudhës.",
      "Përdoret te depozitat afatshkurtra, te huatë midis personave dhe në shumë ushtrime shkollore.",
    ],
    comoSeCalcula: [
      "Interesi = kapitali × norma vjetore × periudha në vite.",
      "Për muaj, pjesëtohet me 12. Për ditë, pjesëtohet me 365 ose me 360, sipas vitit që përdor banka.",
      "Totali = kapitali + interesi.",
    ],
    ejemplo: [
      `Një shumë prej ${m(capital)} me një interes prej 10% në vit, për 6 muaj, sjell një interes prej ${m(capital * 0.1 * 0.5)}.`,
      `E njëjta shumë, për 90 ditë, sjell ${m((capital * 0.1 * 90) / 365)} me vitin 365-ditor dhe ${m((capital * 0.1 * 90) / 360)} me vitin 360-ditor.`,
    ],
    faq: [
      {
        pregunta: "Cila është formula e interesit të thjeshtë?",
        respuesta: `I = K × n × t. K është kapitali, n është norma vjetore e shkruar si numër dhjetor (10% do të thotë ${formatearNumero(ctx, 0.1, 2)}), ndërsa t është periudha në vite.`,
      },
      {
        pregunta: "Si ndryshon nga interesi i përbërë?",
        respuesta: "Interesi i thjeshtë llogaritet gjithmonë mbi të njëjtin kapital. Te interesi i përbërë, interesi i shtohet tepricës dhe sjell vetë interes.",
      },
      {
        pregunta: "Pse disa banka përdorin vitin me 360 ditë?",
        respuesta: "Është një konventë bankare që i thjeshton llogaritjet. Me 360 ditë, interesi del pak më i lartë. Verifikoni cilën konventë përdor banka juaj.",
      },
    ],
    glosario: [
      { termino: "Kapital", definicion: "Shuma e parave e huazuar ose e investuar." },
      { termino: "Vit bankar", definicion: "Një vit i llogaritur me 360 ditë, me muaj nga 30 ditë." },
    ],
  };
};
