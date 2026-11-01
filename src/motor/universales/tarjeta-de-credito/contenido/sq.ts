import { pluralSq } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const muaj = (n: number) => pluralSq(n, "muaj", "muaj");
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulator karte krediti",
    title: tituloQueEntre(`Kalkulator karte krediti: ${ctx.nombrePais}`, "Kalkulator karte krediti: interes dhe këste", "Kalkulator karte krediti"),
    description: "Gjeni për sa muaj e shlyeni borxhin e kartës së kreditit dhe sa interes paguani, me një pagesë fikse ose me pagesën minimale.",
    intro: [
      "Karta e kreditit është zakonisht borxhi më i shtrenjtë. Nëse paguani vetëm shumën minimale, shlyerja shtrihet në vite dhe interesi mblidhet.",
      "Vendosni borxhin, interesin vjetor dhe sa mund të paguani çdo muaj. Shikoni kur përfundoni, sa interes paguani dhe planin muaj pas muaji.",
    ],
    comoSeCalcula: [
      "Çdo muaj shtohet interesi: borxhi × interesi vjetor ÷ 12.",
      "Pastaj zbritet pagesa. Me pagesën minimale, pagesa është një përqindje e borxhit, por jo më e vogël se një kufi.",
      "Llogaritja përsëritet derisa borxhi të arrijë në zero. Nëse pagesa nuk e kalon interesin, borxhi nuk ulet kurrë.",
    ],
    ejemplo: [
      `Një borxh prej ${m(saldo)} me interes 22% në vit, me një pagesë prej ${m(fijo)} në muaj, shlyhet për ${muaj(conFijo.meses)}, me një interes prej ${m(conFijo.intereses)}.`,
      `Nëse paguani vetëm një shumë minimale prej 3%, shlyerja zgjat ${muaj(conMinimo.meses)} dhe interesi ngjitet në ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Çfarë ndodh nëse paguaj vetëm shumën minimale?",
        respuesta:
          "Pagesa minimale ulet bashkë me borxhin, ndaj paguani gjithnjë e më pak çdo muaj dhe borxhi zgjatet me vite. Nëse mundeni, paguani një shumë fikse më të madhe, qoftë edhe pak më të madhe.",
      },
      {
        pregunta: "A ia vlen ta rifinancoj borxhin e kartës me një kredi personale?",
        respuesta: "Nëse interesi i kredisë është shumë më i ulët se ai i kartës, zakonisht ia vlen. Krahasoni interesin total të dy mundësive, me të gjitha komisionet e përfshira.",
      },
      {
        pregunta: "Cilën kartë të shlyej më parë?",
        respuesta: "Paguani shumën minimale në të gjitha dhe vendosni pjesën tjetër te karta me interesin më të lartë. Kështu paguani interesin më të ulët në total.",
      },
    ],
    glosario: [
      { termino: "Pagesë minimale", definicion: "Shuma më e vogël që mund të paguani në një muaj pa penalitete. Nuk e shuan borxhin." },
      { termino: "Periudhë pa interes", definicion: "Intervali në të cilin blerjet me kartë nuk kanë interes nëse e shlyeni borxhin plotësisht." },
      { termino: "Interes vjetor", definicion: "Përqindja në vit që karta i zbaton borxhit që mbartni." },
    ],
  };
};
