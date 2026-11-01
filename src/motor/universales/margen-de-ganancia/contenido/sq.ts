import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Kalkulator marzhi fitimi dhe shtese mbi kosto",
    title: tituloQueEntre(`Kalkulator marzhi fitimi: ${ctx.nombrePais}`, "Kalkulator marzhi fitimi dhe shtese mbi kosto", "Kalkulator marzhi fitimi"),
    description: "Llogaritni marzhin e fitimit dhe shtesën mbi kosto nga kostoja dhe çmimi, ose çmimin e shitjes që ju duhet për marzhin e dëshiruar.",
    intro: [
      "Marzhi i fitimit dhe shtesa mbi kosto ngatërrohen shpesh, dhe dallimi mund të kushtojë para. Të dyja matin të njëjtin fitim, por ndaj një baze tjetër.",
      "Vendosni koston dhe çmimin dhe ju tregojmë të dyja vlerat. Ose zgjidhni një marzh dhe ju themi me sa të shitni.",
    ],
    comoSeCalcula: [
      "Fitimi = çmimi i shitjes − kostoja.",
      "Marzhi = fitimi ÷ çmimi i shitjes × 100.",
      "Shtesa mbi kosto = fitimi ÷ kostoja × 100.",
      "Çmimi për një marzh të dëshiruar = kostoja ÷ (1 − marzhi ÷ 100).",
    ],
    ejemplo: [
      `Një produkt me kosto ${m(costo)} i shitur me ${m(precio)} sjell një fitim prej ${m(precio - costo)}: një marzh prej ${p(((precio - costo) / precio) * 100)} dhe një shtesë mbi kosto prej ${p(((precio - costo) / costo) * 100)}.`,
      `Për një marzh prej 50% me të njëjtën kosto, duhet të shitni me ${m(precioConMargen(costo, 50))}. Një shtesë prej 50% mbi koston jep një marzh prej vetëm ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Cili është dallimi midis shtesës mbi kosto dhe marzhit?",
        respuesta: "Marzhi e krahason fitimin me çmimin e shitjes. Shtesa mbi kosto e krahason me koston. Për të njëjtin fitim, shtesa është gjithmonë numri më i madh.",
      },
      {
        pregunta: "Si caktohet çmimi për një marzh të dëshiruar?",
        respuesta: `Pjesëtoni koston me (1 − marzhi). Për një marzh prej 30%, pjesëtoni koston me ${formatearNumero(ctx, 0.7, 2)}. Mos i shtoni 30% kostos: do të fitonit më pak se sa mendoni.`,
      },
      {
        pregunta: "A duhet ta përfshijë kostoja TVSH-në?",
        respuesta: "Përdorni koston dhe çmimin pa TVSH ose tatime të tjera që mblidhni nga klienti. Përndryshe marzhi duket më i madh se sa është.",
      },
    ],
    glosario: [
      { termino: "Marzh fitimi", definicion: "Fitimi si përqindje e çmimit të shitjes." },
      { termino: "Shtesë mbi kosto", definicion: "Fitimi si përqindje e kostos së blerjes." },
    ],
  };
};
